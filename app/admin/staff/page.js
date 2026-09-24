'use client';
import { useRouter } from 'next/navigation';
import AdminLayout from '../../../components/admin/AdminLayout';
import StaffView from '../../../components/admin/StaffView';

export default function AdminStaffPage() {
  const router = useRouter();

  const handleSelectTab = (tab) => {
    if (tab === 'staff') return;
    router.push(`/admin?tab=${tab}`);
  };

  return (
    <AdminLayout activeTab="staff" onSelectTab={handleSelectTab}>
      <StaffView />
    </AdminLayout>
  );
}
