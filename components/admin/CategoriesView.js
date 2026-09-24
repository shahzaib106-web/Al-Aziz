'use client';
import { useState } from 'react';
import {
  LayoutGrid,
  Plus,
  Search,
  Edit2,
  Trash2,
  Check,
  X,
  Eye,
  EyeOff,
  MoveUp,
  MoveDown,
  UtensilsCrossed,
  Layers,
  ArrowUpDown,
  Sparkles,
} from 'lucide-react';

const INITIAL_CATEGORIES = [
  {
    id: 'cat-1',
    name: 'Biryani & Pulao',
    nameUr: 'بریانی اور پلاؤ',
    slug: 'biryani-pulao',
    itemCount: 8,
    active: true,
    sortOrder: 1,
    desc: 'Traditional Dum Biryani and fragrant saffron basmati rice dishes cooked with prime meats.',
    popularDish: 'Special Chicken Biryani (Half / Full)',
    dailyOrders: 142,
    revenueShare: '38%',
    icon: '🍚',
    img: '/img/biryani.jpg',
  },
  {
    id: 'cat-2',
    name: 'Karahi & Handi',
    nameUr: 'کڑاہی اور ہانڈی',
    slug: 'karahi-handi',
    itemCount: 10,
    active: true,
    sortOrder: 2,
    desc: 'Wok-cooked fresh chicken, mutton & desi murgh in rich tomatoes, ginger, and green chilies.',
    popularDish: 'Desi Murgh Karahi (Desi Ghee)',
    dailyOrders: 86,
    revenueShare: '29%',
    icon: '🥘',
    img: '/img/karahi.jpg',
  },
  {
    id: 'cat-3',
    name: 'BBQ & Charcoal Grills',
    nameUr: 'باربی کیو اور تکہ',
    slug: 'bbq-grills',
    itemCount: 12,
    active: true,
    sortOrder: 3,
    desc: 'Charcoal-grilled skewers marinated with stone-ground spices and fresh herbs.',
    popularDish: 'Beef Seekh Kebab & Malai Boti',
    dailyOrders: 64,
    revenueShare: '18%',
    icon: '🍢',
    img: '/img/kebab.jpg',
  },
  {
    id: 'cat-4',
    name: 'Tandoor & Breads',
    nameUr: 'تندور اور نان',
    slug: 'tandoor-breads',
    itemCount: 6,
    active: true,
    sortOrder: 4,
    desc: 'Freshly baked tandoori breads, crispy roghni naan, garlic naan, and parathas.',
    popularDish: 'Special Roghni Butter Naan',
    dailyOrders: 195,
    revenueShare: '7%',
    icon: '🫓',
    img: '/img/naan.jpg',
  },
  {
    id: 'cat-5',
    name: 'Vegetarian & Dal',
    nameUr: 'سبزی اور دال',
    slug: 'veg-dal',
    itemCount: 5,
    active: true,
    sortOrder: 5,
    desc: 'Slow-cooked lentils, creamy Dal Makhani, Palak Paneer, and seasonal fresh vegetable curries.',
    popularDish: 'Makhani Dal Tadka',
    dailyOrders: 28,
    revenueShare: '4%',
    icon: '🥗',
    img: '/img/desi.jpg',
  },
  {
    id: 'cat-6',
    name: 'Desserts & Beverages',
    nameUr: 'میٹھے اور مشروبات',
    slug: 'desserts-beverages',
    itemCount: 7,
    active: true,
    sortOrder: 6,
    desc: 'Traditional Matka Kheer, hot Gulab Jamun, Fresh Mint Lemonade, and Pakola.',
    popularDish: 'Al Aziz Shahi Kheer & Mint Margarita',
    dailyOrders: 52,
    revenueShare: '4%',
    icon: '🍧',
    img: '/img/spread.jpg',
  },
];

export default function CategoriesView() {
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterActive, setFilterActive] = useState('all'); // all, active, inactive
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    nameUr: '',
    slug: '',
    desc: '',
    sortOrder: 1,
    active: true,
    icon: '🍽️',
  });

  const filteredCategories = categories.filter((cat) => {
    const matchesSearch =
      cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.nameUr.includes(searchQuery) ||
      cat.desc.toLowerCase().includes(searchQuery.toLowerCase());

    if (filterActive === 'active') return matchesSearch && cat.active;
    if (filterActive === 'inactive') return matchesSearch && !cat.active;
    return matchesSearch;
  });

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      nameUr: '',
      slug: '',
      desc: '',
      sortOrder: categories.length + 1,
      active: true,
      icon: '🍽️',
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (cat) => {
    setEditingCategory(cat);
    setFormData({
      name: cat.name,
      nameUr: cat.nameUr,
      slug: cat.slug,
      desc: cat.desc,
      sortOrder: cat.sortOrder,
      active: cat.active,
      icon: cat.icon || '🍽️',
    });
    setIsAddModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingCategory) {
      setCategories((prev) =>
        prev.map((c) =>
          c.id === editingCategory.id
            ? {
                ...c,
                ...formData,
                sortOrder: Number(formData.sortOrder) || c.sortOrder,
              }
            : c
        )
      );
    } else {
      const newCat = {
        id: `cat-${Date.now()}`,
        name: formData.name,
        nameUr: formData.nameUr || formData.name,
        slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-'),
        desc: formData.desc,
        sortOrder: Number(formData.sortOrder) || categories.length + 1,
        active: formData.active,
        icon: formData.icon,
        itemCount: 0,
        popularDish: 'None yet',
        dailyOrders: 0,
        revenueShare: '0%',
        img: '/img/biryani.jpg',
      };
      setCategories((prev) => [...prev, newCat]);
    }

    setIsAddModalOpen(false);
  };

  const handleToggleActive = (id) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, active: !c.active } : c))
    );
  };

  const handleDelete = (id) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    setDeleteConfirmId(null);
  };

  const handleMove = (id, direction) => {
    const currentIndex = categories.findIndex((c) => c.id === id);
    if (currentIndex < 0) return;

    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= categories.length) return;

    const updated = [...categories];
    const temp = updated[currentIndex];
    updated[currentIndex] = updated[targetIndex];
    updated[targetIndex] = temp;

    // re-assign sortOrder
    const reordered = updated.map((item, idx) => ({ ...item, sortOrder: idx + 1 }));
    setCategories(reordered);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-red-700">
              <LayoutGrid className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900">
                Menu Categories
              </h1>
              <p className="text-xs sm:text-sm text-stone-500">
                Organize dishes, set display hierarchy, and control live online catalog visibility.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#911116] hover:bg-[#7B0D12] text-white text-xs sm:text-sm font-semibold shadow-xs transition active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-xs">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">Total Categories</p>
          <p className="text-2xl font-bold text-stone-900 mt-1 font-mono tabular-nums">{categories.length}</p>
          <p className="text-[11px] text-stone-400 mt-0.5">All active menu groups</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-xs">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">Active Live</p>
          <p className="text-2xl font-bold text-emerald-700 mt-1 font-mono tabular-nums">
            {categories.filter((c) => c.active).length}
          </p>
          <p className="text-[11px] text-stone-400 mt-0.5">Visible to customers</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-xs">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">Total Menu Items</p>
          <p className="text-2xl font-bold text-stone-900 mt-1 font-mono tabular-nums">
            {categories.reduce((acc, c) => acc + c.itemCount, 0)}
          </p>
          <p className="text-[11px] text-stone-400 mt-0.5">Across all sections</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-xs">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">Top Revenue Section</p>
          <p className="text-lg font-bold text-[#911116] mt-1 truncate">Biryani & Pulao</p>
          <p className="text-[11px] text-stone-400 mt-0.5">38% of total daily sales</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search categories (e.g. Biryani, کڑاہی)..."
            className="w-full pl-9 pr-3 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-amber-400 focus:bg-white"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
          <button
            onClick={() => setFilterActive('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
              filterActive === 'all'
                ? 'bg-[#911116] text-white shadow-xs'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            All Categories ({categories.length})
          </button>
          <button
            onClick={() => setFilterActive('active')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
              filterActive === 'active'
                ? 'bg-[#911116] text-white shadow-xs'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            Active ({categories.filter((c) => c.active).length})
          </button>
          <button
            onClick={() => setFilterActive('inactive')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
              filterActive === 'inactive'
                ? 'bg-[#911116] text-white shadow-xs'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            Inactive ({categories.filter((c) => !c.active).length})
          </button>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredCategories.map((cat, index) => (
          <div
            key={cat.id}
            className={`bg-white rounded-xl border transition-all shadow-xs flex flex-col justify-between overflow-hidden ${
              cat.active ? 'border-stone-200 hover:border-amber-300' : 'border-dashed border-stone-300 opacity-75'
            }`}
          >
            <div className="p-4 sm:p-5">
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-xl shrink-0 shadow-xs">
                    {cat.icon || '🍽️'}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-stone-900 text-sm sm:text-base leading-tight truncate">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-amber-900/80 font-medium font-urdu mt-0.5">
                      {cat.nameUr}
                    </p>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 border ${
                    cat.active
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-stone-100 text-stone-500 border-stone-200'
                  }`}
                >
                  {cat.active ? '● Live' : '○ Hidden'}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-stone-500 mt-3 line-clamp-2 leading-relaxed">
                {cat.desc}
              </p>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-stone-100 text-center">
                <div className="bg-stone-50 p-2 rounded-lg">
                  <span className="text-[10px] uppercase font-semibold text-stone-400 block">Dishes</span>
                  <span className="font-bold text-xs text-stone-800 font-mono tabular-nums">{cat.itemCount}</span>
                </div>
                <div className="bg-stone-50 p-2 rounded-lg">
                  <span className="text-[10px] uppercase font-semibold text-stone-400 block">Orders/Day</span>
                  <span className="font-bold text-xs text-stone-800 font-mono tabular-nums">{cat.dailyOrders}</span>
                </div>
                <div className="bg-stone-50 p-2 rounded-lg">
                  <span className="text-[10px] uppercase font-semibold text-stone-400 block">Rev Share</span>
                  <span className="font-bold text-xs text-[#911116] font-mono tabular-nums">{cat.revenueShare}</span>
                </div>
              </div>

              {/* Best Seller Highlight */}
              <div className="mt-3 text-[11px] text-stone-500 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
                <span className="truncate">Top: <strong className="text-stone-800">{cat.popularDish}</strong></span>
              </div>
            </div>

            {/* Card Actions Footer */}
            <div className="bg-stone-50/80 px-4 py-2.5 border-t border-stone-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1">
                {(() => {
                  const globalIdx = categories.findIndex((c) => c.id === cat.id);
                  return (
                    <>
                      <button
                        onClick={() => handleMove(cat.id, 'up')}
                        disabled={globalIdx <= 0}
                        className="p-1 rounded text-stone-400 hover:text-stone-700 hover:bg-stone-200/70 disabled:opacity-30 disabled:pointer-events-none transition"
                        title="Move Up"
                      >
                        <MoveUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleMove(cat.id, 'down')}
                        disabled={globalIdx >= categories.length - 1 || globalIdx === -1}
                        className="p-1 rounded text-stone-400 hover:text-stone-700 hover:bg-stone-200/70 disabled:opacity-30 disabled:pointer-events-none transition"
                        title="Move Down"
                      >
                        <MoveDown className="w-3.5 h-3.5" />
                      </button>
                    </>
                  );
                })()}
                <span className="text-[10px] text-stone-400 font-mono ml-1">#{cat.sortOrder}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleActive(cat.id)}
                  className={`px-2 py-1 rounded text-[11px] font-semibold transition flex items-center gap-1 ${
                    cat.active
                      ? 'text-stone-600 hover:text-amber-700 hover:bg-amber-50'
                      : 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100'
                  }`}
                >
                  {cat.active ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  <span>{cat.active ? 'Hide' : 'Publish'}</span>
                </button>

                <button
                  onClick={() => handleOpenEdit(cat)}
                  className="p-1.5 rounded text-stone-500 hover:text-[#911116] hover:bg-red-50 transition"
                  title="Edit Category"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setDeleteConfirmId(cat.id)}
                  className="p-1.5 rounded text-stone-400 hover:text-red-600 hover:bg-red-50 transition"
                  title="Delete Category"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 border border-stone-200 shadow-xl space-y-4">
            <h3 className="font-bold text-stone-900 text-base">Delete Category?</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Are you sure you want to delete this category? Associated menu dishes will be moved to uncategorized.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-stone-600 hover:bg-stone-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-red-600 hover:bg-red-700 text-white transition shadow-xs"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Category Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-6 border border-stone-200 shadow-xl space-y-4 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-bold text-stone-900 text-base">
                {editingCategory ? 'Edit Menu Category' : 'Add New Category'}
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Category Name (English) *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Special Karahi"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 focus:outline-none focus:border-amber-400 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Category Name (Urdu)</label>
                  <input
                    type="text"
                    value={formData.nameUr}
                    onChange={(e) => setFormData({ ...formData, nameUr: e.target.value })}
                    placeholder="e.g. کڑاہی اور ہانڈی"
                    dir="rtl"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 focus:outline-none focus:border-amber-400 focus:bg-white font-urdu"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Emoji Icon</label>
                  <input
                    type="text"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    placeholder="🥘"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 focus:outline-none focus:border-amber-400 text-center text-lg"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Display Priority</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.sortOrder}
                    onChange={(e) => setFormData({ ...formData, sortOrder: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Status</label>
                  <select
                    value={formData.active ? 'active' : 'inactive'}
                    onChange={(e) => setFormData({ ...formData, active: e.target.value === 'active' })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 focus:outline-none focus:border-amber-400 font-semibold"
                  >
                    <option value="active">Live Active</option>
                    <option value="inactive">Hidden</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Description</label>
                <textarea
                  rows="3"
                  value={formData.desc}
                  onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                  placeholder="Describe dishes in this category..."
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 focus:outline-none focus:border-amber-400 focus:bg-white resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100 font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#911116] hover:bg-[#7B0D12] text-white font-semibold shadow-xs transition active:scale-95"
                >
                  {editingCategory ? 'Update Category' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
