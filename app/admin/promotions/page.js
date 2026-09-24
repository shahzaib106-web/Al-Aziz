'use client';
import { useRouter } from 'next/navigation';
import AdminLayout from '../../../components/admin/AdminLayout';
import PromotionsView from '../../../components/admin/PromotionsView';

export default function AdminPromotionsPage() {
  const router = useRouter();

  const handleSelectTab = (tab) => {
    if (tab === 'promotions') return;
    router.push(`/admin?tab=${tab}`);
  };

  return (
    <AdminLayout activeTab="promotions" onSelectTab={handleSelectTab}>
      <PromotionsView />
    </AdminLayout>
  );
}
