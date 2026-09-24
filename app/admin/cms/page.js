'use client';
import { useRouter } from 'next/navigation';
import AdminLayout from '../../../components/admin/AdminLayout';
import CmsWebsiteView from '../../../components/admin/CmsWebsiteView';

export default function AdminCmsPage() {
  const router = useRouter();

  const handleSelectTab = (tab) => {
    if (tab === 'cms') return;
    router.push(`/admin?tab=${tab}`);
  };

  return (
    <AdminLayout activeTab="cms" onSelectTab={handleSelectTab}>
      <CmsWebsiteView />
    </AdminLayout>
  );
}
