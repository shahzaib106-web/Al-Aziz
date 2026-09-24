'use client';
import { useRouter } from 'next/navigation';
import AdminLayout from '../../../components/admin/AdminLayout';
import CashAccountsView from '../../../components/admin/CashAccountsView';

export default function AdminRevenuePage() {
  const router = useRouter();

  const handleSelectTab = (tab) => {
    if (tab === 'accounts') return;
    router.push(`/admin?tab=${tab}`);
  };

  return (
    <AdminLayout activeTab="accounts" onSelectTab={handleSelectTab}>
      <CashAccountsView />
    </AdminLayout>
  );
}
