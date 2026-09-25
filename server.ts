import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import {
  getOrders,
  createOrder,
  updateOrderStatus,
  deleteOrder,
  getCustomers,
  getMessages,
  createMessage,
  updateMessage,
  deleteMessage
} from './server/db';
import { ServerOrder, ServerMessage } from './server/initialData';

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const isProd = process.env.NODE_ENV === 'production';

  app.use(express.json());

  // Real-time SSE Clients registry for instant admin notifications
  const sseClients = new Set<Response>();

  function broadcastOrderChange(data: any) {
    const payload = `data: ${JSON.stringify(data)}\n\n`;
    for (const client of sseClients) {
      try {
        client.write(payload);
      } catch {
        sseClients.delete(client);
      }
    }
  }

  // Health check
  app.get('/api/health', (req: Request, res: Response) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    res.json({
      status: 'ok',
      service: 'ZÉLIA Haute Parfumerie Central Backend',
      database: 'connected',
      activeSseClients: sseClients.size,
      serverTime: new Date().toISOString()
    });
  });

  // ================= SSE STREAM =================
  // GET /api/orders/stream - Real-time push stream for Admin Panel
  app.get('/api/orders/stream', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');
    if (res.flushHeaders) res.flushHeaders();

    // Send connection greeting
    res.write(`data: ${JSON.stringify({ type: 'connected', message: 'Maison ZÉLIA Live Order Stream' })}\n\n`);

    sseClients.add(res);

    req.on('close', () => {
      sseClients.delete(res);
    });
  });

  // ================= ORDERS API =================
  // GET /api/orders - Fetch all orders from central DB with no caching
  app.get('/api/orders', (req: Request, res: Response) => {
    try {
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      const orders = getOrders();
      res.json({ success: true, count: orders.length, data: orders });
    } catch (err: any) {
      console.error('Error fetching orders:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // POST /api/orders - Create new order from customer storefront
  app.post('/api/orders', (req: Request, res: Response) => {
    try {
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
      const orderPayload: Partial<ServerOrder> = req.body;

      if (!orderPayload.customerName || !orderPayload.customerPhone || !orderPayload.items || orderPayload.items.length === 0) {
        return res.status(400).json({
          success: false,
          error: 'Missing required order fields (customerName, customerPhone, items)'
        });
      }

      const orderNumber = orderPayload.orderNumber || `ZEL-${Math.floor(1000 + Math.random() * 9000)}`;

      // Use customer-provided email address directly
      const customerEmail = (orderPayload.customerEmail && orderPayload.customerEmail.trim().length > 0)
        ? orderPayload.customerEmail.trim()
        : `${orderPayload.customerName.toLowerCase().replace(/\s+/g, '.')}@gmail.com`;

      const newOrder: ServerOrder = {
        id: orderPayload.id || `ord-${Date.now()}`,
        orderNumber,
        customerName: orderPayload.customerName.trim(),
        customerEmail,
        customerPhone: orderPayload.customerPhone.trim(),
        shippingAddress: orderPayload.shippingAddress || {
          address: 'Boutique Residence',
          city: 'Mumbai',
          pinCode: '400001',
          state: 'Maharashtra'
        },
        items: orderPayload.items,
        subtotal: orderPayload.subtotal || 0,
        discount: orderPayload.discount || 0,
        shipping: orderPayload.shipping || 0,
        total: orderPayload.total || 0,
        paymentMethod: orderPayload.paymentMethod || 'upi',
        paymentStatus: orderPayload.paymentStatus || (orderPayload.paymentMethod === 'cod' ? 'Pending' : 'Paid'),
        status: orderPayload.status || 'Pending',
        date: orderPayload.date || new Date().toISOString(),
        trackingNumber: orderPayload.trackingNumber || '',
        notes: orderPayload.notes || ''
      };

      const saved = createOrder(newOrder);
      console.log(`[Order Created] ${saved.orderNumber} for ${saved.customerName} (${saved.customerEmail}) - ₹${saved.total}`);

      // Push real-time event to all connected admin panels across all devices
      broadcastOrderChange({ type: 'order_created', order: saved });

      res.status(201).json({ success: true, data: saved });
    } catch (err: any) {
      console.error('Error creating order:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // PATCH /api/orders/:id/status - Update order status (Pending, Confirmed, Shipped, Delivered, Cancelled)
  app.patch('/api/orders/:id/status', (req: Request, res: Response) => {
    try {
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
      const { id } = req.params;
      const { status, trackingNumber } = req.body;

      if (!status) {
        return res.status(400).json({ success: false, error: 'Status is required' });
      }

      const updated = updateOrderStatus(id, status, trackingNumber);
      if (!updated) {
        return res.status(404).json({ success: false, error: 'Order not found' });
      }

      console.log(`[Order Updated] ${updated.orderNumber} status -> ${status}`);
      broadcastOrderChange({ type: 'order_updated', order: updated });
      res.json({ success: true, data: updated });
    } catch (err: any) {
      console.error('Error updating order:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // DELETE /api/orders/:id - Remove order from central DB
  app.delete('/api/orders/:id', (req: Request, res: Response) => {
    try {
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
      const { id } = req.params;
      const ok = deleteOrder(id);
      if (!ok) {
        return res.status(404).json({ success: false, error: 'Order not found' });
      }
      broadcastOrderChange({ type: 'order_deleted', orderId: id });
      res.json({ success: true, message: `Order ${id} removed` });
    } catch (err: any) {
      console.error('Error deleting order:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // ================= CUSTOMERS API =================
  app.get('/api/customers', (req: Request, res: Response) => {
    try {
      const customers = getCustomers();
      res.json({ success: true, count: customers.length, data: customers });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // ================= MESSAGES API =================
  app.get('/api/messages', (req: Request, res: Response) => {
    try {
      const messages = getMessages();
      res.json({ success: true, count: messages.length, data: messages });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.post('/api/messages', (req: Request, res: Response) => {
    try {
      const { name, email, phone, subject, message } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ success: false, error: 'Missing name, email, or message' });
      }

      const newMsg: ServerMessage = {
        id: `msg-${Date.now()}`,
        name,
        email,
        phone: phone || '',
        subject: subject || 'General Concierge Inquiry',
        message,
        date: new Date().toISOString(),
        status: 'Unread'
      };

      const saved = createMessage(newMsg);
      res.status(201).json({ success: true, data: saved });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.patch('/api/messages/:id', (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { status, reply } = req.body;
      const updated = updateMessage(id, status, reply);
      if (!updated) {
        return res.status(404).json({ success: false, error: 'Message not found' });
      }
      res.json({ success: true, data: updated });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.delete('/api/messages/:id', (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const ok = deleteMessage(id);
      if (!ok) {
        return res.status(404).json({ success: false, error: 'Message not found' });
      }
      res.json({ success: true, message: `Message ${id} removed` });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // ================= VITE OR STATIC FRONTEND =================
  if (isProd) {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[ZÉLIA Central Server] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start central backend server:', err);
  process.exit(1);
});
