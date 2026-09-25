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

  // Health check
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({
      status: 'ok',
      service: 'ZÉLIA Haute Parfumerie Central Backend',
      database: 'connected',
      serverTime: new Date().toISOString()
    });
  });

  // ================= ORDERS API =================
  // GET /api/orders - Fetch all orders from central DB
  app.get('/api/orders', (req: Request, res: Response) => {
    try {
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
      const orderPayload: Partial<ServerOrder> = req.body;

      if (!orderPayload.customerName || !orderPayload.customerPhone || !orderPayload.items || orderPayload.items.length === 0) {
        return res.status(400).json({
          success: false,
          error: 'Missing required order fields (customerName, customerPhone, items)'
        });
      }

      const orderNumber = orderPayload.orderNumber || `ZEL-${Math.floor(1000 + Math.random() * 9000)}`;

      const newOrder: ServerOrder = {
        id: orderPayload.id || `ord-${Date.now()}`,
        orderNumber,
        customerName: orderPayload.customerName,
        customerEmail: orderPayload.customerEmail || `${orderPayload.customerName.toLowerCase().replace(/\s+/g, '.')}@luxury.in`,
        customerPhone: orderPayload.customerPhone,
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
      console.log(`[Order Created] ${saved.orderNumber} for ${saved.customerName} - Total: ₹${saved.total}`);
      res.status(201).json({ success: true, data: saved });
    } catch (err: any) {
      console.error('Error creating order:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // PATCH /api/orders/:id/status - Update order status (Pending, Confirmed, Shipped, Delivered, Cancelled)
  app.patch('/api/orders/:id/status', (req: Request, res: Response) => {
    try {
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
      res.json({ success: true, data: updated });
    } catch (err: any) {
      console.error('Error updating order:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // DELETE /api/orders/:id - Remove order from central DB
  app.delete('/api/orders/:id', (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const ok = deleteOrder(id);
      if (!ok) {
        return res.status(404).json({ success: false, error: 'Order not found' });
      }
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
