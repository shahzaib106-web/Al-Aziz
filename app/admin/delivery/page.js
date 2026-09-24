'use client';
import { useRouter } from 'next/navigation';
import AdminLayout from '../../../components/admin/AdminLayout';
import DeliveryView from '../../../components/admin/DeliveryView';

export default function AdminDeliveryPage() {
  const router = useRouter();

  const handleSelectTab = (tab) => {
    if (tab === 'delivery') return;
    router.push(`/admin?tab=${tab}`);
  };

  return (
    <AdminLayout activeTab="delivery" onSelectTab={handleSelectTab}>
      <DeliveryView />
    </AdminLayout>
  );
}
