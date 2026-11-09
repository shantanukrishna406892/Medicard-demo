import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-neutral-200 py-12 text-neutral-500 text-xs">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-neutral-100">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[#FF5500] font-bold font-display text-base">Straive</span>
              <span className="text-neutral-300">/</span>
              <span className="text-neutral-900 font-semibold">Medicard Operations</span>
            </div>
            <p className="text-neutral-500 max-w-xl text-xs leading-relaxed">
              Transformed User Journey & Operations Simulation Platform. Demonstrating straight-through billing, automated dunning collections, and daily bank reconciliation synchronized with Microsoft Dynamics NAV 2016.
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-medium transition-colors self-start md:self-auto cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[11px] text-neutral-400">
          <div>
            © {new Date().getFullYear()} Straive. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Client: Medicard Philippines</span>
            <span>·</span>
            <span>ERP Integration: Microsoft Dynamics NAV 2016</span>
            <span>·</span>
            <span>Transformed User Journey</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
