'use client';
import { useRouter } from 'next/navigation';
import AdminLayout from '../../../components/admin/AdminLayout';
import TablesView from '../../../components/admin/TablesView';

export default function AdminTablesPage() {
  const router = useRouter();

  const handleSelectTab = (tab) => {
    if (tab === 'tables') return;
    router.push(`/admin?tab=${tab}`);
  };

  return (
    <AdminLayout activeTab="tables" onSelectTab={handleSelectTab}>
      <TablesView />
    </AdminLayout>
  );
}
