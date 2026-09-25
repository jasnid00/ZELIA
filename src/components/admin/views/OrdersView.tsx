import React, { useState } from 'react';
import {
  Search,
  Filter,
  Eye,
  Truck,
  CheckCircle2,
  Clock,
  XCircle,
  FileText,
  Printer,
  ChevronRight,
  Shield,
  Trash2,
  X,
  CreditCard,
  MapPin,
  Phone,
  Mail,
  PackageCheck
} from 'lucide-react';
import { useAdminData } from '../../../context/AdminDataContext';
import { Order, OrderStatus } from '../../../types';
import { formatINR } from '../../../utils/currency';
import { handleImageError } from '../../../utils/imageFallback';

interface OrdersViewProps {
  initialSelectedOrderId?: string | null;
  onClearSelectedOrder?: () => void;
}

export const OrdersView: React.FC<OrdersViewProps> = ({
  initialSelectedOrderId,
  onClearSelectedOrder
}) => {
  const { orders, updateOrderStatus, deleteOrder } = useAdminData();

  const [statusFilter, setStatusFilter] = useState<'All' | OrderStatus>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(() => {
    if (initialSelectedOrderId) {
      return orders.find((o) => o.id === initialSelectedOrderId) || null;
    }
    return null;
  });
  const [trackingInput, setTrackingInput] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync if initialSelectedOrderId changes
  React.useEffect(() => {
    if (initialSelectedOrderId) {
      const match = orders.find((o) => o.id === initialSelectedOrderId);
      if (match) {
        setSelectedOrder(match);
        setTrackingInput(match.trackingNumber || '');
      }
    }
  }, [initialSelectedOrderId, orders]);

  const showToast = (text: string) => {
    setToastMessage(text);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Pending':
        return 'text-amber-800 bg-amber-50 border-amber-200';
      case 'Confirmed':
        return 'text-sky-800 bg-sky-50 border-sky-200';
      case 'Shipped':
        return 'text-indigo-800 bg-indigo-50 border-indigo-200';
      case 'Delivered':
        return 'text-emerald-800 bg-emerald-50 border-emerald-200';
      case 'Cancelled':
        return 'text-neutral-500 bg-neutral-100 border-neutral-200';
      default:
        return 'text-neutral-700 bg-neutral-50 border-neutral-200';
    }
  };

  // Status counts
  const pendingCount = orders.filter((o) => o.status === 'Pending').length;
  const confirmedCount = orders.filter((o) => o.status === 'Confirmed').length;
  const shippedCount = orders.filter((o) => o.status === 'Shipped').length;
  const deliveredCount = orders.filter((o) => o.status === 'Delivered').length;
  const cancelledCount = orders.filter((o) => o.status === 'Cancelled').length;

  const filteredOrders = orders.filter((order) => {
    if (statusFilter !== 'All' && order.status !== statusFilter) {
      return false;
    }
    const q = searchQuery.toLowerCase().trim();
    if (q) {
      const matchNum = order.orderNumber.toLowerCase().includes(q);
      const matchName = order.customerName.toLowerCase().includes(q);
      const matchEmail = order.customerEmail.toLowerCase().includes(q);
      const matchCity = order.shippingAddress.city.toLowerCase().includes(q);
      const matchPhone = order.customerPhone.includes(q);
      if (!matchNum && !matchName && !matchEmail && !matchCity && !matchPhone) {
        return false;
      }
    }
    return true;
  });

  const handleOpenOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setTrackingInput(order.trackingNumber || '');
  };

  const handleCloseOrderDetails = () => {
    setSelectedOrder(null);
    if (onClearSelectedOrder) onClearSelectedOrder();
  };

  const handleUpdateStatus = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, newStatus, trackingInput);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
    showToast(`Order status updated to "${newStatus}".`);
  };

  const handleSaveTracking = () => {
    if (selectedOrder) {
      updateOrderStatus(selectedOrder.id, selectedOrder.status, trackingInput.trim());
      setSelectedOrder((prev) =>
        prev ? { ...prev, trackingNumber: trackingInput.trim() } : null
      );
      showToast('Courier air tracking number saved.');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2C241E] text-white px-5 py-3 rounded-2xl shadow-2xl border border-[#D4AF37]/60 flex items-center gap-3 text-xs tracking-wider">
          <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Info */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E8DFD4] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif-luxury text-2xl text-[#2C241E] font-medium">
            Order Management & Fulfillment
          </h2>
          <p className="text-xs text-[#7A6A5D] mt-0.5">
            Monitor and fulfill luxury fragrance shipments across India with automated status tracking.
          </p>
        </div>

        {/* Status Badges Summary */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 font-medium">
            {pendingCount} Pending Dispatch
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-800 border border-indigo-200 font-medium">
            {shippedCount} In Transit
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
            {deliveredCount} Delivered
          </span>
        </div>
      </div>

      {/* Status Segmented Filter Bar */}
      <div className="flex items-center gap-1.5 p-1.5 bg-[#E8DFD4]/60 rounded-2xl overflow-x-auto text-xs font-medium">
        {(
          [
            { id: 'All', label: 'All Orders', count: orders.length },
            { id: 'Pending', label: 'Pending', count: pendingCount },
            { id: 'Confirmed', label: 'Confirmed', count: confirmedCount },
            { id: 'Shipped', label: 'Shipped', count: shippedCount },
            { id: 'Delivered', label: 'Delivered', count: deliveredCount },
            { id: 'Cancelled', label: 'Cancelled', count: cancelledCount }
          ] as const
        ).map((tab) => {
          const isActive = statusFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                isActive
                  ? 'bg-white text-[#2C241E] shadow-xs font-semibold'
                  : 'text-[#6E5D53] hover:text-[#2C241E]'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-[#FAF7F2] text-[#9A7B38]' : 'bg-[#E8DFD4] text-[#7A6A5D]'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search Input */}
      <div className="bg-white p-4 rounded-2xl border border-[#E8DFD4] shadow-xs flex items-center gap-3 text-xs">
        <Search className="w-4 h-4 text-[#7A6A5D]" />
        <input
          type="text"
          placeholder="Filter by Order #, client name, email, phone or city..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent text-[#2C241E] placeholder:text-[#A6978A] focus:outline-none"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="text-xs text-[#7A6A5D] hover:text-[#2C241E] cursor-pointer"
          >
            Clear
          </button>
        )}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-[#E8DFD4] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#FAF7F2] text-[11px] uppercase tracking-wider text-[#7A6A5D] font-medium border-b border-[#E8DFD4]">
                <th className="py-3 px-4 sm:px-6">Order ID & Date</th>
                <th className="py-3 px-4">Patron & Destination</th>
                <th className="py-3 px-4">Flacons Ordered</th>
                <th className="py-3 px-4 text-right">Total Amount</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8DFD4]">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#7A6A5D]">
                    No orders found matching the filter criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-[#FAF7F2]/60 transition-colors"
                  >
                    {/* Order Number & Date */}
                    <td className="py-4 px-4 sm:px-6">
                      <span className="font-mono font-semibold text-[#2C241E] block text-sm">
                        {order.orderNumber}
                      </span>
                      <span className="text-[11px] text-[#7A6A5D]">
                        {new Date(order.date).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </td>

                    {/* Patron Name & City */}
                    <td className="py-4 px-4">
                      <span className="font-semibold text-[#2C241E] block">
                        {order.customerName}
                      </span>
                      <span className="text-[11px] text-[#7A6A5D] flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-[#9A7B38]" />
                        {order.shippingAddress.city}, {order.shippingAddress.pinCode}
                      </span>
                    </td>

                    {/* Flacons */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        {order.items.slice(0, 2).map((item, idx) => (
                          <div
                            key={idx}
                            className="w-8 h-8 rounded-lg overflow-hidden border border-[#E8DFD4] bg-[#FAF7F2] shrink-0"
                            title={`${item.perfumeName} (${item.volume})`}
                          >
                            <img
                              src={item.image}
                              alt={item.perfumeName}
                              onError={(e) => handleImageError(e, item.perfumeName)}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                        <span className="text-[#6E5D53] text-[11px] truncate max-w-[150px]">
                          {order.items.map((i) => `${i.perfumeName} (x${i.quantity})`).join(', ')}
                        </span>
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="py-4 px-4 text-right font-mono font-semibold text-[#2C241E] text-sm tabular-nums">
                      {formatINR(order.total)}
                    </td>

                    {/* Payment Mode */}
                    <td className="py-4 px-4">
                      <span className="uppercase tracking-wider font-mono text-[10px] px-2 py-0.5 bg-[#FAF6F0] border border-[#E8DFD4] rounded-md font-semibold text-[#2C241E] block w-fit">
                        {order.paymentMethod}
                      </span>
                      <span className="text-[10px] text-emerald-700 font-medium block mt-0.5">
                        {order.paymentStatus}
                      </span>
                    </td>

                    {/* Status Select */}
                    <td className="py-4 px-4">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleUpdateStatus(order.id, e.target.value as OrderStatus)
                        }
                        className={`text-xs font-semibold px-2.5 py-1 rounded-lg border cursor-pointer focus:outline-none transition-colors ${getStatusBadge(
                          order.status
                        )}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>

                    {/* View Details Button */}
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => handleOpenOrderDetails(order)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#E8DFD4] hover:bg-[#FAF7F2] text-[#2C241E] hover:text-[#9A7B38] hover:border-[#D4AF37] transition-colors cursor-pointer font-medium"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Details</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Drawer / Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#1C1714]/70 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl border border-[#D4AF37]/50 shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col my-auto animate-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-[#E8DFD4] flex items-center justify-between bg-[#FAF7F2] rounded-t-3xl">
              <div>
                <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#9A7B38]">
                  Order Dispatch Docket
                </span>
                <div className="flex items-center gap-3 mt-1">
                  <h3 className="font-serif-luxury text-2xl text-[#2C241E] font-medium font-mono">
                    {selectedOrder.orderNumber}
                  </h3>
                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${getStatusBadge(
                      selectedOrder.status
                    )}`}
                  >
                    {selectedOrder.status}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCloseOrderDetails}
                className="p-2 text-[#7A6A5D] hover:text-[#2C241E] rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 sm:p-6 space-y-6 overflow-y-auto text-xs flex-1">
              {/* Status Action Buttons */}
              <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E8DFD4] space-y-2">
                <span className="text-[11px] font-semibold text-[#2C241E] uppercase tracking-wider block">
                  Quick Status Transition:
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => handleUpdateStatus(selectedOrder.id, 'Pending')}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-medium cursor-pointer transition-colors ${
                      selectedOrder.status === 'Pending'
                        ? 'bg-amber-100 border-amber-300 text-amber-900 font-semibold'
                        : 'bg-white border-[#E8DFD4] text-[#6E5D53] hover:bg-amber-50'
                    }`}
                  >
                    Pending
                  </button>

                  <button
                    onClick={() => handleUpdateStatus(selectedOrder.id, 'Confirmed')}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-medium cursor-pointer transition-colors ${
                      selectedOrder.status === 'Confirmed'
                        ? 'bg-sky-100 border-sky-300 text-sky-900 font-semibold'
                        : 'bg-white border-[#E8DFD4] text-[#6E5D53] hover:bg-sky-50'
                    }`}
                  >
                    Confirmed
                  </button>

                  <button
                    onClick={() => handleUpdateStatus(selectedOrder.id, 'Shipped')}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-medium cursor-pointer transition-colors ${
                      selectedOrder.status === 'Shipped'
                        ? 'bg-indigo-100 border-indigo-300 text-indigo-900 font-semibold'
                        : 'bg-white border-[#E8DFD4] text-[#6E5D53] hover:bg-indigo-50'
                    }`}
                  >
                    Shipped
                  </button>

                  <button
                    onClick={() => handleUpdateStatus(selectedOrder.id, 'Delivered')}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-medium cursor-pointer transition-colors ${
                      selectedOrder.status === 'Delivered'
                        ? 'bg-emerald-100 border-emerald-300 text-emerald-900 font-semibold'
                        : 'bg-white border-[#E8DFD4] text-[#6E5D53] hover:bg-emerald-50'
                    }`}
                  >
                    Delivered
                  </button>

                  <button
                    onClick={() => handleUpdateStatus(selectedOrder.id, 'Cancelled')}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-medium cursor-pointer transition-colors ${
                      selectedOrder.status === 'Cancelled'
                        ? 'bg-rose-100 border-rose-300 text-rose-900 font-semibold'
                        : 'bg-white border-[#E8DFD4] text-[#6E5D53] hover:bg-rose-50'
                    }`}
                  >
                    Cancelled
                  </button>
                </div>
              </div>

              {/* Courier Air Tracking Box */}
              <div className="p-4 bg-white rounded-2xl border border-[#E8DFD4] space-y-2">
                <label className="font-semibold text-[#2C241E] flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#9A7B38]" />
                  <span>Bluedart Air Express Tracking Reference</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. BD-AIR-948271"
                    value={trackingInput}
                    onChange={(e) => setTrackingInput(e.target.value)}
                    className="flex-1 bg-[#FAF7F2] border border-[#E8DFD4] rounded-xl px-3 py-2 text-[#2C241E] font-mono focus:outline-none focus:border-[#D4AF37]"
                  />
                  <button
                    onClick={handleSaveTracking}
                    className="px-4 py-2 bg-[#2C241E] hover:bg-[#9A7B38] text-white rounded-xl font-medium transition-colors cursor-pointer"
                  >
                    Update Tracking
                  </button>
                </div>
              </div>

              {/* Patron & Destination Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-[#FAF7F2] rounded-2xl border border-[#E8DFD4]">
                <div>
                  <span className="text-[10px] tracking-wider uppercase text-[#7A6A5D] font-semibold block mb-1">
                    Patron Details
                  </span>
                  <p className="font-semibold text-[#2C241E] text-sm">
                    {selectedOrder.customerName}
                  </p>
                  <p className="text-[#6E5D53] flex items-center gap-1 mt-1">
                    <Mail className="w-3.5 h-3.5 text-[#9A7B38]" />
                    {selectedOrder.customerEmail}
                  </p>
                  <p className="text-[#6E5D53] flex items-center gap-1 mt-1">
                    <Phone className="w-3.5 h-3.5 text-[#9A7B38]" />
                    {selectedOrder.customerPhone}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] tracking-wider uppercase text-[#7A6A5D] font-semibold block mb-1">
                    Delivery Address
                  </span>
                  <p className="text-[#2C241E] font-medium leading-relaxed">
                    {selectedOrder.shippingAddress.address}
                  </p>
                  <p className="text-[#6E5D53] mt-0.5">
                    {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state || 'India'} - {selectedOrder.shippingAddress.pinCode}
                  </p>
                  {selectedOrder.notes && (
                    <div className="mt-2 p-2 bg-white rounded-lg border border-[#E8DFD4] text-[11px] text-[#7A6A5D] italic">
                      Note: "{selectedOrder.notes}"
                    </div>
                  )}
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                <span className="font-semibold text-[#2C241E] block">
                  Flacons Ordered ({selectedOrder.items.length})
                </span>

                <div className="divide-y divide-[#E8DFD4] border border-[#E8DFD4] rounded-2xl overflow-hidden bg-white">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="p-3.5 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-14 rounded-xl overflow-hidden border border-[#E8DFD4] bg-[#FAF7F2] shrink-0">
                          <img
                            src={item.image}
                            alt={item.perfumeName}
                            onError={(e) => handleImageError(e, item.perfumeName)}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <span className="font-serif-luxury text-base text-[#2C241E] font-medium block">
                            {item.perfumeName}
                          </span>
                          <span className="text-[11px] text-[#7A6A5D]">
                            Size: {item.volume} · Qty: {item.quantity}
                          </span>
                        </div>
                      </div>

                      <div className="text-right font-mono font-semibold text-[#2C241E] tabular-nums">
                        {formatINR(item.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial Breakdown */}
              <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E8DFD4] space-y-2 text-xs">
                <div className="flex justify-between text-[#6E5D53]">
                  <span>Subtotal:</span>
                  <span className="font-mono tabular-nums">{formatINR(selectedOrder.subtotal)}</span>
                </div>
                {selectedOrder.discount > 0 && (
                  <div className="flex justify-between text-rose-700">
                    <span>Privilege Voucher Discount:</span>
                    <span className="font-mono tabular-nums">- {formatINR(selectedOrder.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#6E5D53]">
                  <span>Doorstep Air Shipping:</span>
                  <span className="font-mono tabular-nums">
                    {selectedOrder.shipping === 0 ? 'Complimentary' : formatINR(selectedOrder.shipping)}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#E8DFD4] flex justify-between font-serif-luxury text-xl text-[#2C241E] font-medium">
                  <span>Grand Total:</span>
                  <span className="font-mono text-[#9A7B38] font-bold tabular-nums">
                    {formatINR(selectedOrder.total)}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 sm:p-5 border-t border-[#E8DFD4] bg-[#FAF7F2] rounded-b-3xl flex items-center justify-between">
              <button
                onClick={() => {
                  deleteOrder(selectedOrder.id);
                  handleCloseOrderDetails();
                  showToast('Order record removed.');
                }}
                className="text-xs text-rose-600 hover:text-rose-800 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove Order</span>
              </button>

              <button
                onClick={handleCloseOrderDetails}
                className="px-5 py-2 bg-[#2C241E] hover:bg-[#9A7B38] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
