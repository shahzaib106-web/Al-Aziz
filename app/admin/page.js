'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import AdminLayout from '../../components/admin/AdminLayout';
import DashboardView from '../../components/admin/DashboardView';
import OrdersView from '../../components/admin/OrdersView';
import MenuView from '../../components/admin/MenuView';
import CategoriesView from '../../components/admin/CategoriesView';
import TablesView from '../../components/admin/TablesView';
import DeliveryView from '../../components/admin/DeliveryView';
import InventoryView from '../../components/admin/InventoryView';
import StaffView from '../../components/admin/StaffView';
import CustomersView from '../../components/admin/CustomersView';
import CashAccountsView from '../../components/admin/CashAccountsView';
import PromotionsView from '../../components/admin/PromotionsView';
import ReportsView from '../../components/admin/ReportsView';
import CmsWebsiteView from '../../components/admin/CmsWebsiteView';
import KitchenDisplayView from '../../components/admin/KitchenDisplayView';
import SettingsView from '../../components/admin/SettingsView';

function AdminContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tabFromUrl = searchParams.get('tab') || 'dashboard';

  const [activeTab, setActiveTab] = useState(tabFromUrl);

  useEffect(() => {
    if (tabFromUrl && tabFromUrl !== activeTab) {
      setActiveTab(tabFromUrl);
    }
  }, [tabFromUrl, activeTab]);

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    router.replace(`/admin?tab=${newTab}`, { scroll: false });
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView onNavigate={handleTabChange} />;
      case 'orders':
        return <OrdersView />;
      case 'kitchen':
      case 'kds':
        return <KitchenDisplayView />;
      case 'menu':
        return <MenuView />;
      case 'categories':
        return <CategoriesView />;
      case 'tables':
        return <TablesView />;
      case 'delivery':
        return <DeliveryView />;
      case 'inventory':
        return <InventoryView />;
      case 'staff':
        return <StaffView />;
      case 'customers':
        return <CustomersView />;
      case 'accounts':
      case 'revenue':
        return <CashAccountsView />;
      case 'promotions':
        return <PromotionsView />;
      case 'reports':
        return <ReportsView />;
      case 'cms':
        return <CmsWebsiteView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView onNavigate={handleTabChange} />;
    }
  };

  return (
    <AdminLayout activeTab={activeTab} onSelectTab={handleTabChange}>
      {renderActiveView()}
    </AdminLayout>
  );
}

export default function AdminPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F4F1EA] flex items-center justify-center font-bold text-stone-600">
          Loading Al Aziz Admin Dashboard...
        </div>
      }
    >
      <AdminContent />
    </Suspense>
  );
}
