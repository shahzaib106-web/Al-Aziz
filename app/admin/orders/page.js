'use client';
import { useRouter } from 'next/navigation';
import AdminLayout from '../../../components/admin/AdminLayout';
import OrdersView from '../../../components/admin/OrdersView';

export default function AdminOrdersPage() {
  const router = useRouter();

  const handleSelectTab = (tab) => {
    if (tab === 'orders') return;
    router.push(`/admin?tab=${tab}`);
  };

  return (
    <AdminLayout activeTab="orders" onSelectTab={handleSelectTab}>
      <OrdersView />
    </AdminLayout>
  );
}
