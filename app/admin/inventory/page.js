'use client';
import { useRouter } from 'next/navigation';
import AdminLayout from '../../../components/admin/AdminLayout';
import InventoryView from '../../../components/admin/InventoryView';

export default function AdminInventoryPage() {
  const router = useRouter();

  const handleSelectTab = (tab) => {
    if (tab === 'inventory') return;
    router.push(`/admin?tab=${tab}`);
  };

  return (
    <AdminLayout activeTab="inventory" onSelectTab={handleSelectTab}>
      <InventoryView />
    </AdminLayout>
  );
}
