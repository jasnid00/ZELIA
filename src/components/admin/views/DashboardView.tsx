import React from 'react';
import {
  TrendingUp,
  ShoppingCart,
  Users,
  Package,
  ArrowUpRight,
  Clock,
  CheckCircle,
  Truck,
  AlertTriangle,
  Plus,
  ArrowRight,
  Eye,
  Sparkles
} from 'lucide-react';
import { useAdminData } from '../../../context/AdminDataContext';
import { formatINR } from '../../../utils/currency';
import { AdminTab } from '../AdminSidebar';
import { OrderStatus } from '../../../types';
import { handleImageError } from '../../../utils/imageFallback';

interface DashboardViewProps {
  onNavigate: (tab: AdminTab) => void;
  onViewOrder: (orderId: string) => void;
  onAddProduct: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  onViewOrder,
  onAddProduct
}) => {
  const { orders, customers, perfumes, updateOrderStatus, settings } = useAdminData();

  // Metrics computation
  const totalSales = orders
    .filter((o) => o.status !== 'Cancelled')
    .reduce((acc, o) => acc + o.total, 0);

  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === 'Pending').length;
  const shippedOrders = orders.filter((o) => o.status === 'Shipped').length;
  const deliveredOrders = orders.filter((o) => o.status === 'Delivered').length;

  const totalCustomers = customers.length;
  const vipCustomers = customers.filter(
    (c) => c.tier === 'Gold Reserve VIP' || c.tier === 'Haute Member'
  ).length;

  const totalProducts = perfumes.length;
  const lowStockCount = perfumes.filter(
    (p) => (p.stockCount ?? 10) <= settings.lowStockThreshold
  ).length;

  // Recent 6 orders
  const recentOrders = [...orders].slice(0, 6);

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

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Total Sales */}
        <div className="p-5 sm:p-6 bg-white rounded-2xl border border-[#E8DFD4] shadow-xs relative overflow-hidden group hover:border-[#D4AF37]/60 transition-all">
          <div className="flex items-center justify-between text-xs text-[#7A6A5D] font-medium tracking-wide uppercase">
            <span>Total Sales Revenue</span>
            <div className="w-8 h-8 rounded-xl bg-[#FAF6F0] border border-[#E8DFD4] flex items-center justify-center text-[#9A7B38]">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="font-serif-luxury text-3xl text-[#2C241E] font-medium tracking-tight font-mono tabular-nums">
              {formatINR(totalSales)}
            </span>
          </div>
          <div className="mt-2.5 flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+18.4% this month</span>
            <span className="text-[#7A6A5D] font-normal">· Pan-India orders</span>
          </div>
        </div>

        {/* Total Orders */}
        <div className="p-5 sm:p-6 bg-white rounded-2xl border border-[#E8DFD4] shadow-xs relative overflow-hidden group hover:border-[#D4AF37]/60 transition-all">
          <div className="flex items-center justify-between text-xs text-[#7A6A5D] font-medium tracking-wide uppercase">
            <span>Total Orders</span>
            <div className="w-8 h-8 rounded-xl bg-[#FAF6F0] border border-[#E8DFD4] flex items-center justify-center text-[#9A7B38]">
              <ShoppingCart className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="font-serif-luxury text-3xl text-[#2C241E] font-medium tracking-tight font-mono tabular-nums">
              {totalOrders}
            </span>
          </div>
          <div className="mt-2.5 flex items-center gap-2 text-xs text-[#7A6A5D]">
            <span className="text-amber-800 font-medium">{pendingOrders} Pending</span>
            <span>·</span>
            <span className="text-emerald-700 font-medium">{deliveredOrders} Delivered</span>
          </div>
        </div>

        {/* Total Customers */}
        <div className="p-5 sm:p-6 bg-white rounded-2xl border border-[#E8DFD4] shadow-xs relative overflow-hidden group hover:border-[#D4AF37]/60 transition-all">
          <div className="flex items-center justify-between text-xs text-[#7A6A5D] font-medium tracking-wide uppercase">
            <span>VIP Clientele</span>
            <div className="w-8 h-8 rounded-xl bg-[#FAF6F0] border border-[#E8DFD4] flex items-center justify-center text-[#9A7B38]">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="font-serif-luxury text-3xl text-[#2C241E] font-medium tracking-tight font-mono tabular-nums">
              {totalCustomers}
            </span>
          </div>
          <div className="mt-2.5 flex items-center gap-1.5 text-xs text-[#7A6A5D]">
            <span className="text-[#9A7B38] font-medium font-mono">{vipCustomers}</span>
            <span>Gold Reserve & Haute patrons</span>
          </div>
        </div>

        {/* Total Perfume Flacons */}
        <div className="p-5 sm:p-6 bg-white rounded-2xl border border-[#E8DFD4] shadow-xs relative overflow-hidden group hover:border-[#D4AF37]/60 transition-all">
          <div className="flex items-center justify-between text-xs text-[#7A6A5D] font-medium tracking-wide uppercase">
            <span>Perfume Catalog</span>
            <div className="w-8 h-8 rounded-xl bg-[#FAF6F0] border border-[#E8DFD4] flex items-center justify-center text-[#9A7B38]">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="font-serif-luxury text-3xl text-[#2C241E] font-medium tracking-tight font-mono tabular-nums">
              {totalProducts}
            </span>
          </div>
          <div className="mt-2.5 flex items-center gap-2 text-xs">
            {lowStockCount > 0 ? (
              <span className="text-rose-700 font-medium flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                {lowStockCount} low stock alerts
              </span>
            ) : (
              <span className="text-emerald-700 font-medium">Full stock nominal</span>
            )}
          </div>
        </div>
      </div>

      {/* Quick Atelier Actions Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-linear-to-r from-[#2C241E] to-[#3E342B] text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-[#5C4E43]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
              Atelier Management Quick Actions
            </span>
          </div>
          <p className="text-sm text-[#EADBCE]">
            Expand your haute perfumerie catalog, fulfill pending bottle dispatches, or review customer inquiries.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onAddProduct}
            className="px-4 py-2 bg-[#D4AF37] hover:bg-[#E5C158] text-[#1C1714] text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Perfume</span>
          </button>

          <button
            onClick={() => onNavigate('orders')}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-medium rounded-xl border border-white/20 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <ShoppingCart className="w-4 h-4 text-[#D4AF37]" />
            <span>Manage Orders</span>
          </button>

          <button
            onClick={() => onNavigate('offers')}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-medium rounded-xl border border-white/20 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <span>Privilege Offers</span>
          </button>
        </div>
      </div>

      {/* Low Stock Warning Section (if any) */}
      {lowStockCount > 0 && (
        <div className="p-4 sm:p-5 bg-[#FFFBEB] rounded-2xl border border-[#FDE68A] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#FEF3C7] text-amber-800">
              <AlertTriangle className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <p className="font-semibold text-[#2C241E]">
                Attention: {lowStockCount} perfume flacon{lowStockCount > 1 ? 's are' : ' is'} below the inventory threshold (≤ {settings.lowStockThreshold} units).
              </p>
              <p className="text-[#7A6A5D]">
                Replenish stock to prevent dispatch delays during peak high-volume periods.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('products')}
            className="px-3.5 py-1.5 rounded-xl bg-[#2C241E] text-white hover:bg-[#9A7B38] transition-colors font-medium whitespace-nowrap cursor-pointer"
          >
            View Low Stock Flacons
          </button>
        </div>
      )}

      {/* Recent Orders Section */}
      <div className="bg-white rounded-2xl border border-[#E8DFD4] shadow-xs overflow-hidden">
        {/* Table Header */}
        <div className="p-5 sm:p-6 border-b border-[#E8DFD4] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-serif-luxury text-xl sm:text-2xl text-[#2C241E] font-medium tracking-wide">
                Recent Orders & Dispatches
              </h2>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Cloud DB
              </span>
            </div>
            <p className="text-xs text-[#7A6A5D] mt-0.5">
              Live orders placed by customers across India automatically synced to the central database
            </p>
          </div>

          <button
            onClick={() => onNavigate('orders')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#9A7B38] hover:text-[#2C241E] transition-colors cursor-pointer"
          >
            <span>View All ({orders.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAF7F2] text-[11px] uppercase tracking-wider text-[#7A6A5D] font-medium border-b border-[#E8DFD4]">
                <th className="py-3 px-4 sm:px-6">Order ID</th>
                <th className="py-3 px-4">Patron & Destination</th>
                <th className="py-3 px-4">Flacons Ordered</th>
                <th className="py-3 px-4 text-right">Total Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8DFD4] text-xs">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-[#FAF7F2]/60 transition-colors">
                  {/* Order Number */}
                  <td className="py-4 px-4 sm:px-6">
                    <span className="font-mono font-semibold text-[#2C241E] block">
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

                  {/* Customer */}
                  <td className="py-4 px-4">
                    <span className="font-medium text-[#2C241E] block">
                      {order.customerName}
                    </span>
                    <span className="text-[11px] text-[#7A6A5D]">
                      {order.shippingAddress.city}, {order.shippingAddress.state || 'India'}
                    </span>
                  </td>

                  {/* Items */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      {order.items.slice(0, 2).map((item, i) => (
                        <div
                          key={i}
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
                      <span className="text-[#6E5D53] truncate max-w-[140px] text-[11px]">
                        {order.items.map((it) => it.perfumeName).join(', ')}
                      </span>
                    </div>
                  </td>

                  {/* Total */}
                  <td className="py-4 px-4 text-right font-mono font-semibold text-[#2C241E] tabular-nums">
                    {formatINR(order.total)}
                  </td>

                  {/* Status Dropdown */}
                  <td className="py-4 px-4">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateOrderStatus(order.id, e.target.value as OrderStatus)
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

                  {/* Action */}
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => onViewOrder(order.id)}
                      className="p-1.5 rounded-lg border border-[#E8DFD4] hover:bg-[#EDE4D8] text-[#2C241E] transition-colors cursor-pointer"
                      title="View Order Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
