'use client';
import { useState } from 'react';
import {
  Monitor,
  ExternalLink,
  Save,
  Eye,
  Download,
  MousePointer,
  ShoppingBag,
  Plus,
  Edit2,
  Trash2,
  Bell,
  Palette,
  Check,
  Smartphone,
  Globe,
  Settings,
  Tag,
  ArrowRight,
} from 'lucide-react';

export default function CmsWebsiteView() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [previewMode, setPreviewMode] = useState('mobile');

  const [banners, setBanners] = useState([
    {
      id: 1,
      title: '10% OFF on all orders',
      sub: 'Valid for all online orders this week',
      img: '/img/biryani.jpg',
      active: true,
    },
    {
      id: 2,
      title: 'Special Biryani Combo',
      sub: 'Free delivery on orders above Rs. 1,500',
      img: '/img/spread.jpg',
      active: true,
    },
    {
      id: 3,
      title: 'Authentic Desi Karahi & BBQ',
      sub: 'Try our famous Special Chicken & Desi Murgh Karahi',
      img: '/img/karahi.jpg',
      active: false,
    },
  ]);

  const [pwaBanner, setPwaBanner] = useState(true);
  const [orderNotifs, setOrderNotifs] = useState(true);
  const [menuSync, setMenuSync] = useState(true);

  return (
    <div className="space-y-5">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Monitor className="w-5 h-5 text-red-700" />
            <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
              CMS & Website / PWA Management
            </h1>
          </div>
          <p className="text-[13px] text-stone-500">
            Manage your restaurant's website, PWA app, content, design and growth tools.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-semibold shadow-xs"
          >
            <span>View Website</span>
            <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
          </a>
          <a
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-semibold shadow-xs"
          >
            <span>View PWA</span>
            <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
          </a>
          <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#911116] hover:bg-[#7D0E12] text-white text-xs font-bold shadow-xs transition">
            <Save className="w-3.5 h-3.5" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-stone-200 text-xs font-semibold text-stone-500 overflow-x-auto pb-1">
        {['Overview', 'Banners & Offers', 'Menu & Categories', 'Content', 'App & PWA', 'Promotions', 'SEO', 'Settings'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 relative transition whitespace-nowrap ${
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

      {/* 4 KPI Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="bg-white rounded-xl p-3.5 border border-stone-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11.5px] font-medium text-stone-500">Website Visitors</span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Eye className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-xl font-bold text-stone-900">4,820</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">
              ▲ +18% vs last week
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-stone-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11.5px] font-medium text-stone-500">PWA Installs</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Download className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-xl font-bold text-stone-900">892</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">
              ▲ +32% vs last week
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-stone-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11.5px] font-medium text-stone-500">Offer Clicks</span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <MousePointer className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-xl font-bold text-stone-900">1,246</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">
              ▲ +26% vs last week
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-stone-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11.5px] font-medium text-stone-500">Online Orders</span>
            <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <ShoppingBag className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-xl font-bold text-stone-900">379</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">
              ▲ +28% vs last week
            </div>
          </div>
        </div>
      </div>

      {/* Main Split (8 cols Left Content + 4 cols Live Preview) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          {/* Homepage Banners */}
          <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-bold text-stone-900 text-sm">Homepage Banners</h3>
                <p className="text-[11px] text-stone-400">Promotions displayed on the main carousel</p>
              </div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg text-xs font-semibold transition">
                <Plus className="w-3.5 h-3.5" /> Add Banner
              </button>
            </div>

            <div className="space-y-3">
              {banners.map((b) => (
                <div key={b.id} className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-16 h-12 rounded-lg overflow-hidden bg-stone-200 shrink-0 border border-stone-200">
                      <img src={b.img} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-stone-900 text-xs truncate">{b.title}</h4>
                      <p className="text-[11px] text-stone-400 truncate">{b.sub}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => setBanners(banners.map(item => item.id === b.id ? { ...item, active: !item.active } : item))}
                      className={`w-9 h-5 rounded-full relative transition-colors ${
                        b.active ? 'bg-emerald-500' : 'bg-stone-300'
                      }`}
                    >
                      <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                        b.active ? 'translate-x-4' : ''
                      }`} />
                    </button>
                    <button className="p-1 text-stone-400 hover:text-stone-700"><Edit2 className="w-3.5 h-3.5" /></button>
                    <button className="p-1 text-stone-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Products */}
          <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-stone-900 text-sm">Featured Dishes</h3>
              <button className="text-xs font-semibold text-red-700 hover:underline">Manage &gt;</button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { name: 'Chicken Biryani', price: 'Rs. 600', img: '/img/biryani.jpg' },
                { name: 'Special Naan', price: 'Rs. 70', img: '/img/naan.jpg' },
                { name: 'Chicken Karahi', price: 'Rs. 1,200', img: '/img/karahi.jpg' },
              ].map((p, idx) => (
                <div key={idx} className="p-2.5 rounded-lg border border-stone-200 bg-stone-50 flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-md overflow-hidden bg-stone-200 shrink-0">
                    <img src={p.img} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-stone-900 text-xs truncate">{p.name}</p>
                    <p className="text-[11px] font-bold text-red-700">{p.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Theme & Branding */}
          <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-red-600" />
                <h3 className="font-bold text-stone-900 text-sm">Theme & Branding</h3>
              </div>
              <button className="text-xs font-semibold text-red-700 hover:underline">Edit Theme &gt;</button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-2.5 rounded-lg border border-stone-200 flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-md bg-[#A11E1E] shadow-xs" />
                <div>
                  <p className="font-bold text-stone-900">Primary</p>
                  <p className="text-[10px] text-stone-400 font-mono">#A11E1E</p>
                </div>
              </div>
              <div className="p-2.5 rounded-lg border border-stone-200 flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-md bg-[#F4C430] shadow-xs" />
                <div>
                  <p className="font-bold text-stone-900">Secondary</p>
                  <p className="text-[10px] text-stone-400 font-mono">#F4C430</p>
                </div>
              </div>
              <div className="p-2.5 rounded-lg border border-stone-200 flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-md bg-[#FDF6EB] border border-stone-300 shadow-xs" />
                <div>
                  <p className="font-bold text-stone-900">Background</p>
                  <p className="text-[10px] text-stone-400 font-mono">#FDF6EB</p>
                </div>
              </div>
              <div className="p-2.5 rounded-lg border border-stone-200 flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-md bg-[#1F1F1F] shadow-xs" />
                <div>
                  <p className="font-bold text-stone-900">Text</p>
                  <p className="text-[10px] text-stone-400 font-mono">#1F1F1F</p>
                </div>
              </div>
            </div>
          </div>

          {/* Important Settings & SEO */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Toggles */}
            <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-xs space-y-3 text-xs">
              <h3 className="font-bold text-stone-900 text-sm mb-1">Important Settings</h3>
              
              <div className="flex items-center justify-between py-1">
                <div>
                  <p className="font-bold text-stone-800">PWA Install Banner</p>
                  <p className="text-[10px] text-stone-400">Prompt users to add to homescreen</p>
                </div>
                <button
                  onClick={() => setPwaBanner(!pwaBanner)}
                  className={`w-9 h-5 rounded-full relative transition-colors ${
                    pwaBanner ? 'bg-emerald-500' : 'bg-stone-300'
                  }`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                    pwaBanner ? 'translate-x-4' : ''
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between py-1">
                <div>
                  <p className="font-bold text-stone-800">Order Notifications</p>
                  <p className="text-[10px] text-stone-400">Browser sound alerts for incoming orders</p>
                </div>
                <button
                  onClick={() => setOrderNotifs(!orderNotifs)}
                  className={`w-9 h-5 rounded-full relative transition-colors ${
                    orderNotifs ? 'bg-emerald-500' : 'bg-stone-300'
                  }`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                    orderNotifs ? 'translate-x-4' : ''
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between py-1">
                <div>
                  <p className="font-bold text-stone-800">Menu Auto Sync</p>
                  <p className="text-[10px] text-stone-400">Sync items automatically across apps</p>
                </div>
                <button
                  onClick={() => setMenuSync(!menuSync)}
                  className={`w-9 h-5 rounded-full relative transition-colors ${
                    menuSync ? 'bg-emerald-500' : 'bg-stone-300'
                  }`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                    menuSync ? 'translate-x-4' : ''
                  }`} />
                </button>
              </div>
            </div>

            {/* SEO */}
            <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-stone-900 text-sm">SEO & Meta Info</h3>
                  <button className="text-xs font-semibold text-red-700 hover:underline">Manage &gt;</button>
                </div>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-stone-400 uppercase">Meta Title</span>
                    <p className="font-semibold text-stone-800">Al Aziz Restaurant | Authentic Biryani, Karahi & BBQ</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-stone-400 uppercase">Meta Description</span>
                    <p className="text-stone-600 line-clamp-2">Order authentic Biryani, Karahi, and Pakistani specialties online with fast delivery.</p>
                  </div>
                </div>
              </div>
              <span className="text-[10px] text-emerald-600 font-bold mt-2">✓ Google indexable</span>
            </div>
          </div>
        </div>

        {/* Right Column: Live Preview & Quick Actions (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-xs">
            <h3 className="font-bold text-stone-900 text-sm mb-3">Quick CMS Actions</h3>
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
              <button className="p-2.5 bg-stone-50 hover:bg-stone-100 rounded-lg text-left text-stone-700 flex items-center justify-between">
                <span>Add Banner</span>
                <Plus className="w-3 h-3 text-stone-400" />
              </button>
              <button className="p-2.5 bg-stone-50 hover:bg-stone-100 rounded-lg text-left text-stone-700 flex items-center justify-between">
                <span>Manage Menu</span>
                <ArrowRight className="w-3 h-3 text-stone-400" />
              </button>
              <button className="p-2.5 bg-stone-50 hover:bg-stone-100 rounded-lg text-left text-stone-700 flex items-center justify-between">
                <span>Push Alert</span>
                <Bell className="w-3 h-3 text-stone-400" />
              </button>
              <button className="p-2.5 bg-stone-50 hover:bg-stone-100 rounded-lg text-left text-stone-700 flex items-center justify-between">
                <span>Promo Codes</span>
                <Tag className="w-3 h-3 text-stone-400" />
              </button>
            </div>
          </div>

          {/* Interactive Live Smartphone Mockup */}
          <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-xs flex flex-col items-center">
            <div className="flex items-center justify-between w-full mb-3 text-xs">
              <span className="font-bold text-stone-900">Live Customer Preview</span>
              <div className="flex items-center border border-stone-200 rounded-md overflow-hidden bg-stone-50">
                <button
                  onClick={() => setPreviewMode('mobile')}
                  className={`px-2 py-0.5 text-[10px] font-bold ${
                    previewMode === 'mobile' ? 'bg-red-700 text-white' : 'text-stone-600'
                  }`}
                >
                  PWA Mobile
                </button>
                <button
                  onClick={() => setPreviewMode('desktop')}
                  className={`px-2 py-0.5 text-[10px] font-bold ${
                    previewMode === 'desktop' ? 'bg-red-700 text-white' : 'text-stone-600'
                  }`}
                >
                  Desktop
                </button>
              </div>
            </div>

            {/* Smartphone Case */}
            <div className="w-full max-w-[270px] bg-stone-900 rounded-[34px] p-2.5 shadow-2xl border-4 border-stone-800">
              <div className="w-16 h-3 bg-stone-800 rounded-full mx-auto mb-2" />
              <div className="bg-[#FAF7F2] rounded-[24px] overflow-hidden text-stone-900 text-xs shadow-inner h-[460px] flex flex-col">
                <div className="bg-[#911116] text-white p-3 flex items-center justify-between">
                  <span className="font-bold text-xs tracking-tight">Al Aziz Restaurant</span>
                  <ShoppingBag className="w-4 h-4 text-white" />
                </div>

                <div className="flex-1 overflow-y-auto p-2.5 space-y-2.5">
                  {/* Hero Banner */}
                  <div className="bg-[#A11E1E] text-white rounded-xl p-3 relative overflow-hidden">
                    <span className="bg-amber-400 text-stone-900 text-[8px] font-black px-1.5 py-0.5 rounded">
                      LIMITED TIME
                    </span>
                    <h5 className="font-black text-sm mt-1">10% OFF on all orders</h5>
                    <p className="text-[9px] text-stone-200">Authentic Pakistani & Desi flavors</p>
                    <button className="mt-2 px-2.5 py-1 bg-amber-400 text-stone-900 font-bold rounded text-[9px]">
                      Order Now
                    </button>
                  </div>

                  {/* Categories */}
                  <div className="flex items-center gap-1 text-[9px] font-bold overflow-x-auto">
                    <span className="px-2 py-0.5 rounded-full bg-red-700 text-white">All</span>
                    <span className="px-2 py-0.5 rounded-full bg-stone-200 text-stone-700">Biryani</span>
                    <span className="px-2 py-0.5 rounded-full bg-stone-200 text-stone-700">Karahi</span>
                  </div>

                  {/* Food Card */}
                  <div className="bg-white rounded-xl p-2 border border-stone-200 shadow-xs flex items-center gap-2">
                    <img src="/img/biryani.jpg" alt="" className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-[11px] truncate">Chicken Biryani</p>
                      <p className="text-red-700 font-black text-xs">Rs. 600</p>
                    </div>
                    <button className="px-2 py-1 bg-red-700 text-white rounded text-[10px] font-bold">
                      + Add
                    </button>
                  </div>

                  {/* Food Card 2 */}
                  <div className="bg-white rounded-xl p-2 border border-stone-200 shadow-xs flex items-center gap-2">
                    <img src="/img/karahi.jpg" alt="" className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-[11px] truncate">Chicken Karahi</p>
                      <p className="text-red-700 font-black text-xs">Rs. 1,200</p>
                    </div>
                    <button className="px-2 py-1 bg-red-700 text-white rounded text-[10px] font-bold">
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
  );
}
