'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  ClipboardList,
  Utensils,
  LayoutGrid,
  Package,
  Users,
  Users2,
  Wallet,
  Tag,
  Monitor,
  Bike,
  Armchair,
  BarChart2,
  Settings,
  ChefHat,
  Search,
  Bell,
  ChevronDown,
  Menu as MenuIcon,
  X,
  ExternalLink,
  Crown,
  Check,
  LogOut,
  Smartphone,
  FileSpreadsheet,
} from 'lucide-react';
import { ADMIN_NAV_ITEMS } from './data';
import GoogleSheetsSyncModal from './GoogleSheetsSyncModal';

const ICONS_MAP = {
  LayoutDashboard,
  ClipboardList,
  ChefHat,
  Utensils,
  LayoutGrid,
  Package,
  Users,
  Users2,
  Wallet,
  Tag,
  Monitor,
  Bike,
  Armchair,
  BarChart2,
  Settings,
};

export default function AdminLayout({ children, activeTab, activeTabId, onSelectTab, onSearch }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [unreadNotifs, setUnreadNotifs] = useState(3);
  const [sheetsModalOpen, setSheetsModalOpen] = useState(false);

  const getActiveTab = () => {
    if (activeTab) return activeTab;
    if (activeTabId) return activeTabId;
    if (pathname.includes('/admin/orders')) return 'orders';
    if (pathname.includes('/admin/kds') || pathname.includes('/admin/kitchen')) return 'kitchen';
    if (pathname.includes('/admin/menu')) return 'menu';
    if (pathname.includes('/admin/categories')) return 'categories';
    if (pathname.includes('/admin/tables')) return 'tables';
    if (pathname.includes('/admin/delivery')) return 'delivery';
    if (pathname.includes('/admin/inventory')) return 'inventory';
    if (pathname.includes('/admin/staff')) return 'staff';
    if (pathname.includes('/admin/customers')) return 'customers';
    if (pathname.includes('/admin/revenue') || pathname.includes('/admin/cash-accounts')) return 'revenue';
    if (pathname.includes('/admin/promotions')) return 'promotions';
    if (pathname.includes('/admin/reports')) return 'reports';
    if (pathname.includes('/admin/cms') || pathname.includes('/admin/website')) return 'cms';
    if (pathname.includes('/admin/settings')) return 'settings';
    return 'dashboard';
  };

  const currentTab = getActiveTab();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchVal);
  };

  const handleNavClick = (e, item) => {
    setMobileMenuOpen(false);
    if (onSelectTab && pathname === '/admin') {
      e.preventDefault();
      onSelectTab(item.id);
    }
  };

  return (
    <div dir="ltr" className="min-h-screen bg-[#F4F1EA] text-[#1E1E1E] flex flex-col font-sans antialiased selection:bg-[#911116] selection:text-white">
      {/* Top Header */}
      <header className="sticky top-0 z-40 h-16 bg-[#911116] text-white flex items-center justify-between px-4 lg:px-6 shadow-md border-b border-[#7B0D12]">
        {/* Left: Brand */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-lg text-white/90 hover:bg-white/10 transition"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>

          <Link href="/admin" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-xs">
              <Crown className="w-5 h-5 fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base lg:text-[17px] tracking-tight text-white leading-tight">
                Al Aziz Restaurant
              </span>
              <span className="text-[10px] text-amber-200/80 uppercase font-semibold tracking-wider">
                Management System
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Search (only if onSearch provided) */}
        {onSearch && (
          <div className="hidden md:flex flex-1 max-w-lg mx-6">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchVal}
                onChange={(e) => {
                  setSearchVal(e.target.value);
                  if (onSearch) onSearch(e.target.value);
                }}
                placeholder="Search orders, menu, dishes, riders, staff..."
                className="w-full bg-white text-stone-900 placeholder-stone-400 text-xs pl-10 pr-4 py-2 rounded-xl border border-transparent focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 shadow-xs transition"
              />
            </form>
          </div>
        )}

        {/* Right: Actions, Notifications & Profile */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
          {/* Live App Link */}
          <Link
            href="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition border border-white/15 shadow-xs"
          >
            <Smartphone className="w-3.5 h-3.5 text-amber-300" />
            <span>Customer App</span>
            <ExternalLink className="w-3 h-3 text-white/60" />
          </Link>

          {/* Google Sheets Sync Button */}
          <button
            onClick={() => setSheetsModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold transition shadow-xs active:scale-95"
            title="Google Sheets Sync"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-200" />
            <span>Google Sheets</span>
          </button>

          {/* Kitchen KDS Link */}
          <Link
            href="/admin/kds"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400 text-stone-950 text-xs font-bold transition hover:bg-amber-300 shadow-xs"
          >
            <ChefHat className="w-3.5 h-3.5" />
            <span>KDS Kitchen</span>
          </Link>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative p-2 rounded-full text-white/90 hover:bg-white/10 transition"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifs > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-amber-400 border border-[#911116] text-stone-950 text-[10px] font-bold rounded-full flex items-center justify-center font-mono">
                  {unreadNotifs}
                </span>
              )}
            </button>

            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-stone-200 py-2 z-50 text-stone-800 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-4 py-2 border-b border-stone-100 flex items-center justify-between">
                  <span className="font-bold text-xs">Notifications ({unreadNotifs} unread)</span>
                  {unreadNotifs > 0 && (
                    <button
                      onClick={() => setUnreadNotifs(0)}
                      className="text-[11px] text-[#911116] font-semibold hover:underline"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>
                <div className="divide-y divide-stone-100 text-xs">
                  <div className="p-3 hover:bg-stone-50 cursor-pointer transition">
                    <p className="font-bold text-stone-900">New Order #1042 received</p>
                    <p className="text-[11px] text-stone-500">Dine In · Table 4 · Rs. 2,480</p>
                    <span className="text-[10px] text-stone-400 font-mono">2 mins ago</span>
                  </div>
                  <div className="p-3 hover:bg-stone-50 cursor-pointer transition">
                    <p className="font-bold text-red-700">Low Stock Alert: Cooking Oil</p>
                    <p className="text-[11px] text-stone-500">Only 2 bottles left in inventory</p>
                    <span className="text-[10px] text-stone-400 font-mono">15 mins ago</span>
                  </div>
                  <div className="p-3 hover:bg-stone-50 cursor-pointer transition">
                    <p className="font-bold text-stone-900">Delivery Order #1041 dispatched</p>
                    <p className="text-[11px] text-stone-500">Rider Zain Abbas · Sector F-7/2</p>
                    <span className="text-[10px] text-stone-400 font-mono">32 mins ago</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="h-6 w-px bg-white/20" />

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2.5 pl-1 pr-2 py-1 rounded-xl hover:bg-white/10 transition text-left"
            >
              <div className="w-8 h-8 rounded-full bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center shadow-xs">
                AK
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-xs font-bold text-white leading-tight">Ahmed Khan</span>
                <span className="text-[10px] text-amber-200/80 flex items-center gap-1 leading-tight font-medium">
                  General Manager <ChevronDown className="w-3 h-3 text-white/60" />
                </span>
              </div>
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-stone-200 py-2 z-50 text-stone-800 text-xs animate-in fade-in zoom-in-95 duration-100">
                <div className="px-4 py-2.5 border-b border-stone-100">
                  <p className="font-bold text-stone-900">Ahmed Khan</p>
                  <p className="text-stone-500 text-[11px] truncate">admin@alazizrestaurant.com</p>
                </div>
                <Link
                  href="/"
                  target="_blank"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-stone-50 text-stone-700 transition"
                  onClick={() => setProfileOpen(false)}
                >
                  <ExternalLink className="w-3.5 h-3.5 text-stone-400" /> View Customer App
                </Link>
                <Link
                  href="/admin/settings"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-stone-50 text-stone-700 transition"
                  onClick={() => setProfileOpen(false)}
                >
                  <Settings className="w-3.5 h-3.5 text-stone-400" /> Restaurant Settings
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Container: Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <aside
          className={`fixed lg:sticky top-16 z-30 h-[calc(100vh-4rem)] w-64 shrink-0 bg-[#FAF7F2] border-r border-[#EAE3D6] flex flex-col justify-between transition-transform duration-200 ease-in-out ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1 scrollbar-thin">
            {ADMIN_NAV_ITEMS.map((item) => {
              const IconComp = ICONS_MAP[item.icon] || LayoutDashboard;
              const isActive = currentTab === item.id;

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-[13px] font-semibold transition-all ${
                    isActive
                      ? 'bg-[#911116] text-white shadow-xs'
                      : 'text-stone-700 hover:text-stone-950 hover:bg-[#F2ECE2]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <IconComp className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-stone-500'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full font-mono tabular-nums shadow-xs ${
                        isActive ? 'bg-white/20 text-white' : 'bg-[#911116] text-white'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Quick Help Card */}
          <div className="p-3 border-t border-[#EAE3D6]">
            <div className="bg-white rounded-xl p-3 border border-[#E4DDD0] shadow-xs">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-6 h-6 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-xs">
                  🕌
                </div>
                <h4 className="text-xs font-bold text-stone-900">Al Aziz Restaurant</h4>
              </div>
              <p className="text-[11px] text-stone-500 leading-snug">
                Blue Area Islamabad · Daily 11:30 AM - 1:00 AM
              </p>
              <div className="grid grid-cols-2 gap-2 mt-2.5">
                <button
                  type="button"
                  onClick={() => setSheetsModalOpen(true)}
                  className="w-full py-1.5 px-2 rounded-lg border border-emerald-200 text-emerald-800 bg-emerald-50 hover:bg-emerald-100 text-[11px] font-semibold flex items-center justify-center gap-1 transition"
                >
                  <FileSpreadsheet className="w-3 h-3 text-emerald-600" />
                  <span>Sync Sheets</span>
                </button>
                <Link
                  href="/admin/settings"
                  className="w-full py-1.5 px-2 rounded-lg border border-stone-200 text-stone-700 hover:bg-stone-50 text-[11px] font-semibold flex items-center justify-center gap-1 transition"
                >
                  <Settings className="w-3 h-3 text-stone-400" />
                  <span>Settings</span>
                </Link>
              </div>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {mobileMenuOpen && (
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/40 z-20 lg:hidden backdrop-blur-xs"
          />
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-[#F4F1EA] p-4 sm:p-6 lg:p-8 min-w-0">
          <div className="max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Google Sheets Sync Modal */}
      <GoogleSheetsSyncModal
        isOpen={sheetsModalOpen}
        onClose={() => setSheetsModalOpen(false)}
      />
    </div>
  );
}
