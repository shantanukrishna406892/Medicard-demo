import React from 'react';
import { Workflow, Compass, User } from 'lucide-react';
import { ProcessStream, PersonaId } from '../types';
import { USER_PERSONAS } from '../data/personaData';

interface HeaderProps {
  activeStream: ProcessStream;
  onSelectStream: (stream: ProcessStream) => void;
  activePersonaId?: PersonaId;
  onStartTour?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeStream,
  onSelectStream,
  activePersonaId = 'billing_expert',
  onStartTour,
}) => {
  const currentPersona = USER_PERSONAS[activePersonaId] || USER_PERSONAS.billing_expert;

  const scrollToCenterstage = (stream?: ProcessStream) => {
    if (stream) {
      onSelectStream(stream);
    }
    const el = document.getElementById('centerstage-journeys');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToBottlenecks = () => {
    const el = document.getElementById('bottleneck-context');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToArchitecture = () => {
    const el = document.getElementById('architecture');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      scrollToCenterstage();
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 transition-all duration-200">
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-12 h-16 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 text-neutral-900 font-display font-bold text-lg tracking-tight hover:opacity-85 transition-opacity cursor-pointer text-left"
          >
            <span className="text-[#FF5500]">Straive</span>
            <span className="text-neutral-300 font-light text-base">/</span>
            <span className="text-neutral-900 font-medium tracking-normal text-base">
              Medicard Operations
            </span>
          </button>
          <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-neutral-100 text-neutral-700 border border-neutral-200">
            Transformed User Journey
          </span>
        </div>

        {/* Zone 2: Navigation to Transformed Journey Streams & Context */}
        <nav className="hidden lg:flex items-center gap-1.5 text-xs font-semibold">
          <button
            onClick={scrollToBottlenecks}
            className="px-3 py-1.5 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            As-Is Bottlenecks
          </button>

          <button
            onClick={() => scrollToCenterstage('billing')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeStream === 'billing'
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            1. Billing (3-Way Match)
          </button>

          <button
            onClick={() => scrollToCenterstage('collections')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeStream === 'collections'
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            2. Collections (Dunning)
          </button>

          <button
            onClick={() => scrollToCenterstage('reconciliation')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeStream === 'reconciliation'
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            3. Reconciliation (Clearing)
          </button>

          <button
            onClick={scrollToArchitecture}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <Workflow className="w-3.5 h-3.5 text-[#FF5500]" />
            <span>3-Layer Engine</span>
          </button>
        </nav>

        {/* Zone 3: Active Operator Badge & Guided Tour Button */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Active Operator indicator */}
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-xl bg-neutral-50 border border-neutral-200 text-xs font-mono">
            <span className={`w-2 h-2 rounded-full ${currentPersona.avatarBg}`} />
            <span className="text-neutral-600 truncate max-w-[120px]">{currentPersona.name}</span>
          </div>

          {/* Guided Tour CTA */}
          {onStartTour && (
            <button
              onClick={onStartTour}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5 text-[#FF5500]" />
              <span>Guided Tour</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
