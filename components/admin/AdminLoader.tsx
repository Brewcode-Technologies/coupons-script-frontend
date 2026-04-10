'use client';
import { CircularProgress } from '@mui/material';

interface AdminLoaderProps {
  message?: string;
  size?: number;
  fullPage?: boolean;
}

export default function AdminLoader({ 
  message = 'Loading...', 
  size = 24, 
  fullPage = false 
}: AdminLoaderProps) {
  if (fullPage) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] w-full">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <CircularProgress 
              size={size} 
              style={{ 
                color: '#6366f1',
                filter: 'drop-shadow(0 2px 4px rgba(99, 102, 241, 0.2))'
              }} 
            />
          </div>
          <p className="text-slate-500 text-sm font-medium animate-pulse">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-8">
      <div className="flex items-center gap-3">
        <CircularProgress 
          size={size} 
          style={{ 
            color: '#6366f1',
            filter: 'drop-shadow(0 2px 4px rgba(99, 102, 241, 0.2))'
          }} 
        />
        <p className="text-slate-500 text-sm font-medium">{message}</p>
      </div>
    </div>
  );
}