'use client';
import { useRouter } from 'next/navigation';
import AdminLayout from '../../../components/admin/AdminLayout';
import CategoriesView from '../../../components/admin/CategoriesView';

export default function AdminCategoriesPage() {
  const router = useRouter();

  const handleSelectTab = (tab) => {
    if (tab === 'categories') return;
    router.push(`/admin?tab=${tab}`);
  };

  return (
    <AdminLayout activeTab="categories" onSelectTab={handleSelectTab}>
      <CategoriesView />
    </AdminLayout>
  );
}
