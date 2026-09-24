'use client';
import { useRouter } from 'next/navigation';
import AdminLayout from '../../../components/admin/AdminLayout';
import CustomersView from '../../../components/admin/CustomersView';

export default function AdminCustomersPage() {
  const router = useRouter();

  const handleSelectTab = (tab) => {
    if (tab === 'customers') return;
    router.push(`/admin?tab=${tab}`);
  };

  return (
    <AdminLayout activeTab="customers" onSelectTab={handleSelectTab}>
      <CustomersView />
    </AdminLayout>
  );
}
