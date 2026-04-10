'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// /view with no domain redirects to stores page
export default function ViewIndex() {
  const router = useRouter();
  useEffect(() => {
    // redirect to stores page
    router.replace('/stores');
  }, [router]);
  return null;
}
