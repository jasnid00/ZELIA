import fs from 'fs';
import path from 'path';
import { ServerOrder, ServerCustomer, ServerMessage, SEED_ORDERS, SEED_CUSTOMERS, SEED_MESSAGES } from './initialData';

const DATA_DIR = path.resolve(process.cwd(), 'data_store');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const CUSTOMERS_FILE = path.join(DATA_DIR, 'customers.json');
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json');

// Ensure directory exists
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(ORDERS_FILE)) {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(SEED_ORDERS, null, 2), 'utf-8');
  }

  if (!fs.existsSync(CUSTOMERS_FILE)) {
    fs.writeFileSync(CUSTOMERS_FILE, JSON.stringify(SEED_CUSTOMERS, null, 2), 'utf-8');
  }

  if (!fs.existsSync(MESSAGES_FILE)) {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(SEED_MESSAGES, null, 2), 'utf-8');
  }
}

// Orders CRUD
export function getOrders(): ServerOrder[] {
  ensureDataDir();
  try {
    const data = fs.readFileSync(ORDERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading orders file:', err);
    return SEED_ORDERS;
  }
}

export function saveOrders(orders: ServerOrder[]): void {
  ensureDataDir();
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf-8');
}

export function createOrder(newOrder: ServerOrder): ServerOrder {
  const orders = getOrders();
  // Prepend so latest appears first
  const updated = [newOrder, ...orders];
  saveOrders(updated);

  // Also auto-update or create customer in central DB
  try {
    const customers = getCustomers();
    const existing = customers.find(
      (c) => c.email.toLowerCase() === newOrder.customerEmail.toLowerCase()
    );
    if (existing) {
      existing.totalOrders += 1;
      existing.totalSpent += newOrder.total;
      existing.lastOrderDate = new Date().toISOString().split('T')[0];
      saveCustomers(customers);
    } else {
      const newCustomer: ServerCustomer = {
        id: `cust-${Date.now()}`,
        name: newOrder.customerName,
        email: newOrder.customerEmail,
        phone: newOrder.customerPhone,
        city: newOrder.shippingAddress.city,
        tier: newOrder.total > 15000 ? 'Gold Reserve VIP' : 'Member',
        totalOrders: 1,
        totalSpent: newOrder.total,
        lastOrderDate: new Date().toISOString().split('T')[0],
        status: 'Active'
      };
      saveCustomers([newCustomer, ...customers]);
    }
  } catch (err) {
    console.error('Error updating customer after order:', err);
  }

  return newOrder;
}

export function updateOrderStatus(orderId: string, status: ServerOrder['status'], trackingNumber?: string): ServerOrder | null {
  const orders = getOrders();
  const index = orders.findIndex((o) => o.id === orderId);
  if (index === -1) return null;

  orders[index].status = status;
  if (trackingNumber !== undefined) {
    orders[index].trackingNumber = trackingNumber;
  }
  saveOrders(orders);
  return orders[index];
}

export function deleteOrder(orderId: string): boolean {
  const orders = getOrders();
  const filtered = orders.filter((o) => o.id !== orderId);
  if (filtered.length === orders.length) return false;
  saveOrders(filtered);
  return true;
}

// Customers CRUD
export function getCustomers(): ServerCustomer[] {
  ensureDataDir();
  try {
    const data = fs.readFileSync(CUSTOMERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading customers file:', err);
    return SEED_CUSTOMERS;
  }
}

export function saveCustomers(customers: ServerCustomer[]): void {
  ensureDataDir();
  fs.writeFileSync(CUSTOMERS_FILE, JSON.stringify(customers, null, 2), 'utf-8');
}

// Messages CRUD
export function getMessages(): ServerMessage[] {
  ensureDataDir();
  try {
    const data = fs.readFileSync(MESSAGES_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading messages file:', err);
    return SEED_MESSAGES;
  }
}

export function saveMessages(messages: ServerMessage[]): void {
  ensureDataDir();
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2), 'utf-8');
}

export function createMessage(msg: ServerMessage): ServerMessage {
  const messages = getMessages();
  const updated = [msg, ...messages];
  saveMessages(updated);
  return msg;
}

export function updateMessage(id: string, status: ServerMessage['status'], reply?: string): ServerMessage | null {
  const messages = getMessages();
  const index = messages.findIndex((m) => m.id === id);
  if (index === -1) return null;
  messages[index].status = status;
  if (reply !== undefined) {
    messages[index].reply = reply;
  }
  saveMessages(messages);
  return messages[index];
}

export function deleteMessage(id: string): boolean {
  const messages = getMessages();
  const filtered = messages.filter((m) => m.id !== id);
  if (filtered.length === messages.length) return false;
  saveMessages(filtered);
  return true;
}
