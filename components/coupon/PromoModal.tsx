'use client';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Copy, Check, ExternalLink } from 'lucide-react';

interface PromoModalProps {
  onClose: () => void;
  title: string;
  code?: string;
  discount?: string;
  storeName?: string;
  storeLogo?: string;
  storeUrl?: string;
  expiryDate?: string;
  details?: string;
}

export default function PromoModal({
  onClose, title, code, discount, storeName, storeLogo, storeUrl, expiryDate, details,
}: PromoModalProps) {
  const [copied, setCopied] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Auto-copy code to clipboard when modal opens
  useEffect(() => {
    if (code) {
      navigator.clipboard.writeText(code).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }).catch(() => {});
    }
  }, [code]);

  const handleCopy = () => {
    if (code) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const expiry = expiryDate ? new Date(expiryDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '';

  const modalContent = (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4" style={{ isolation: 'isolate' }} onClick={onClose}>
      <div className="relative bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden max-h-[90vh] flex flex-col mx-auto" onClick={e => e.stopPropagation()}>

        {/* Close button - always visible */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-lg border border-gray-200 hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-all z-20 cursor-pointer"
          aria-label="Close"
        >
          <X className="w-4 h-4" strokeWidth={2.5} />
        </button>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">

          {/* Header gradient bar */}
          <div className="h-2 bg-gradient-to-r from-primary via-secondary to-accent" />

          {/* Top Section */}
          <div className="flex flex-col items-center px-8 pt-8 pb-6 text-center">
            {/* Store Logo */}
            <div className="w-20 h-20 rounded-2xl bg-gray-50 border-2 border-gray-100 flex items-center justify-center mb-5 overflow-hidden shadow-sm">
              {storeLogo ? (
                <img src={storeLogo} alt={storeName} className="w-full h-full object-contain p-2.5" />
              ) : (
                <span className="text-sm font-bold tracking-wider text-gray-400 uppercase">
                  {storeName?.substring(0, 3) || 'Store'}
                </span>
              )}
            </div>

            {/* Store name */}
            {storeName && (
              <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-2">{storeName}</p>
            )}

            {/* Discount badge */}
            {discount && (
              <span className="inline-block bg-primary/10 text-primary text-sm font-bold px-5 py-1.5 rounded-full mb-3 uppercase tracking-wide">
                {discount}
              </span>
            )}

            <h2 className="text-lg font-bold text-gray-900 leading-snug mb-5">{title}</h2>

            {/* Code or Start Shopping */}
            {code ? (
              <div className="w-full">
                <div className="flex items-stretch gap-2 w-full mb-3">
                  <div className="flex-1 border-2 border-dashed border-primary/30 rounded-xl px-4 py-3.5 text-center bg-primary/5">
                    <span className="font-mono text-xl font-black tracking-[0.2em] text-primary">{code}</span>
                  </div>
                  <button onClick={handleCopy}
                    className={`flex flex-col items-center justify-center gap-1 px-5 rounded-xl font-bold text-white transition-all cursor-pointer ${copied ? 'bg-green-500' : 'bg-gray-900 hover:bg-gray-700'}`}>
                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    <span className="text-[10px] font-bold">{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                {storeUrl && (
                  <a href={storeUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-secondary font-medium transition-colors no-underline">
                    Continue to {storeName || 'store'} <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            ) : (
              <a href={storeUrl || '#'} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gray-900 text-white rounded-full px-8 py-3 text-sm font-bold hover:bg-gray-700 transition-colors no-underline">
                Start Shopping <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>

          {/* Divider */}
          <div className="mx-8 border-t border-gray-100" />

          {/* Footer */}
          <div className="flex items-center justify-between px-8 py-4 border-t border-gray-100 bg-gray-50/50">
            {expiry && <span className="text-xs text-gray-500 font-medium">Ends {expiry}</span>}
            {details && (
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-xs underline text-gray-600 font-medium flex items-center gap-1 hover:text-gray-900 transition-colors cursor-pointer ml-auto"
              >
                Details & Exclusions <span className="text-sm leading-none">{showDetails ? '−' : '+'}</span>
              </button>
            )}
          </div>

          {showDetails && details && (
            <div className="px-8 pb-5 text-xs text-gray-500 leading-relaxed bg-gray-50/50">{details}</div>
          )}
        </div>
      </div>
    </div>
  );

  if (typeof window === 'undefined') return null;
  return createPortal(modalContent, document.body);
}
