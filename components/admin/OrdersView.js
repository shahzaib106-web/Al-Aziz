'use client';
import { useState } from 'react';
import {
  ClipboardList,
  Printer,
  Plus,
  Clock,
  CheckCircle2,
  CheckCircle,
  XCircle,
  Calendar,
  ChevronDown,
  Search,
  MoreHorizontal,
  Phone,
  MessageCircle,
  Send,
  Edit,
  Utensils,
  Bike,
  ShoppingBag,
  ChefHat,
  AlertCircle,
  X,
} from 'lucide-react';
import { MOCK_ORDERS } from './data';

export default function OrdersView() {
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [selectedOrderId, setSelectedOrderId] = useState('#1042');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [newOrderModal, setNewOrderModal] = useState(false);

  const selectedOrder = orders.find((o) => o.id === selectedOrderId) || orders[0];

  const filteredOrders = orders.filter((o) => {
    if (statusFilter !== 'All' && o.status.toLowerCase() !== statusFilter.toLowerCase()) return false;
    if (typeFilter !== 'All' && o.type.toLowerCase() !== typeFilter.toLowerCase()) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        o.id.toLowerCase().includes(q) ||
        o.customer.name.toLowerCase().includes(q) ||
        o.customer.phone.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-red-700" />
            <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
              Orders Management
            </h1>
          </div>
          <p className="text-[13px] text-stone-500">
            Manage all restaurant orders, track status and handle operations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-semibold shadow-xs transition">
            <Printer className="w-3.5 h-3.5 text-stone-500" />
            <span>Print KOT (3)</span>
          </button>
          <button
            onClick={() => setNewOrderModal(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#911116] hover:bg-[#7D0E12] text-white text-xs font-semibold shadow-xs transition"
          >
            <Plus className="w-4 h-4" />
            <span>New Order</span>
          </button>
        </div>
      </div>

      {/* Top Status Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* All Orders */}
        <button
          onClick={() => setStatusFilter('All')}
          className={`bg-white rounded-xl p-3 border text-left transition shadow-xs ${
            statusFilter === 'All' ? 'border-red-600 ring-1 ring-red-600' : 'border-stone-200 hover:border-stone-300'
          }`}
        >
          <div className="flex items-center justify-between text-stone-500 text-xs">
            <span>All Orders</span>
            <ClipboardList className="w-4 h-4 text-stone-400" />
          </div>
          <div className="text-xl font-bold text-stone-900 mt-1">48</div>
        </button>

        {/* Pending */}
        <button
          onClick={() => setStatusFilter('Pending')}
          className={`bg-white rounded-xl p-3 border text-left transition shadow-xs ${
            statusFilter === 'Pending' ? 'border-amber-500 ring-1 ring-amber-500' : 'border-stone-200 hover:border-stone-300'
          }`}
        >
          <div className="flex items-center justify-between text-stone-500 text-xs">
            <span>Pending</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-xl font-bold text-amber-600 mt-1">12</div>
        </button>

        {/* Preparing */}
        <button
          onClick={() => setStatusFilter('Preparing')}
          className={`bg-white rounded-xl p-3 border text-left transition shadow-xs ${
            statusFilter === 'Preparing' ? 'border-blue-500 ring-1 ring-blue-500' : 'border-stone-200 hover:border-stone-300'
          }`}
        >
          <div className="flex items-center justify-between text-stone-500 text-xs">
            <span>Preparing</span>
            <ChefHat className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-xl font-bold text-blue-600 mt-1">8</div>
        </button>

        {/* Ready */}
        <button
          onClick={() => setStatusFilter('Ready')}
          className={`bg-white rounded-xl p-3 border text-left transition shadow-xs ${
            statusFilter === 'Ready' ? 'border-emerald-500 ring-1 ring-emerald-500' : 'border-stone-200 hover:border-stone-300'
          }`}
        >
          <div className="flex items-center justify-between text-stone-500 text-xs">
            <span>Ready</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-xl font-bold text-emerald-600 mt-1">6</div>
        </button>

        {/* Completed */}
        <button
          onClick={() => setStatusFilter('Completed')}
          className={`bg-white rounded-xl p-3 border text-left transition shadow-xs ${
            statusFilter === 'Completed' ? 'border-stone-700 ring-1 ring-stone-700' : 'border-stone-200 hover:border-stone-300'
          }`}
        >
          <div className="flex items-center justify-between text-stone-500 text-xs">
            <span>Completed</span>
            <CheckCircle className="w-4 h-4 text-stone-600" />
          </div>
          <div className="text-xl font-bold text-stone-800 mt-1">18</div>
        </button>

        {/* Cancelled */}
        <button
          onClick={() => setStatusFilter('Cancelled')}
          className={`bg-white rounded-xl p-3 border text-left transition shadow-xs ${
            statusFilter === 'Cancelled' ? 'border-red-500 ring-1 ring-red-500' : 'border-stone-200 hover:border-stone-300'
          }`}
        >
          <div className="flex items-center justify-between text-stone-500 text-xs">
            <span>Cancelled</span>
            <XCircle className="w-4 h-4 text-red-500" />
          </div>
          <div className="text-xl font-bold text-red-600 mt-1">4</div>
        </button>
      </div>

      {/* Sub-filters & Search bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Type pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setTypeFilter('All')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
              typeFilter === 'All'
                ? 'bg-red-50 text-red-700 border border-red-200'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            All Types <span className="ml-1 opacity-70">48</span>
          </button>
          <button
            onClick={() => setTypeFilter('Dine In')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
              typeFilter === 'Dine In'
                ? 'bg-red-50 text-red-700 border border-red-200'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            <Utensils className="w-3 h-3 text-red-600" />
            <span>Dine In</span>
            <span className="opacity-70">18</span>
          </button>
          <button
            onClick={() => setTypeFilter('Takeaway')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
              typeFilter === 'Takeaway'
                ? 'bg-red-50 text-red-700 border border-red-200'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            <ShoppingBag className="w-3 h-3 text-purple-600" />
            <span>Takeaway</span>
            <span className="opacity-70">14</span>
          </button>
          <button
            onClick={() => setTypeFilter('Delivery')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
              typeFilter === 'Delivery'
                ? 'bg-red-50 text-red-700 border border-red-200'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            <Bike className="w-3 h-3 text-blue-600" />
            <span>Delivery</span>
            <span className="opacity-70">16</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by order ID, customer, phone..."
            className="w-full bg-white text-stone-800 placeholder-stone-400 text-xs pl-9 pr-3 py-1.5 rounded-lg border border-stone-200 focus:outline-none focus:border-red-600 shadow-xs"
          />
        </div>
      </div>

      {/* Main 2-Column Split: Table (7 cols) + Order Details Panel (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Table (7 cols) */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50/70 text-stone-500 font-medium">
                  <th className="py-2.5 px-3 w-8">
                    <input type="checkbox" className="rounded-sm border-stone-300 text-red-600 focus:ring-0" />
                  </th>
                  <th className="py-2.5 px-2"># Order ID</th>
                  <th className="py-2.5 px-2">Time</th>
                  <th className="py-2.5 px-2">Customer</th>
                  <th className="py-2.5 px-2">Type</th>
                  <th className="py-2.5 px-2">Amount</th>
                  <th className="py-2.5 px-2">Payment</th>
                  <th className="py-2.5 px-2">Status</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredOrders.map((order) => {
                  const isSelected = selectedOrderId === order.id;
                  return (
                    <tr
                      key={order.id}
                      onClick={() => setSelectedOrderId(order.id)}
                      className={`cursor-pointer transition ${
                        isSelected
                          ? 'bg-red-50/50 font-medium'
                          : 'hover:bg-stone-50/80'
                      }`}
                    >
                      <td className="py-3 px-3" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => setSelectedOrderId(order.id)}
                          className="rounded-sm border-stone-300 text-red-600 focus:ring-0"
                        />
                      </td>
                      <td className="py-3 px-2 font-bold text-stone-900">{order.id}</td>
                      <td className="py-3 px-2 text-stone-400">{order.time}</td>
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 font-bold text-[9px] flex items-center justify-center shrink-0">
                            {order.customer.avatar}
                          </div>
                          <div>
                            <p className="font-semibold text-stone-800 leading-tight">{order.customer.name}</p>
                            <p className="text-[10px] text-stone-400">{order.customer.phone}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-1.5 text-stone-700">
                          {order.type === 'Dine In' && <Utensils className="w-3.5 h-3.5 text-red-600 shrink-0" />}
                          {order.type === 'Takeaway' && <ShoppingBag className="w-3.5 h-3.5 text-purple-600 shrink-0" />}
                          {order.type === 'Delivery' && <Bike className="w-3.5 h-3.5 text-blue-600 shrink-0" />}
                          <span className="font-medium text-[11px]">{order.type}</span>
                          {order.table && <span className="text-[10px] text-stone-400">· {order.table}</span>}
                        </div>
                      </td>
                      <td className="py-3 px-2 font-bold text-stone-900">{order.amount}</td>
                      <td className="py-3 px-2">
                        <span
                          className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            order.payment === 'Paid'
                              ? 'bg-emerald-50 text-emerald-700'
                              : order.payment === 'COD'
                              ? 'bg-amber-50 text-amber-700'
                              : 'bg-blue-50 text-blue-700'
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current" />
                          {order.payment}
                        </span>
                      </td>
                      <td className="py-3 px-2">
                        <span
                          className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            order.status === 'Completed'
                              ? 'bg-emerald-50 text-emerald-700'
                              : order.status === 'Pending'
                              ? 'bg-amber-50 text-amber-700'
                              : order.status === 'Preparing'
                              ? 'bg-blue-50 text-blue-700'
                              : order.status === 'Ready'
                              ? 'bg-teal-50 text-teal-700'
                              : order.status === 'On the way'
                              ? 'bg-purple-50 text-purple-700'
                              : 'bg-red-50 text-red-700'
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button className="p-1 text-stone-400 hover:text-stone-600">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Details Panel (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-stone-200 shadow-xs p-5 flex flex-col justify-between space-y-4">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-red-50 text-red-700 flex items-center justify-center font-bold text-xs">
                  A
                </div>
                <h3 className="font-bold text-stone-900 text-sm">Order Details</h3>
              </div>
              <button className="text-stone-400 hover:text-stone-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Order Title & Status */}
            <div className="flex items-center justify-between mt-3">
              <div>
                <h2 className="text-xl font-black text-stone-900">{selectedOrder.id}</h2>
                <p className="text-xs text-stone-500 font-medium">
                  {selectedOrder.type} {selectedOrder.table ? `· ${selectedOrder.table}` : ''}
                </p>
              </div>
              <div className="text-right">
                <span className="bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {selectedOrder.status}
                </span>
                <p className="text-[11px] text-stone-400 mt-1">{selectedOrder.time}</p>
              </div>
            </div>

            {/* Customer Details */}
            <div className="mt-4 p-3 bg-stone-50 rounded-xl border border-stone-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-amber-200 text-amber-900 font-bold text-xs flex items-center justify-center">
                  {selectedOrder.customer.avatar}
                </div>
                <div>
                  <p className="font-bold text-stone-900 text-xs">{selectedOrder.customer.name}</p>
                  <p className="text-[11px] text-stone-500">{selectedOrder.customer.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <a
                  href={`tel:${selectedOrder.customer.phone}`}
                  className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center hover:bg-amber-100 transition shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                </a>
                <a
                  href={`https://wa.me/${selectedOrder.customer.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center hover:bg-emerald-100 transition shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Order Items */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-stone-800">
                  Order Items ({selectedOrder.items?.length || selectedOrder.itemsCount})
                </span>
                <button className="text-[11px] text-stone-500 hover:text-stone-700 flex items-center gap-1">
                  <Edit className="w-3 h-3" /> Edit Items
                </button>
              </div>

              <div className="divide-y divide-stone-100 text-xs">
                {(selectedOrder.items || []).map((item, idx) => (
                  <div key={idx} className="py-2 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                        <img
                          src={item.img || '/img/biryani.jpg'}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = '/img/biryani.jpg';
                          }}
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-stone-900">
                          {item.name} <span className="text-stone-400 font-normal">x{item.qty}</span>
                        </p>
                        <p className="text-[10px] text-stone-400">{item.variant}</p>
                      </div>
                    </div>
                    <span className="font-bold text-stone-900">Rs. {item.price * item.qty}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Kitchen Notes */}
            {selectedOrder.notes && (
              <div className="mt-3 p-2.5 bg-amber-50/70 border border-amber-200/80 rounded-lg text-amber-900 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-[11px]">Kitchen Notes</span>
                  <p className="text-[11px] text-amber-800">{selectedOrder.notes}</p>
                </div>
              </div>
            )}

            {/* Totals */}
            <div className="mt-4 pt-3 border-t border-stone-100 text-xs space-y-1.5">
              <div className="flex items-center justify-between text-stone-500">
                <span>Subtotal</span>
                <span>Rs. {selectedOrder.subtotal || 2320}</span>
              </div>
              <div className="flex items-center justify-between text-stone-500">
                <span>Tax (8%)</span>
                <span>Rs. {selectedOrder.tax || 160}</span>
              </div>
              <div className="flex items-center justify-between font-black text-sm text-stone-900 pt-1 border-t border-stone-100">
                <span>Total</span>
                <span className="text-red-700 font-black">{selectedOrder.amount}</span>
              </div>
            </div>

            {/* Payment Status */}
            <div className="mt-3 pt-2 border-t border-stone-100 text-xs flex items-center justify-between">
              <span className="text-stone-500">Payment Status</span>
              <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                {selectedOrder.payment} · {selectedOrder.paymentMethod}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2 border-t border-stone-100">
            <div className="grid grid-cols-2 gap-2">
              <button className="py-2 px-3 rounded-lg border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs">
                <Printer className="w-3.5 h-3.5" /> Print Bill
              </button>
              <button
                onClick={() => updateOrderStatus(selectedOrder.id, 'Cancelled')}
                className="py-2 px-3 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs"
              >
                <XCircle className="w-3.5 h-3.5" /> Cancel Order
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => updateOrderStatus(selectedOrder.id, 'Preparing')}
                className="py-2 px-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition"
              >
                <ChefHat className="w-3.5 h-3.5" /> Mark Preparing
              </button>
              <button
                onClick={() => updateOrderStatus(selectedOrder.id, 'Ready')}
                className="py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition"
              >
                <CheckCircle2 className="w-3.5 h-3.5" /> Mark Ready
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Kitchen Queue (Live Orders) + Delivery Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Kitchen Queue (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-xl p-5 border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <ChefHat className="w-4 h-4 text-red-600" />
              <h3 className="font-bold text-stone-900 text-sm">Kitchen Queue (Live Orders)</h3>
            </div>
            <span className="text-xs font-semibold text-red-700 hover:underline cursor-pointer">
              View All &gt;
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Card 1 */}
            <div className="bg-stone-50 rounded-xl p-3 border border-stone-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-stone-900">#1041</span>
                  <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                    5 min
                  </span>
                </div>
                <p className="text-[11px] text-stone-600 mt-2 font-medium">Chicken Biryani x2</p>
                <p className="text-[11px] text-stone-600 font-medium">Dal Makhani x1</p>
              </div>
              <button className="mt-3 w-full py-1 bg-blue-50 text-blue-700 rounded-md font-semibold text-[10px] flex items-center justify-center gap-1">
                Preparing 🔥
              </button>
            </div>

            {/* Card 2 */}
            <div className="bg-stone-50 rounded-xl p-3 border border-stone-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-stone-900">#1039</span>
                  <span className="text-[10px] font-semibold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                    8 min
                  </span>
                </div>
                <p className="text-[11px] text-stone-600 mt-2 font-medium">Beef Seekh Kebab x1</p>
                <p className="text-[11px] text-stone-600 font-medium">Naan x2</p>
              </div>
              <button className="mt-3 w-full py-1 bg-blue-50 text-blue-700 rounded-md font-semibold text-[10px] flex items-center justify-center gap-1">
                Preparing 🔥
              </button>
            </div>

            {/* Card 3 */}
            <div className="bg-stone-50 rounded-xl p-3 border border-stone-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-stone-900">#1042</span>
                  <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                    2 min
                  </span>
                </div>
                <p className="text-[11px] text-stone-600 mt-2 font-medium">Chicken Karahi x1</p>
                <p className="text-[11px] text-stone-600 font-medium">Special Naan x1</p>
              </div>
              <button className="mt-3 w-full py-1 bg-amber-50 text-amber-700 rounded-md font-semibold text-[10px] flex items-center justify-center gap-1">
                Pending 🔥
              </button>
            </div>
          </div>
        </div>

        {/* Delivery Tracker (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-xl p-5 border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Bike className="w-4 h-4 text-red-600" />
              <h3 className="font-bold text-stone-900 text-sm">Delivery Tracker</h3>
            </div>
            <span className="text-xs font-semibold text-red-700 hover:underline cursor-pointer">
              View All &gt;
            </span>
          </div>

          <div className="space-y-2 text-xs">
            {/* Delivery 1 */}
            <div className="flex items-center justify-between p-2.5 bg-stone-50 rounded-xl border border-stone-100">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-purple-600" />
                <span className="font-bold text-stone-900">#1037</span>
                <span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded text-[10px] font-semibold">
                  On the way
                </span>
                <span className="text-stone-400">12 min</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-stone-700 font-medium">Rider: Ali Khan (PKR-4521)</span>
                <Send className="w-3.5 h-3.5 text-blue-600" />
              </div>
            </div>

            {/* Delivery 2 */}
            <div className="flex items-center justify-between p-2.5 bg-stone-50 rounded-xl border border-stone-100">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                <span className="font-bold text-stone-900">#1039</span>
                <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[10px] font-semibold">
                  Preparing
                </span>
                <span className="text-stone-400">-</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-stone-400">Rider: To be assigned</span>
                <button className="px-2 py-0.5 bg-red-700 hover:bg-red-800 text-white rounded text-[10px] font-bold">
                  Assign
                </button>
              </div>
            </div>

            {/* Delivery 3 */}
            <div className="flex items-center justify-between p-2.5 bg-stone-50 rounded-xl border border-stone-100">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                <span className="font-bold text-stone-900">#1034</span>
                <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-[10px] font-semibold">
                  Delivered
                </span>
                <span className="text-stone-400">2:30 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-stone-700 font-medium">Rider: Usman (PKR-8812)</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
