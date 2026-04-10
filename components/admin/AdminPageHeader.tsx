'use client';
import { ReactNode } from 'react';

interface AdminPageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  actions?: ReactNode;
}

export default function AdminPageHeader({ 
  title, 
  subtitle, 
  icon, 
  actions 
}: AdminPageHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm">
      <div className="flex items-center gap-3">
        {icon && (
          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-indigo-50">
            {icon}
          </div>
        )}
        <div>
          <h1 className="font-bold text-slate-800 text-xl leading-tight">{title}</h1>
          {subtitle && (
            <p className="text-slate-400 text-sm mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>
      {actions && (
        <div className="flex items-center gap-3">
          {actions}
        </div>
      )}
    </div>
  );
}