'use client';
import { useRouter } from 'next/navigation';
import AdminLayout from '../../../components/admin/AdminLayout';
import ReportsView from '../../../components/admin/ReportsView';

export default function AdminReportsPage() {
  const router = useRouter();

  const handleSelectTab = (tab) => {
    if (tab === 'reports') return;
    router.push(`/admin?tab=${tab}`);
  };

  return (
    <AdminLayout activeTab="reports" onSelectTab={handleSelectTab}>
      <ReportsView />
    </AdminLayout>
  );
}
