'use client';
import { useRouter } from 'next/navigation';
import AdminLayout from '../../../components/admin/AdminLayout';
import KitchenDisplayView from '../../../components/admin/KitchenDisplayView';

export default function AdminKdsPage() {
  const router = useRouter();

  const handleSelectTab = (tab) => {
    if (tab === 'kitchen') return;
    router.push(`/admin?tab=${tab}`);
  };

  return (
    <AdminLayout activeTab="kitchen" onSelectTab={handleSelectTab}>
      <KitchenDisplayView />
    </AdminLayout>
  );
}
