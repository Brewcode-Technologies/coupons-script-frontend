'use client';
import { useEffect } from 'react';
import { loadAnalytics } from '@/utils/analytics';

export default function DynamicAnalyticsLoader() {
  useEffect(() => {
    // Load analytics after component mounts
    loadAnalytics();
  }, []);

  return null; // This component doesn't render anything
}