'use client';
import { useState } from 'react';
import {
  Settings,
  Store,
  Clock,
  Printer,
  Bell,
  CreditCard,
  Percent,
  Save,
  CheckCircle2,
  Phone,
  MapPin,
  Mail,
  ShieldCheck,
  Smartphone,
  Flame,
} from 'lucide-react';

export default function SettingsView() {
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('profile'); // profile, orders, kitchen, payments

  // Form State
  const [profile, setProfile] = useState({
    name: 'Al Aziz Restaurant',
    tagline: 'Authentic Biryani, Desi Karahi & Charcoal BBQ',
    phone: '+92 51 2287461',
    whatsapp: '+92 300 1234567',
    email: 'admin@alazizrestaurant.com',
    address: 'Plot 14-B, Main Jinnah Avenue, Blue Area, Islamabad',
    ntn: '7482910-4',
    openingTime: '11:30',
    closingTime: '01:00',
    lastOrderTime: '00:30',
  });

  const [orderSettings, setOrderSettings] = useState({
    taxRate: 16,
    enableTax: true,
    serviceCharge: 5,
    enableServiceCharge: false,
    deliveryFee: 150,
    freeDeliveryThreshold: 1500,
    minOrderAmount: 500,
    estimatedDeliveryMins: 35,
    dineInGuestCountPrompt: true,
  });

  const [kitchenSettings, setKitchenSettings] = useState({
    autoPrintKOT: true,
    soundAlerts: true,
    whatsappAlerts: true,
    autoAcceptOrders: false,
    kdsRefreshInterval: 15,
  });

  const handleSave = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-[#911116]">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900">
                Restaurant Settings
              </h1>
              <p className="text-xs sm:text-sm text-stone-500">
                Configure Al Aziz Restaurant business details, tax rates, delivery fees, and automated kitchen alerts.
              </p>
            </div>
          </div>
        </div>

        {/* Save button */}
        <button
          onClick={handleSave}
          className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-xl bg-[#911116] hover:bg-[#7B0D12] text-white text-xs sm:text-sm font-semibold shadow-xs transition active:scale-95"
        >
          {savedSuccess ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>Settings Saved!</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </>
          )}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 overflow-x-auto">
        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-3 px-3 text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
            activeTab === 'profile'
              ? 'border-[#911116] text-[#911116]'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Store className="w-4 h-4" />
          <span>Restaurant Identity</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 px-3 text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
            activeTab === 'orders'
              ? 'border-[#911116] text-[#911116]'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Taxes & Delivery Rules</span>
        </button>

        <button
          onClick={() => setActiveTab('kitchen')}
          className={`pb-3 px-3 text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
            activeTab === 'kitchen'
              ? 'border-[#911116] text-[#911116]'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Printer className="w-4 h-4" />
          <span>Kitchen, KOT & Alerts</span>
        </button>
      </div>

      {/* Content Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {activeTab === 'profile' && (
          <div className="bg-white rounded-xl border border-stone-200 shadow-xs p-5 sm:p-6 space-y-5 text-xs">
            <h2 className="font-bold text-stone-900 text-sm sm:text-base flex items-center gap-2">
              <Store className="w-4 h-4 text-[#911116]" />
              <span>Official Business Information</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-stone-700 block mb-1">Restaurant Trade Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 font-semibold focus:outline-none focus:border-amber-400 focus:bg-white"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Brand Tagline</label>
                <input
                  type="text"
                  value={profile.tagline}
                  onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 focus:outline-none focus:border-amber-400 focus:bg-white"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Landline Order Line</label>
                <input
                  type="text"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 font-mono"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Official WhatsApp Dispatch</label>
                <input
                  type="text"
                  value={profile.whatsapp}
                  onChange={(e) => setProfile({ ...profile, whatsapp: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 font-mono"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Administrative Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 font-mono"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">FBR / NTN Tax ID</label>
                <input
                  type="text"
                  value={profile.ntn}
                  onChange={(e) => setProfile({ ...profile, ntn: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 font-mono"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="font-semibold text-stone-700 block mb-1">Physical Location Address</label>
                <input
                  type="text"
                  value={profile.address}
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 focus:outline-none focus:border-amber-400 focus:bg-white"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100">
              <h3 className="font-bold text-stone-900 text-xs mb-3 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-stone-500" />
                <span>Operating Timings</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-stone-600 block mb-1">Opening Time</label>
                  <input
                    type="time"
                    value={profile.openingTime}
                    onChange={(e) => setProfile({ ...profile, openingTime: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg font-mono text-stone-800"
                  />
                </div>
                <div>
                  <label className="text-stone-600 block mb-1">Closing Time</label>
                  <input
                    type="time"
                    value={profile.closingTime}
                    onChange={(e) => setProfile({ ...profile, closingTime: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg font-mono text-stone-800"
                  />
                </div>
                <div>
                  <label className="text-stone-600 block mb-1">Last Kitchen Call</label>
                  <input
                    type="time"
                    value={profile.lastOrderTime}
                    onChange={(e) => setProfile({ ...profile, lastOrderTime: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg font-mono text-stone-800"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-white rounded-xl border border-stone-200 shadow-xs p-5 sm:p-6 space-y-5 text-xs">
            <h2 className="font-bold text-stone-900 text-sm sm:text-base flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#911116]" />
              <span>Taxation & Delivery Pricing Policies</span>
            </h2>

            <div className="space-y-4">
              {/* Sales Tax */}
              <div className="p-4 rounded-xl border border-stone-100 bg-stone-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-bold text-stone-900">GST / Sales Tax on Restaurant Invoices</h3>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Federal/Provincial sales tax rate printed on bills (Islamabad Capital Territory 16% standard).
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      min="0"
                      max="30"
                      value={orderSettings.taxRate}
                      onChange={(e) => setOrderSettings({ ...orderSettings, taxRate: e.target.value })}
                      className="w-20 px-2 py-1.5 bg-white border border-stone-200 rounded-lg font-mono font-bold text-right text-stone-900"
                    />
                    <span className="font-bold text-stone-600">%</span>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={orderSettings.enableTax}
                      onChange={(e) => setOrderSettings({ ...orderSettings, enableTax: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#911116]"></div>
                  </label>
                </div>
              </div>

              {/* Delivery Charge */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
                  <label className="font-semibold text-stone-700 block mb-1">Standard Delivery Fee (PKR)</label>
                  <input
                    type="number"
                    value={orderSettings.deliveryFee}
                    onChange={(e) => setOrderSettings({ ...orderSettings, deliveryFee: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg font-mono font-bold text-stone-900"
                  />
                  <span className="text-[10px] text-stone-400 mt-1 block">Default rider charge</span>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
                  <label className="font-semibold text-stone-700 block mb-1">Free Delivery Above (PKR)</label>
                  <input
                    type="number"
                    value={orderSettings.freeDeliveryThreshold}
                    onChange={(e) => setOrderSettings({ ...orderSettings, freeDeliveryThreshold: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg font-mono font-bold text-stone-900"
                  />
                  <span className="text-[10px] text-stone-400 mt-1 block">Zero delivery cost for basket</span>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
                  <label className="font-semibold text-stone-700 block mb-1">Min Order Basket (PKR)</label>
                  <input
                    type="number"
                    value={orderSettings.minOrderAmount}
                    onChange={(e) => setOrderSettings({ ...orderSettings, minOrderAmount: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg font-mono font-bold text-stone-900"
                  />
                  <span className="text-[10px] text-stone-400 mt-1 block">Minimum checkout requirement</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'kitchen' && (
          <div className="bg-white rounded-xl border border-stone-200 shadow-xs p-5 sm:p-6 space-y-5 text-xs">
            <h2 className="font-bold text-stone-900 text-sm sm:text-base flex items-center gap-2">
              <Printer className="w-4 h-4 text-[#911116]" />
              <span>Kitchen Display & Thermal Printing Automation</span>
            </h2>

            <div className="space-y-3">
              <div className="p-4 rounded-xl border border-stone-100 bg-stone-50 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-stone-900">Auto-Print Kitchen Order Ticket (KOT)</h3>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Automatically print 80mm thermal KOT slips for Biryani, Karahi & BBQ chefs when an order arrives.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={kitchenSettings.autoPrintKOT}
                    onChange={(e) => setKitchenSettings({ ...kitchenSettings, autoPrintKOT: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#911116]"></div>
                </label>
              </div>

              <div className="p-4 rounded-xl border border-stone-100 bg-stone-50 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-stone-900">Audio Chime On New Online Web Orders</h3>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Play acoustic alert in manager dashboard whenever a new website/PWA order is submitted.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={kitchenSettings.soundAlerts}
                    onChange={(e) => setKitchenSettings({ ...kitchenSettings, soundAlerts: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#911116]"></div>
                </label>
              </div>

              <div className="p-4 rounded-xl border border-stone-100 bg-stone-50 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-stone-900">WhatsApp Notification To Customer</h3>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Send automated status message: &quot;Your Al Aziz order is confirmed and being prepared.&quot;
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={kitchenSettings.whatsappAlerts}
                    onChange={(e) => setKitchenSettings({ ...kitchenSettings, whatsappAlerts: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#911116]"></div>
                </label>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
