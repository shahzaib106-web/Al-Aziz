'use client';
import { useState } from 'react';
import {
  Utensils,
  Download,
  ExternalLink,
  Plus,
  Search,
  Filter,
  CheckSquare,
  Grid,
  List,
  Edit2,
  Trash2,
  MoreVertical,
  X,
  Upload,
  Check,
  ShoppingBag,
  Heart,
  ChevronDown,
} from 'lucide-react';
import { MOCK_MENU_ITEMS } from './data';

export default function MenuView() {
  const [activeTab, setActiveTab] = useState('Food Items');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [menuItems, setMenuItems] = useState(MOCK_MENU_ITEMS);
  const [editingItem, setEditingItem] = useState(MOCK_MENU_ITEMS[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { name: 'All Items', count: 56, key: 'All', icon: 'grid' },
    { name: 'Chicken', count: 8, key: 'chicken', img: '/img/chicken-special.jpg' },
    { name: 'Rice', count: 10, key: 'rice', img: '/img/rice.jpg' },
    { name: 'Breads', count: 6, key: 'breads', img: '/img/naan.jpg' },
    { name: 'BBQ & Grill', count: 8, key: 'bbq', img: '/img/kebab.jpg' },
    { name: 'Special Meals', count: 7, key: 'special', img: '/img/spread.jpg' },
    { name: 'Drinks', count: 9, key: 'drinks', img: '/img/mint.jpg' },
    { name: 'Desserts', count: 8, key: 'desserts', img: '/img/kheer.jpg' },
  ];

  const filteredItems = menuItems.filter((item) => {
    if (selectedCategory !== 'All' && item.categoryKey !== selectedCategory) return false;
    if (searchQuery) {
      return (
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return true;
  });

  const toggleAvailability = (id) => {
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, available: !item.available } : item
      )
    );
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
            Menu & Categories
          </h1>
          <p className="text-[13px] text-stone-500">
            Manage your food items, categories, prices, add-ons and availability.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-semibold shadow-xs">
            <Download className="w-3.5 h-3.5 text-stone-500" />
            <span>Import/Export</span>
            <ChevronDown className="w-3 h-3 text-stone-400" />
          </button>
          <a
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-semibold shadow-xs"
          >
            <span>View Customer App</span>
            <ExternalLink className="w-3 h-3 text-stone-400" />
          </a>
          <button
            onClick={() => {
              const newItem = {
                id: `m${Date.now()}`,
                name: 'New Dish',
                category: 'Rice',
                categoryKey: 'rice',
                veg: false,
                desc: 'Description of the new dish',
                price: 500,
                featured: false,
                available: true,
                img: '/img/biryani.jpg',
                addons: 0,
                sizes: 1,
              };
              setMenuItems([newItem, ...menuItems]);
              setEditingItem(newItem);
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#911116] hover:bg-[#7D0E12] text-white text-xs font-semibold shadow-xs transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Item</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-stone-200 text-xs font-semibold text-stone-500">
        {['Food Items', 'Categories', 'Modifiers & Add-ons', 'Sizes & Variants', 'Menu Settings'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 relative transition ${
              activeTab === tab ? 'text-red-700 font-bold' : 'hover:text-stone-800'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 inset-x-0 h-0.5 bg-red-700 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Category Carousel Pills */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`flex items-center gap-2.5 p-2 rounded-xl border text-left shrink-0 transition shadow-xs ${
                isSelected
                  ? 'bg-[#911116] text-white border-[#911116]'
                  : 'bg-white text-stone-800 border-stone-200 hover:border-stone-300'
              }`}
            >
              {cat.icon === 'grid' ? (
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isSelected ? 'bg-white/20' : 'bg-red-50 text-red-700'}`}>
                  <Utensils className="w-4 h-4" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                  <img src={cat.img} alt={cat.name} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="pr-2">
                <p className="text-xs font-bold leading-tight">{cat.name}</p>
                <p className={`text-[10px] leading-tight ${isSelected ? 'text-white/80' : 'text-stone-400'}`}>
                  {cat.count} items
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3 rounded-xl border border-stone-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search menu items (name, description, category)..."
            className="w-full bg-stone-50 border border-stone-200 text-stone-800 placeholder-stone-400 text-xs pl-9 pr-3 py-1.5 rounded-lg focus:outline-none focus:border-red-600"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
          <select className="bg-stone-50 border border-stone-200 text-stone-700 text-xs font-medium py-1.5 px-3 rounded-lg focus:outline-none">
            <option>All Categories</option>
          </select>
          <select className="bg-stone-50 border border-stone-200 text-stone-700 text-xs font-medium py-1.5 px-3 rounded-lg focus:outline-none">
            <option>All Availability</option>
          </select>
          <select className="bg-stone-50 border border-stone-200 text-stone-700 text-xs font-medium py-1.5 px-3 rounded-lg focus:outline-none">
            <option>All Tags</option>
          </select>
          <button className="flex items-center gap-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold py-1.5 px-3 rounded-lg transition">
            <Filter className="w-3 h-3" /> Filter
          </button>
        </div>
      </div>

      {/* Batch Actions & View Switcher */}
      <div className="flex items-center justify-between text-xs text-stone-500">
        <div className="flex items-center gap-2 overflow-x-auto">
          <span className="flex items-center gap-1.5 font-medium text-stone-700">
            <input type="checkbox" className="rounded-sm border-stone-300 text-red-600 focus:ring-0" />
            0 items selected
          </span>
          <button className="px-2 py-1 bg-white border border-stone-200 rounded text-stone-600 hover:bg-stone-50">
            Enable
          </button>
          <button className="px-2 py-1 bg-white border border-stone-200 rounded text-stone-600 hover:bg-stone-50">
            Disable
          </button>
          <button className="px-2 py-1 bg-white border border-stone-200 rounded text-stone-600 hover:bg-stone-50">
            Set Featured
          </button>
          <button className="px-2 py-1 bg-white border border-stone-200 rounded text-stone-600 hover:bg-stone-50 flex items-center gap-1">
            Change Category <ChevronDown className="w-3 h-3" />
          </button>
          <button className="px-2 py-1 bg-white border border-stone-200 rounded text-stone-600 hover:bg-stone-50 flex items-center gap-1">
            More Actions <ChevronDown className="w-3 h-3" />
          </button>
        </div>

        {/* View toggles */}
        <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden bg-white">
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-1 px-3 py-1 text-xs font-semibold ${
              viewMode === 'grid' ? 'bg-[#911116] text-white' : 'text-stone-600 hover:bg-stone-50'
            }`}
          >
            <Grid className="w-3 h-3" /> Grid
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`flex items-center gap-1 px-3 py-1 text-xs font-semibold ${
              viewMode === 'table' ? 'bg-[#911116] text-white' : 'text-stone-600 hover:bg-stone-50'
            }`}
          >
            <List className="w-3 h-3" /> Table
          </button>
        </div>
      </div>

      {/* Main 3-Column Split: Menu Grid (5 cols) + Edit Menu Item (4 cols) + Customer App Preview (3 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Menu Items Grid (5 cols) */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setEditingItem(item)}
              className="bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden flex flex-col justify-between hover:border-red-300 transition cursor-pointer group"
            >
              {/* Image & Badges */}
              <div className="h-36 relative bg-stone-100 overflow-hidden">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  onError={(e) => {
                    e.currentTarget.src = '/img/biryani.jpg';
                  }}
                />
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1">
                  <input
                    type="checkbox"
                    onClick={(e) => e.stopPropagation()}
                    className="rounded-sm border-white/60 bg-black/20 text-red-600 focus:ring-0"
                  />
                  {item.featured && (
                    <span className="bg-amber-400 text-stone-900 font-extrabold text-[10px] px-2 py-0.5 rounded shadow-xs">
                      Featured
                    </span>
                  )}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingItem(item);
                  }}
                  className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-white/90 text-stone-700 flex items-center justify-center hover:bg-white shadow-xs"
                >
                  <MoreVertical className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Card Body */}
              <div className="p-3.5 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
                      {item.name}
                      <Edit2 className="w-3 h-3 text-stone-400 hover:text-stone-700" />
                    </h4>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-stone-400 mt-0.5">
                    <span>{item.category}</span>
                    <span>·</span>
                    <span className={item.veg ? 'text-emerald-600 font-semibold' : 'text-red-600 font-semibold'}>
                      {item.veg ? 'Veg' : 'Non-Veg'}
                    </span>
                  </div>
                  <p className="text-[11.5px] text-stone-500 mt-1.5 line-clamp-2 leading-snug">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-base font-black text-red-700">Rs. {item.price}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-semibold ${item.available ? 'text-emerald-600' : 'text-stone-400'}`}>
                      {item.available ? 'Available' : 'Unavailable'}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleAvailability(item.id);
                      }}
                      className={`w-8 h-4 rounded-full transition-colors relative ${
                        item.available ? 'bg-emerald-500' : 'bg-stone-300'
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 w-3 h-3 rounded-full bg-white transition-transform ${
                          item.available ? 'translate-x-4' : ''
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Add-ons & Sizes metadata */}
                <div className="flex items-center gap-3 mt-2 text-[10px] text-stone-400">
                  <span>Add-ons ({item.addons})</span>
                  <span>Sizes ({item.sizes})</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Edit Menu Item Card / Drawer (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-stone-200 shadow-xs p-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-bold text-stone-900 text-sm">Edit Menu Item</h3>
              <button className="text-stone-400 hover:text-stone-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Sub-tabs */}
            <div className="flex items-center gap-4 text-xs font-semibold text-stone-500 border-b border-stone-100 pb-2">
              <span className="text-red-700 border-b-2 border-red-700 pb-2 -mb-2">Basic Info</span>
              <span>Pricing</span>
              <span>Add-ons</span>
              <span>Inventory</span>
              <span>Gallery</span>
            </div>

            {/* Item Name */}
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                Item Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={editingItem?.name || ''}
                onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                className="w-full text-xs p-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-red-600"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                Category <span className="text-red-600">*</span>
              </label>
              <select
                value={editingItem?.category || 'Rice'}
                onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                className="w-full text-xs p-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none"
              >
                <option value="Rice">Rice</option>
                <option value="Chicken">Chicken</option>
                <option value="Breads">Breads</option>
                <option value="BBQ & Grill">BBQ & Grill</option>
                <option value="Drinks">Drinks</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                Description <span className="text-red-600">*</span>
              </label>
              <textarea
                rows={3}
                value={editingItem?.desc || ''}
                onChange={(e) => setEditingItem({ ...editingItem, desc: e.target.value })}
                className="w-full text-xs p-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-red-600 resize-none"
              />
              <span className="text-[10px] text-stone-400 block text-right">68/200</span>
            </div>

            {/* Item Images (3/5) */}
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1.5">
                Item Images (3/5)
              </label>
              <div className="grid grid-cols-4 gap-2">
                <div className="h-16 rounded-lg border-2 border-dashed border-stone-200 flex flex-col items-center justify-center text-stone-400 hover:border-red-400 cursor-pointer">
                  <Upload className="w-4 h-4 mb-0.5" />
                  <span className="text-[9px] font-semibold">Add Image</span>
                </div>
                <div className="h-16 rounded-lg overflow-hidden relative border border-stone-200">
                  <img src={editingItem?.img || '/img/biryani.jpg'} alt="" className="w-full h-full object-cover" />
                  <button className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-red-600 text-white rounded-full flex items-center justify-center text-[8px]">
                    ✕
                  </button>
                </div>
                <div className="h-16 rounded-lg overflow-hidden relative border border-stone-200">
                  <img src="/img/karahi.jpg" alt="" className="w-full h-full object-cover" />
                  <button className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-red-600 text-white rounded-full flex items-center justify-center text-[8px]">
                    ✕
                  </button>
                </div>
                <div className="h-16 rounded-lg overflow-hidden relative border border-stone-200">
                  <img src="/img/naan.jpg" alt="" className="w-full h-full object-cover" />
                  <button className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-red-600 text-white rounded-full flex items-center justify-center text-[8px]">
                    ✕
                  </button>
                </div>
              </div>
            </div>

            {/* Toggles */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-stone-800">Availability</p>
                  <p className="text-[10px] text-stone-400">Shown in customer app</p>
                </div>
                <button
                  onClick={() => setEditingItem({ ...editingItem, available: !editingItem?.available })}
                  className={`w-9 h-5 rounded-full relative transition-colors ${
                    editingItem?.available ? 'bg-emerald-500' : 'bg-stone-300'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                      editingItem?.available ? 'translate-x-4' : ''
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-stone-800">Featured Item</p>
                  <p className="text-[10px] text-stone-400">Shows a badge on website & app</p>
                </div>
                <button
                  onClick={() => setEditingItem({ ...editingItem, featured: !editingItem?.featured })}
                  className={`w-9 h-5 rounded-full relative transition-colors ${
                    editingItem?.featured ? 'bg-emerald-500' : 'bg-stone-300'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                      editingItem?.featured ? 'translate-x-4' : ''
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Sort Order */}
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">Sort Order</label>
              <input
                type="number"
                defaultValue={1}
                className="w-20 text-xs p-1.5 bg-stone-50 border border-stone-200 rounded-lg text-center font-bold"
              />
              <span className="text-[10px] text-stone-400 ml-2">Lower numbers appear first</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-4 border-t border-stone-100">
            <button className="flex-1 py-2 text-xs font-semibold text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-lg transition">
              Cancel
            </button>
            <button
              onClick={() => {
                setMenuItems((prev) =>
                  prev.map((i) => (i.id === editingItem.id ? editingItem : i))
                );
              }}
              className="flex-1 py-2 text-xs font-bold text-white bg-[#911116] hover:bg-[#7D0E12] rounded-lg shadow-xs transition"
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* Customer App Live Preview (3 cols) */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-stone-200 shadow-xs p-4 flex flex-col items-center">
          <div className="flex items-center justify-between w-full mb-3 text-xs">
            <span className="font-bold text-stone-900">Customer App Preview</span>
            <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
          </div>

          {/* Smartphone Frame */}
          <div className="w-full max-w-[260px] bg-stone-900 rounded-[32px] p-2.5 shadow-2xl border-4 border-stone-800">
            {/* Camera notch */}
            <div className="w-16 h-3 bg-stone-800 rounded-full mx-auto mb-2" />

            <div className="bg-stone-50 rounded-[22px] overflow-hidden text-stone-900 text-xs shadow-inner">
              {/* App Header */}
              <div className="bg-[#911116] text-white p-3 flex items-center justify-between">
                <span className="font-bold text-xs tracking-tight">Al Arab Restaurant</span>
                <div className="relative">
                  <ShoppingBag className="w-4 h-4 text-white" />
                  <span className="absolute -top-1 -right-1 bg-amber-400 text-stone-900 text-[8px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
                    2
                  </span>
                </div>
              </div>

              {/* App Search */}
              <div className="p-2.5 bg-stone-100 border-b border-stone-200">
                <div className="relative">
                  <Search className="w-3 h-3 text-stone-400 absolute left-2 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search for dishes..."
                    readOnly
                    className="w-full bg-white text-[10px] pl-6 pr-2 py-1 rounded-md border border-stone-200"
                  />
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 p-2 overflow-x-auto text-[9px] font-bold">
                <span className="px-2 py-0.5 rounded-full bg-stone-200 text-stone-700">All</span>
                <span className="px-2 py-0.5 rounded-full bg-stone-200 text-stone-700">Chicken</span>
                <span className="px-2 py-0.5 rounded-full bg-[#911116] text-white">Rice</span>
                <span className="px-2 py-0.5 rounded-full bg-stone-200 text-stone-700">Breads</span>
              </div>

              {/* Featured Card */}
              <div className="p-2 space-y-2">
                <div className="bg-white rounded-lg border border-stone-200 overflow-hidden shadow-xs">
                  <div className="h-20 relative">
                    <img src="/img/biryani.jpg" alt="" className="w-full h-full object-cover" />
                    <span className="absolute top-1 left-1 bg-amber-400 text-stone-900 font-bold text-[8px] px-1 rounded">
                      Featured
                    </span>
                    <Heart className="w-3 h-3 text-white absolute top-1 right-1" />
                  </div>
                  <div className="p-2">
                    <p className="font-bold text-[11px] leading-tight">Chicken Biryani</p>
                    <p className="text-[9px] text-stone-400 line-clamp-1">Aromatic basmati rice cooked with chicken.</p>
                    <div className="flex items-center justify-between mt-1.5">
                      <span className="font-black text-red-700 text-xs">Rs. 600</span>
                      <button className="px-2 py-0.5 bg-red-700 text-white rounded font-bold text-[9px]">
                        + Add
                      </button>
                    </div>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white rounded-lg border border-stone-200 overflow-hidden shadow-xs">
                  <div className="h-20 relative">
                    <img src="/img/naan.jpg" alt="" className="w-full h-full object-cover" />
                    <Heart className="w-3 h-3 text-white absolute top-1 right-1" />
                  </div>
                  <div className="p-2">
                    <p className="font-bold text-[11px] leading-tight">Special Naan</p>
                    <p className="text-[9px] text-stone-400 line-clamp-1">Freshly baked naan with butter.</p>
                    <div className="flex items-center justify-between mt-1.5">
                      <span className="font-black text-red-700 text-xs">Rs. 70</span>
                      <button className="px-2 py-0.5 bg-red-700 text-white rounded font-bold text-[9px]">
                        + Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
