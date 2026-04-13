'use client';
import AdminShell from '@/components/admin/AdminShell';
import AnalyticsAdmin from '@/components/admin/AnalyticsAdmin';

export default function IntegrationPage() {
  return (
    <AdminShell>
      <AnalyticsAdmin />
    </AdminShell>
  );
}