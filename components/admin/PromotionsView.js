'use client';
import { useState } from 'react';
import {
  Tag,
  Plus,
  Percent,
  Copy,
  Check,
  Calendar,
  DollarSign,
  TrendingUp,
  X,
  Trash2,
  Edit2,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';

const INITIAL_PROMOTIONS = [
  {
    id: 'promo-1',
    code: 'AZIZ10',
    title: '10% Welcome Discount',
    desc: 'Get 10% off on all dine-in and delivery orders above Rs. 2,000.',
    type: 'percentage',
    value: 10,
    minOrder: 2000,
    maxDiscount: 500,
    usageCount: 284,
    usageLimit: 1000,
    active: true,
    startDate: '2026-09-01',
    endDate: '2026-10-31',
    applicableTo: 'All Items',
  },
  {
    id: 'promo-2',
    code: 'BIRYANI200',
    title: 'Biryani Special Rs. 200 Off',
    desc: 'Flat Rs. 200 discount when ordering 2 or more Full Biryani portions.',
    type: 'flat',
    value: 200,
    minOrder: 1500,
    maxDiscount: 200,
    usageCount: 168,
    usageLimit: 500,
    active: true,
    startDate: '2026-09-10',
    endDate: '2026-10-15',
    applicableTo: 'Biryani & Pulao',
  },
  {
    id: 'promo-3',
    code: 'FREEDELIVERY',
    title: 'Free Express Delivery',
    desc: 'Zero delivery charges for residents of Islamabad & Rawalpindi on orders above Rs. 1,500.',
    type: 'free_delivery',
    value: 150,
    minOrder: 1500,
    maxDiscount: 150,
    usageCount: 512,
    usageLimit: 2000,
    active: true,
    startDate: '2026-08-01',
    endDate: '2026-12-31',
    applicableTo: 'Delivery Orders',
  },
  {
    id: 'promo-4',
    code: 'FAMILYFEAST',
    title: 'Family Feast Combo 15%',
    desc: '15% discount on combination of 1 Karahi Full + 1 Biryani Full + 6 Roghni Naans.',
    type: 'percentage',
    value: 15,
    minOrder: 3500,
    maxDiscount: 1000,
    usageCount: 94,
    usageLimit: 300,
    active: true,
    startDate: '2026-09-15',
    endDate: '2026-10-30',
    applicableTo: 'Combo Platters',
  },
];

export default function PromotionsView() {
  const [promotions, setPromotions] = useState(INITIAL_PROMOTIONS);
  const [copiedCode, setCopiedCode] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filterActive, setFilterActive] = useState('all');

  const [formData, setFormData] = useState({
    code: '',
    title: '',
    desc: '',
    type: 'percentage',
    value: 10,
    minOrder: 1500,
    maxDiscount: 500,
    usageLimit: 500,
    startDate: '2026-09-24',
    endDate: '2026-11-30',
    applicableTo: 'All Items',
    active: true,
  });

  const handleCopy = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleToggle = (id) => {
    setPromotions((prev) =>
      prev.map((p) => (p.id === id ? { ...p, active: !p.active } : p))
    );
  };

  const handleDelete = (id) => {
    setPromotions((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.code.trim()) return;

    const newPromo = {
      id: `promo-${Date.now()}`,
      code: formData.code.toUpperCase().replace(/\s+/g, ''),
      title: formData.title,
      desc: formData.desc,
      type: formData.type,
      value: Number(formData.value) || 0,
      minOrder: Number(formData.minOrder) || 0,
      maxDiscount: Number(formData.maxDiscount) || 0,
      usageCount: 0,
      usageLimit: Number(formData.usageLimit) || 500,
      active: formData.active,
      startDate: formData.startDate,
      endDate: formData.endDate,
      applicableTo: formData.applicableTo,
    };

    setPromotions((prev) => [newPromo, ...prev]);
    setIsAddModalOpen(false);
  };

  const filteredPromos = promotions.filter((p) => {
    if (filterActive === 'active') return p.active;
    if (filterActive === 'inactive') return !p.active;
    return true;
  });

  const totalRedeemed = promotions.reduce((acc, p) => acc + p.usageCount, 0);
  const totalDiscountGiven = promotions.reduce((acc, p) => {
    const avg = p.type === 'percentage' ? (p.minOrder * p.value) / 100 : p.value;
    return acc + avg * p.usageCount;
  }, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-[#911116]">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900">
                Promotions & Discount Deals
              </h1>
              <p className="text-xs sm:text-sm text-stone-500">
                Create voucher codes, percentage discounts, and free delivery offers for Al Aziz Restaurant.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            setFormData({
              code: `AZIZ${Math.floor(10 + Math.random() * 90)}`,
              title: '',
              desc: '',
              type: 'percentage',
              value: 15,
              minOrder: 2000,
              maxDiscount: 500,
              usageLimit: 500,
              startDate: '2026-09-24',
              endDate: '2026-11-30',
              applicableTo: 'All Items',
              active: true,
            });
            setIsAddModalOpen(true);
          }}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#911116] hover:bg-[#7B0D12] text-white text-xs sm:text-sm font-semibold shadow-xs transition active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Create Voucher</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-xs">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">Active Deals</p>
          <p className="text-2xl font-bold text-emerald-700 mt-1 font-mono tabular-nums">
            {promotions.filter((p) => p.active).length}
          </p>
          <p className="text-[11px] text-stone-400 mt-0.5">Live on website & app</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-xs">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">Total Redeemed</p>
          <p className="text-2xl font-bold text-stone-900 mt-1 font-mono tabular-nums">{totalRedeemed}</p>
          <p className="text-[11px] text-stone-400 mt-0.5">Orders using promo codes</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-xs">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">Total Discounts Given</p>
          <p className="text-xl font-bold text-amber-800 mt-1 font-mono tabular-nums">
            Rs. {Math.round(totalDiscountGiven).toLocaleString()}
          </p>
          <p className="text-[11px] text-stone-400 mt-0.5">Customer savings created</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-xs">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">Top Promo Code</p>
          <p className="text-lg font-bold text-[#911116] mt-1 font-mono">FREEDELIVERY</p>
          <p className="text-[11px] text-stone-400 mt-0.5">512 orders redeemed</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => setFilterActive('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
            filterActive === 'all' ? 'bg-[#911116] text-white' : 'bg-white border border-stone-200 text-stone-600'
          }`}
        >
          All Deals ({promotions.length})
        </button>
        <button
          onClick={() => setFilterActive('active')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
            filterActive === 'active' ? 'bg-[#911116] text-white' : 'bg-white border border-stone-200 text-stone-600'
          }`}
        >
          Active ({promotions.filter((p) => p.active).length})
        </button>
        <button
          onClick={() => setFilterActive('inactive')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
            filterActive === 'inactive' ? 'bg-[#911116] text-white' : 'bg-white border border-stone-200 text-stone-600'
          }`}
        >
          Disabled ({promotions.filter((p) => !p.active).length})
        </button>
      </div>

      {/* Promotions Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPromos.map((promo) => (
          <div
            key={promo.id}
            className={`bg-white rounded-xl border p-4 sm:p-5 shadow-xs transition space-y-4 flex flex-col justify-between ${
              promo.active ? 'border-stone-200 hover:border-amber-300' : 'border-stone-200 opacity-70 bg-stone-50/50'
            }`}
          >
            <div>
              {/* Top Banner */}
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-900 text-base">{promo.title}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        promo.active
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : 'bg-stone-200 text-stone-600 border-stone-300'
                      }`}
                    >
                      {promo.active ? '● Active' : '○ Paused'}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 leading-relaxed">{promo.desc}</p>
                </div>

                <div className="shrink-0 text-right">
                  <span className="text-lg font-bold text-[#911116] font-mono">
                    {promo.type === 'percentage' && `${promo.value}% OFF`}
                    {promo.type === 'flat' && `Rs. ${promo.value} OFF`}
                    {promo.type === 'free_delivery' && 'FREE DEL'}
                  </span>
                </div>
              </div>

              {/* Code Box with Copy */}
              <div className="mt-3 p-2.5 bg-stone-50 rounded-lg border border-dashed border-stone-300 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-amber-600" />
                  <span className="font-mono font-bold text-stone-900 text-sm tracking-wider">{promo.code}</span>
                </div>

                <button
                  onClick={() => handleCopy(promo.code)}
                  className="px-2.5 py-1 rounded bg-white border border-stone-200 text-stone-700 hover:bg-stone-100 text-xs font-semibold flex items-center gap-1 transition shadow-xs"
                >
                  {copiedCode === promo.code ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>

              {/* Terms & Stats */}
              <div className="grid grid-cols-3 gap-2 mt-3 text-center text-xs">
                <div className="p-2 bg-stone-50 rounded-lg">
                  <span className="text-[10px] text-stone-400 font-semibold uppercase block">Min Order</span>
                  <span className="font-bold text-stone-800 font-mono">Rs. {promo.minOrder}</span>
                </div>
                <div className="p-2 bg-stone-50 rounded-lg">
                  <span className="text-[10px] text-stone-400 font-semibold uppercase block">Redeemed</span>
                  <span className="font-bold text-stone-800 font-mono">
                    {promo.usageCount} / {promo.usageLimit}
                  </span>
                </div>
                <div className="p-2 bg-stone-50 rounded-lg">
                  <span className="text-[10px] text-stone-400 font-semibold uppercase block">Applies To</span>
                  <span className="font-bold text-stone-800 truncate block text-[11px]">{promo.applicableTo}</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-stone-400 text-[11px] flex items-center gap-1">
                <Calendar className="w-3 h-3" /> Valid till {promo.endDate}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggle(promo.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                    promo.active ? 'text-amber-800 bg-amber-50 hover:bg-amber-100' : 'text-emerald-800 bg-emerald-50 hover:bg-emerald-100'
                  }`}
                >
                  {promo.active ? 'Pause' : 'Activate'}
                </button>
                <button
                  onClick={() => handleDelete(promo.id)}
                  className="p-1 rounded text-stone-400 hover:text-red-600 transition"
                  title="Delete Voucher"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Voucher Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 border border-stone-200 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-bold text-stone-900 text-base">Create Discount Voucher</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-stone-700 block mb-1">Coupon Code *</label>
                <input
                  type="text"
                  required
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  placeholder="e.g. AZIZ20"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 font-mono font-bold tracking-wider"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Promo Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Weekend Biryani Feast 20% Off"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Discount Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 font-medium"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="flat">Flat PKR Amount</option>
                    <option value="free_delivery">Free Delivery</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Discount Value</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg font-mono text-stone-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Min Order (PKR)</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.minOrder}
                    onChange={(e) => setFormData({ ...formData, minOrder: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg font-mono text-stone-800"
                  />
                </div>
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Max Cap (PKR)</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.maxDiscount}
                    onChange={(e) => setFormData({ ...formData, maxDiscount: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg font-mono text-stone-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Expiry Date</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg font-mono text-stone-800"
                  />
                </div>
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Usage Limit</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.usageLimit}
                    onChange={(e) => setFormData({ ...formData, usageLimit: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg font-mono text-stone-800"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-lg text-stone-600 hover:bg-stone-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-[#911116] hover:bg-[#7B0D12] text-white font-semibold shadow-xs"
                >
                  Publish Voucher
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
