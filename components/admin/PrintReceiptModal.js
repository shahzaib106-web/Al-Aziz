'use client';
import { useState, useEffect } from 'react';
import {
  Printer,
  X,
  Copy,
  Check,
  Receipt,
  ChefHat,
  Share2,
  FileText,
  Clock,
  User,
  Phone,
  Utensils,
  AlertCircle,
} from 'lucide-react';

export default function PrintReceiptModal({
  isOpen,
  onClose,
  order,
  initialMode = 'bill', // 'bill' | 'kot'
  allPendingOrders = [],
}) {
  const [mode, setMode] = useState(initialMode);
  const [selectedOrder, setSelectedOrder] = useState(order);
  const [copied, setCopied] = useState(false);
  const [printSuccess, setPrintSuccess] = useState(false);

  useEffect(() => {
    if (order) {
      setSelectedOrder(order);
    }
  }, [order]);

  useEffect(() => {
    if (initialMode) {
      setMode(initialMode);
    }
  }, [initialMode, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !selectedOrder) return null;

  // Normalized order items
  const items = (selectedOrder.items && selectedOrder.items.length > 0)
    ? selectedOrder.items
    : [
        { name: 'Special Chicken Biryani', variant: 'Regular Spicy', qty: 2, price: 820 },
        { name: 'Special Naan', variant: 'Garlic Butter', qty: 2, price: 150 },
        { name: 'Fresh Mint Raita & Salad', variant: 'Fresh', qty: 1, price: 120 },
      ];

  const subtotal = selectedOrder.subtotal || items.reduce((acc, it) => acc + (it.price || 0) * (it.qty || 1), 0);
  const tax = selectedOrder.tax !== undefined ? selectedOrder.tax : Math.round(subtotal * 0.08);
  const total = selectedOrder.amountNum || (subtotal + tax);
  const formattedTotal = selectedOrder.amount || `Rs. ${total.toLocaleString()}`;

  const orderType = selectedOrder.type || 'Dine In';
  const tableOrSection = selectedOrder.table || (orderType === 'Dine In' ? 'Table 4' : orderType);
  const customerName = selectedOrder.customer?.name || 'Walk-in Guest';
  const customerPhone = selectedOrder.customer?.phone || '+92 300 0000000';
  const orderTime = selectedOrder.time || '10:30 AM';
  const orderDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  // Handle actual browser printing
  const handlePrint = () => {
    setPrintSuccess(true);
    setTimeout(() => {
      window.print();
    }, 150);
    setTimeout(() => {
      setPrintSuccess(false);
    }, 4000);
  };

  // Copy plain text receipt/KOT
  const handleCopy = () => {
    let text = '';
    if (mode === 'bill') {
      text = `================================\n   AL-GHAZI BIRYANI & RESTAURANT\n   Main Markaz F-7, Islamabad\n   Tel: +92 51 2871100 / NTN: 7821940-2\n================================\nInvoice #: INV-${selectedOrder.id.replace('#', '')}\nDate: ${orderDate}  Time: ${orderTime}\nType: ${orderType} ${selectedOrder.table ? `(${selectedOrder.table})` : ''}\nCustomer: ${customerName} (${customerPhone})\n--------------------------------\n` +
        items.map(it => `${it.qty}x ${it.name} ${it.variant ? `(${it.variant})` : ''}\n   @ Rs. ${it.price} = Rs. ${it.price * it.qty}`).join('\n') +
        `\n--------------------------------\nSubtotal: Rs. ${subtotal}\nGST / Tax (8%): Rs. ${tax}\nTOTAL: ${formattedTotal}\nPayment: ${selectedOrder.payment || 'Paid'} (${selectedOrder.paymentMethod || 'Cash'})\n================================\nThank you for dining with us!\nAl-Ghazi Biryani Islamabad\n================================`;
    } else {
      text = `********************************\n   KITCHEN ORDER TICKET (KOT)\n   AL-GHAZI RESTAURANT KITCHEN\n********************************\nKOT #: KOT-${selectedOrder.id.replace('#', '')}-01\nOrder #: ${selectedOrder.id} | ${orderType.toUpperCase()} ${selectedOrder.table ? `[${selectedOrder.table.toUpperCase()}]` : ''}\nTime: ${orderTime} | Date: ${orderDate}\n--------------------------------\n` +
        items.map(it => `[ ${it.qty} ]  ${it.name.toUpperCase()} (${it.variant || 'Standard'})\n${it.notes ? `      >> ${it.notes}\n` : ''}`).join('\n') +
        `\n--------------------------------\nNotes: ${selectedOrder.notes || 'Standard Preparation'}\n********************************\n* CHEF COPY - KEEP ON TRAY *\n********************************`;
    }

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Modal Container */}
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col my-auto max-h-[92vh]">
        
        {/* Top Control Bar (Screen only) */}
        <div className="no-print bg-stone-900 text-white px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#911116] flex items-center justify-center text-white">
              {mode === 'bill' ? <Receipt className="w-4 h-4" /> : <ChefHat className="w-4 h-4" />}
            </div>
            <div>
              <h2 className="text-sm font-bold tracking-tight">
                {mode === 'bill' ? 'Customer Bill Receipt' : 'Kitchen Order Ticket (KOT)'}
              </h2>
              <p className="text-[11px] text-stone-400">
                Order {selectedOrder.id} · 80mm Thermal Printer Format
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode & Switcher Tabs (Screen only) */}
        <div className="no-print bg-stone-100/90 px-4 py-2 border-b border-stone-200 flex flex-wrap items-center justify-between gap-2 text-xs">
          {/* Mode Switcher */}
          <div className="inline-flex p-0.5 rounded-lg bg-stone-200/80">
            <button
              onClick={() => setMode('bill')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold transition ${
                mode === 'bill'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Receipt className="w-3.5 h-3.5 text-stone-700" />
              <span>Customer Bill (Invoice)</span>
            </button>
            <button
              onClick={() => setMode('kot')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold transition ${
                mode === 'kot'
                  ? 'bg-[#911116] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <ChefHat className="w-3.5 h-3.5" />
              <span>Kitchen Ticket (KOT)</span>
            </button>
          </div>

          {/* Quick Order Switcher (if allPendingOrders provided) */}
          {allPendingOrders && allPendingOrders.length > 1 && (
            <div className="flex items-center gap-1 overflow-x-auto">
              <span className="text-[11px] text-stone-400 font-medium">Switch:</span>
              {allPendingOrders.slice(0, 4).map((ord) => (
                <button
                  key={ord.id}
                  onClick={() => setSelectedOrder(ord)}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold border transition ${
                    selectedOrder.id === ord.id
                      ? 'bg-stone-900 text-white border-stone-900'
                      : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                  }`}
                >
                  {ord.id}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Scrollable Receipt Preview Area */}
        <div className="p-4 sm:p-6 overflow-y-auto bg-stone-100 flex justify-center items-center">
          
          {/* 80mm Thermal Receipt Simulation Container */}
          <div
            id="printable-thermal-slip"
            className="printable-area bg-white text-stone-950 font-mono text-[12px] p-5 shadow-lg border border-stone-300 w-full max-w-[340px] rounded-sm select-text relative"
            style={{ fontFamily: "'Courier New', Courier, monospace, 'Inter', sans-serif" }}
          >
            {/* Top jagged cut line graphic */}
            <div className="no-print absolute -top-1.5 left-0 right-0 h-2 bg-radial from-transparent to-stone-100 opacity-20" />

            {/* ===================== BILL / RECEIPT MODE ===================== */}
            {mode === 'bill' && (
              <div>
                {/* Header */}
                <div className="text-center pb-3 border-b-2 border-dashed border-stone-800">
                  <h1 className="text-base font-black tracking-tight uppercase text-stone-900">
                    AL-GHAZI BIRYANI
                  </h1>
                  <p className="text-[11px] font-bold text-stone-700 urdu mt-0.5">
                    الغازی بریانی اینڈ فاسٹ فوڈ
                  </p>
                  <p className="text-[10px] text-stone-600 mt-1">
                    Main Markaz F-7, Jinnah Super, Islamabad
                  </p>
                  <p className="text-[10px] text-stone-600">
                    UAN / Tel: 051-2871100 · 0300-1234567
                  </p>
                  <p className="text-[9px] text-stone-500 mt-0.5">
                    STRN / NTN: 7821940-2 · PRA Registered
                  </p>
                </div>

                {/* Bill Meta */}
                <div className="py-2.5 border-b border-dashed border-stone-400 text-[11px] space-y-1">
                  <div className="flex justify-between font-bold text-stone-900">
                    <span>BILL #: INV-{selectedOrder.id.replace('#', '')}</span>
                    <span className="uppercase">{orderType}</span>
                  </div>
                  <div className="flex justify-between text-stone-700">
                    <span>DATE: {orderDate}</span>
                    <span>TIME: {orderTime}</span>
                  </div>
                  <div className="flex justify-between text-stone-700">
                    <span>TABLE / TOKEN:</span>
                    <span className="font-bold text-stone-900">{tableOrSection}</span>
                  </div>
                  <div className="flex justify-between text-stone-700">
                    <span>CASHIER: POS-01 / Admin</span>
                    <span>SERVER: Tariq M.</span>
                  </div>
                  {customerName && customerName !== 'Walk-in Guest' && (
                    <div className="pt-1 text-stone-700 flex justify-between">
                      <span>CUSTOMER: {customerName}</span>
                      <span className="text-[10px]">{customerPhone}</span>
                    </div>
                  )}
                </div>

                {/* Items Table */}
                <div className="py-2.5 border-b-2 border-dashed border-stone-800">
                  <div className="flex justify-between font-bold text-[10px] uppercase text-stone-700 border-b border-stone-300 pb-1 mb-1.5">
                    <span className="w-6">QTY</span>
                    <span className="flex-1 px-1">ITEM DESCRIPTION</span>
                    <span className="w-14 text-right">PRICE</span>
                    <span className="w-14 text-right">TOTAL</span>
                  </div>

                  <div className="space-y-1.5">
                    {items.map((it, idx) => (
                      <div key={idx} className="flex justify-between text-[11px] leading-tight">
                        <span className="w-6 font-bold text-stone-900">{it.qty}</span>
                        <div className="flex-1 px-1">
                          <p className="font-semibold text-stone-900">{it.name}</p>
                          {it.variant && (
                            <p className="text-[10px] text-stone-500 font-normal italic">
                              ({it.variant})
                            </p>
                          )}
                        </div>
                        <span className="w-14 text-right text-stone-700">
                          {(it.price || 0).toLocaleString()}
                        </span>
                        <span className="w-14 text-right font-bold text-stone-900">
                          {((it.price || 0) * (it.qty || 1)).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Totals */}
                <div className="py-2.5 space-y-1 text-[11px] border-b border-dashed border-stone-400">
                  <div className="flex justify-between text-stone-700">
                    <span>SUBTOTAL:</span>
                    <span>Rs. {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-stone-700">
                    <span>ICT SALES TAX (8%):</span>
                    <span>Rs. {tax.toLocaleString()}</span>
                  </div>
                  {orderType === 'Delivery' && (
                    <div className="flex justify-between text-stone-700">
                      <span>DELIVERY CHARGES:</span>
                      <span>Rs. 150</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-black text-stone-950 pt-1.5 border-t border-dashed border-stone-800">
                    <span>NET PAYABLE:</span>
                    <span>{formattedTotal}</span>
                  </div>
                </div>

                {/* Payment Status & Details */}
                <div className="py-2 text-[10px] text-stone-700 border-b border-dashed border-stone-300 flex justify-between items-center">
                  <span>PAYMENT: <strong className="uppercase">{selectedOrder.paymentMethod || 'Cash'}</strong></span>
                  <span className="font-bold border border-stone-800 px-1.5 py-0.5 rounded-xs">
                    {selectedOrder.payment === 'Paid' ? '*** PAID ***' : 'PENDING'}
                  </span>
                </div>

                {/* Simulated Barcode */}
                <div className="pt-3 pb-1 text-center">
                  <div className="inline-block tracking-widest text-xs font-mono font-bold letter-spacing-2">
                    ||| | ||||| || |||| ||| |||| | ||| ||||
                  </div>
                  <p className="text-[9px] text-stone-500 mt-0.5">
                    *INV{selectedOrder.id.replace('#', '')}*
                  </p>
                </div>

                {/* Footer Notes */}
                <div className="text-center pt-2 text-[10px] text-stone-600 space-y-1">
                  <p className="font-bold">Thank you for dining at Al-Ghazi!</p>
                  <p className="urdu text-[11px] font-semibold text-stone-800">
                    جزاک اللہ خیر · برائے مہربانی دوبارہ تشریف لائیں
                  </p>
                  <p className="text-[9px] text-stone-400 pt-1">
                    Tax Invoice printed via Al-Ghazi Cloud POS
                  </p>
                </div>
              </div>
            )}

            {/* ===================== KOT MODE ===================== */}
            {mode === 'kot' && (
              <div>
                {/* Header */}
                <div className="text-center pb-2.5 border-b-4 border-stone-900">
                  <h1 className="text-sm font-black tracking-wider uppercase text-stone-950">
                    *** KITCHEN ORDER TICKET (KOT) ***
                  </h1>
                  <p className="text-[11px] font-bold text-stone-800 mt-0.5">
                    AL-GHAZI BIRYANI - CHEF COPY
                  </p>
                </div>

                {/* Huge Token / Table Header */}
                <div className="py-2.5 bg-stone-100 text-center border-b-2 border-stone-900 my-1">
                  <p className="text-[10px] uppercase font-bold text-stone-600 tracking-wider">
                    {orderType} ORDER
                  </p>
                  <p className="text-2xl font-black text-stone-950 uppercase tracking-tight">
                    {tableOrSection}
                  </p>
                  <p className="text-[11px] font-bold text-stone-800">
                    ORDER {selectedOrder.id}
                  </p>
                </div>

                {/* KOT Meta Info */}
                <div className="py-2 border-b border-dashed border-stone-800 text-[11px] space-y-1">
                  <div className="flex justify-between font-bold">
                    <span>KOT #: KOT-{selectedOrder.id.replace('#', '')}-01</span>
                    <span>TIME: {orderTime}</span>
                  </div>
                  <div className="flex justify-between text-stone-700">
                    <span>DATE: {orderDate}</span>
                    <span>SERVER: Tariq (St-3)</span>
                  </div>
                  <div className="flex justify-between text-stone-700">
                    <span>STATION: ALL KITCHEN DECKS</span>
                    <span className="font-bold text-red-700 uppercase">PRIORITY 🔥</span>
                  </div>
                </div>

                {/* Items to Cook */}
                <div className="py-2.5 border-b-2 border-dashed border-stone-900">
                  <div className="flex justify-between font-bold text-[10px] uppercase text-stone-700 border-b border-stone-300 pb-1 mb-2">
                    <span className="w-10">QTY</span>
                    <span className="flex-1">ITEM & SPECIAL INSTRUCTION</span>
                  </div>

                  <div className="space-y-3">
                    {items.map((it, idx) => (
                      <div key={idx} className="flex items-start gap-2 border-b border-stone-200 pb-2">
                        <span className="w-8 text-center py-0.5 bg-stone-900 text-white font-black text-sm rounded-xs shrink-0">
                          {it.qty}
                        </span>
                        <div className="flex-1">
                          <p className="font-black text-stone-950 text-xs uppercase leading-tight">
                            {it.name}
                          </p>
                          {it.variant && (
                            <p className="text-[11px] font-bold text-stone-700 mt-0.5">
                              Portion: <span className="underline">{it.variant}</span>
                            </p>
                          )}
                          {it.notes && (
                            <p className="text-[10px] font-semibold text-red-700 bg-red-50 p-1 rounded mt-1 border border-red-200">
                              * Chef: {it.notes}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Kitchen Special Notes */}
                {selectedOrder.notes && (
                  <div className="my-2 p-2 bg-stone-100 border border-stone-800 text-[11px] text-stone-900">
                    <p className="font-black uppercase text-[10px] tracking-wide text-red-700">
                      ⚠ GUEST SPECIAL NOTES:
                    </p>
                    <p className="font-bold mt-0.5">{selectedOrder.notes}</p>
                  </div>
                )}

                {/* KOT Footer */}
                <div className="text-center pt-2 text-[10px] font-bold text-stone-800 border-t-2 border-stone-900">
                  <p>*** SEND HOT & FRESH ***</p>
                  <p className="text-[9px] font-normal text-stone-500 mt-0.5">
                    Ticket generated for Kitchen Display & Prep
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions (Screen only) */}
        <div className="no-print bg-white p-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleCopy}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-semibold shadow-xs transition"
              title="Copy slip text"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Text'}</span>
            </button>
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 text-xs font-semibold transition"
            >
              Close
            </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handlePrint}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#911116] hover:bg-[#7D0E12] text-white text-xs font-bold shadow-md hover:shadow-lg transition active:scale-[0.98]"
            >
              <Printer className="w-4 h-4" />
              <span>
                {mode === 'bill' ? 'Print Bill (Receipt)' : 'Print KOT Slip'}
              </span>
            </button>
          </div>
        </div>

        {/* Print Feedback Notification */}
        {printSuccess && (
          <div className="no-print bg-emerald-600 text-white px-4 py-2 text-xs font-semibold flex items-center justify-between animate-fade-in">
            <span>Thermal print command initiated for {selectedOrder.id}...</span>
            <Check className="w-4 h-4" />
          </div>
        )}
      </div>
    </div>
  );
}
