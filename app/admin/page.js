'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import AdminLayout from '../../components/admin/AdminLayout';
import DashboardView from '../../components/admin/DashboardView';
import OrdersView from '../../components/admin/OrdersView';
import MenuView from '../../components/admin/MenuView';
import InventoryView from '../../components/admin/InventoryView';
import StaffView from '../../components/admin/StaffView';
import CashAccountsView from '../../components/admin/CashAccountsView';
import CustomersView from '../../components/admin/CustomersView';
import CmsWebsiteView from '../../components/admin/CmsWebsiteView';
import KitchenDisplayView from '../../components/admin/KitchenDisplayView';

function AdminContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tabFromUrl = searchParams.get('tab') || 'dashboard';

  const [activeTab, setActiveTab] = useState(tabFromUrl);

  useEffect(() => {
    if (tabFromUrl && tabFromUrl !== activeTab) {
      setActiveTab(tabFromUrl);
    }
  }, [tabFromUrl]);

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
      case 'menu':
        return <MenuView />;
      case 'inventory':
        return <InventoryView />;
      case 'staff':
        return <StaffView />;
      case 'accounts':
        return <CashAccountsView />;
      case 'customers':
        return <CustomersView />;
      case 'cms':
        return <CmsWebsiteView />;
      case 'kitchen':
        return <KitchenDisplayView />;
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
    <Suspense fallback={<div className="min-h-screen bg-[#F4F1EA] flex items-center justify-center font-bold text-stone-600">Loading Admin Dashboard...</div>}>
      <AdminContent />
    </Suspense>
  );
}
