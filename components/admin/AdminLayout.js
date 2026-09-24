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
  Search,
  Bell,
  ChevronDown,
  Menu as MenuIcon,
  X,
  ExternalLink,
  Crown,
} from 'lucide-react';
import { ADMIN_NAV_ITEMS } from './data';

const ICONS_MAP = {
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
};

export default function AdminLayout({ children, activeTabId, onSearch }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const getActiveTab = () => {
    if (activeTabId) return activeTabId;
    if (pathname.includes('/admin/orders')) return 'orders';
    if (pathname.includes('/admin/menu')) return 'menu';
    if (pathname.includes('/admin/categories')) return 'categories';
    if (pathname.includes('/admin/inventory')) return 'inventory';
    if (pathname.includes('/admin/staff')) return 'staff';
    if (pathname.includes('/admin/customers')) return 'customers';
    if (pathname.includes('/admin/revenue') || pathname.includes('/admin/cash-accounts')) return 'revenue';
    if (pathname.includes('/admin/promotions')) return 'promotions';
    if (pathname.includes('/admin/cms') || pathname.includes('/admin/website')) return 'cms';
    if (pathname.includes('/admin/delivery')) return 'delivery';
    if (pathname.includes('/admin/tables')) return 'tables';
    if (pathname.includes('/admin/reports')) return 'reports';
    if (pathname.includes('/admin/settings')) return 'settings';
    return 'dashboard';
  };

  const currentTab = getActiveTab();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchVal);
  };

  return (
    <div dir="ltr" className="min-h-screen bg-[#F4F1EA] text-[#1E1E1E] flex flex-col font-sans antialiased selection:bg-[#9E1B1E] selection:text-white">
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
            <div className="w-8 h-8 rounded-lg bg-[#EAB308]/20 border border-[#EAB308]/40 flex items-center justify-center text-[#FBBF24] shadow-xs">
              <Crown className="w-5 h-5 fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[16px] lg:text-[17px] tracking-tight text-white leading-tight">
                Al Arab Restaurant Admin
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Search */}
        <div className="hidden md:flex flex-1 max-w-xl mx-6">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchVal}
              onChange={(e) => {
                setSearchVal(e.target.value);
                if (onSearch) onSearch(e.target.value);
              }}
              placeholder="Search orders, menu items, customers, etc..."
              className="w-full bg-white text-stone-800 placeholder-stone-400 text-[13px] pl-10 pr-4 py-2 rounded-lg border border-transparent focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 shadow-xs transition"
            />
          </form>
        </div>

        {/* Right: Notifications & Profile */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative p-2 rounded-full text-white/90 hover:bg-white/10 transition"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 border border-white text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                3
              </span>
            </button>
            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-stone-200 py-2 z-50 text-stone-800">
                <div className="px-4 py-2 border-b border-stone-100 flex items-center justify-between">
                  <span className="font-bold text-xs">Notifications (3 unread)</span>
                  <span className="text-[10px] text-red-600 font-semibold cursor-pointer">Mark all as read</span>
                </div>
                <div className="divide-y divide-stone-100 text-xs">
                  <div className="p-3 hover:bg-stone-50 cursor-pointer">
                    <p className="font-semibold text-stone-900">New Order #1042 received</p>
                    <p className="text-[11px] text-stone-500">Dine In · Table 4 · Rs. 2,480</p>
                    <span className="text-[10px] text-stone-400">2 mins ago</span>
                  </div>
                  <div className="p-3 hover:bg-stone-50 cursor-pointer">
                    <p className="font-semibold text-red-700">Low Stock Alert: Cooking Oil</p>
                    <p className="text-[11px] text-stone-500">Only 2 bottles left in stock</p>
                    <span className="text-[10px] text-stone-400">15 mins ago</span>
                  </div>
                  <div className="p-3 hover:bg-stone-50 cursor-pointer">
                    <p className="font-semibold text-stone-900">Delivery Order #1037 dispatched</p>
                    <p className="text-[11px] text-stone-500">Rider Ali Khan PKR-4521</p>
                    <span className="text-[10px] text-stone-400">32 mins ago</span>
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
              className="flex items-center gap-2.5 pl-1 pr-2 py-1 rounded-lg hover:bg-white/10 transition text-left"
            >
              <div className="w-8 h-8 rounded-full bg-amber-100 border border-white/40 flex items-center justify-center font-bold text-amber-900 text-xs overflow-hidden shadow-xs">
                AK
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-[13px] font-semibold text-white leading-tight">Ahmed Khan</span>
                <span className="text-[11px] text-white/75 flex items-center gap-1 leading-tight">
                  Administrator <ChevronDown className="w-3 h-3 text-white/60" />
                </span>
              </div>
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-stone-200 py-2 z-50 text-stone-800 text-xs">
                <div className="px-4 py-2 border-b border-stone-100">
                  <p className="font-bold text-stone-900">Ahmed Khan</p>
                  <p className="text-stone-500 text-[11px]">admin@alarabrestaurant.com</p>
                </div>
                <Link href="/" target="_blank" className="flex items-center gap-2 px-4 py-2 hover:bg-stone-50 text-stone-700">
                  <ExternalLink className="w-3.5 h-3.5" /> View Live Customer App
                </Link>
                <Link href="/admin/settings" className="flex items-center gap-2 px-4 py-2 hover:bg-stone-50 text-stone-700">
                  <Settings className="w-3.5 h-3.5" /> Restaurant Settings
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
          className={`fixed lg:sticky top-16 z-30 h-[calc(100vh-4rem)] w-60 shrink-0 bg-[#FAF7F2] border-r border-[#EAE3D6] flex flex-col justify-between transition-transform duration-200 ease-in-out ${
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
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-[13.5px] font-medium transition-all ${
                    isActive
                      ? 'bg-[#FCEAEB] text-[#93171D] font-bold shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-[#F2ECE2]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <IconComp className={`w-4 h-4 ${isActive ? 'text-[#93171D]' : 'text-stone-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="bg-[#93171D] text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Need Help Card */}
          <div className="p-3 border-t border-[#EAE3D6]">
            <div className="bg-white rounded-xl p-3.5 border border-[#E4DDD0] shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center text-[#93171D] mb-2 font-bold text-sm">
                👨‍🍳
              </div>
              <h4 className="text-[12px] font-bold text-stone-900">Need Help?</h4>
              <p className="text-[11px] text-stone-500 mt-0.5 leading-snug">
                Access guides and support resources.
              </p>
              <Link
                href="/admin/settings"
                className="mt-2.5 w-full py-1.5 px-3 rounded-lg border border-[#93171D]/30 text-[#93171D] hover:bg-red-50 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition shadow-xs"
              >
                <span>View Help Center</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
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
        <main className="flex-1 overflow-y-auto bg-[#F4F1EA] p-4 lg:p-6 min-w-0">
          <div className="max-w-[1580px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
