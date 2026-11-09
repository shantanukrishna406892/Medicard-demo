import React from 'react';
import { ArrowRight, Compass, Zap, ShieldCheck, Clock } from 'lucide-react';
import { ProcessStream, PersonaId } from '../types';
import { PersonaSpotlight } from './PersonaSpotlight';

interface JourneyHeroProps {
  activeStream: ProcessStream;
  onSelectStream: (stream: ProcessStream) => void;
  activePersonaId: PersonaId;
  onSelectPersona: (id: PersonaId) => void;
  onStartTour: () => void;
}

export const JourneyHero: React.FC<JourneyHeroProps> = ({
  activeStream,
  onSelectStream,
  activePersonaId,
  onSelectPersona,
  onStartTour,
}) => {
  const scrollToSimulation = (stream: ProcessStream) => {
    onSelectStream(stream);
    const el = document.getElementById('centerstage-journeys');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToBottleneck = () => {
    const el = document.getElementById('bottleneck-context');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="journey-hero" className="relative pt-10 pb-12 overflow-hidden bg-white">
      {/* Background Subtle Gradient & Grid lines */}
      <div className="absolute inset-0 bg-[radial-gradient(#E5E5EA_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-[#FF5500]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-12 relative">
        {/* Anti-slop clean metadata line & Guided Tour CTA */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 text-xs font-medium text-neutral-500 uppercase tracking-widest">
            <span className="text-neutral-900 font-semibold">Medicard Philippines</span>
            <span aria-hidden="true" className="text-neutral-300">·</span>
            <span>Transformed User Journey</span>
            <span aria-hidden="true" className="text-neutral-300">·</span>
            <span className="text-neutral-800 font-medium">
              Enterprise Revenue Operations
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onStartTour}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-orange-50 hover:bg-orange-100/80 text-[#FF5500] border border-[#FF5500]/30 text-xs font-bold transition-all shadow-2xs cursor-pointer"
            >
              <Compass className="w-4 h-4 text-[#FF5500]" />
              <span>Take Guided Tour</span>
            </button>
            <button
              onClick={scrollToBottleneck}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200/70 text-neutral-700 text-xs font-semibold transition-all cursor-pointer"
            >
              <span>View As-Is Bottlenecks</span>
            </button>
          </div>
        </div>

        {/* Hero Title & Value Proposition */}
        <div className="w-full mb-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-neutral-900 leading-[1.08] mb-4 w-full text-balance">
            Transformed User Journeys: Intelligent Revenue Operations
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 font-normal leading-relaxed w-full max-w-4xl">
            Experience the digital transformation for Medicard Philippines. Explore how manual duplicate checks, personal phone outreach, and vulnerable Excel macros are replaced with straight-through automated workflows integrated directly into Microsoft Dynamics NAV 2016.
          </p>
        </div>

        {/* User Persona Spotlight Component */}
        <PersonaSpotlight
          activePersonaId={activePersonaId}
          onSelectPersona={onSelectPersona}
          onStreamChange={onSelectStream}
        />

        {/* 3 Interactive Transformed Journey Selector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {/* Card 1: Billing */}
          <div
            onClick={() => scrollToSimulation('billing')}
            className={`group p-6 rounded-2xl border transition-all duration-200 cursor-pointer ${
              activeStream === 'billing'
                ? 'bg-neutral-900 text-white border-neutral-900 shadow-lg'
                : 'bg-[#FBFBFD] text-neutral-900 border-neutral-200 hover:border-neutral-300 hover:shadow-md'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md ${
                activeStream === 'billing'
                  ? 'bg-[#FF5500] text-white'
                  : 'bg-neutral-100 text-neutral-600'
              }`}>
                JOURNEY 01
              </span>
              <span className={`text-xs font-mono ${
                activeStream === 'billing' ? 'text-neutral-400' : 'text-neutral-500'
              }`}>
                ~45 mins → ~2–4 mins
              </span>
            </div>
            <h3 className="text-lg font-display font-bold mb-2">
              Billing Operations
            </h3>
            <p className={`text-xs leading-relaxed mb-4 ${
              activeStream === 'billing' ? 'text-neutral-300' : 'text-neutral-600'
            }`}>
              Automated 3-Way Match: Autonomous OCR eliminates the triplicate manual verification bottleneck across Underwriting, SOB, and PBS in seconds.
            </p>
            <div className="flex items-center justify-between pt-3 border-t border-neutral-200/40 text-xs font-semibold">
              <span className={activeStream === 'billing' ? 'text-[#FF5500]' : 'text-neutral-900'}>
                Simulate San Miguel (₱5.0M)
              </span>
              <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                activeStream === 'billing' ? 'text-[#FF5500]' : 'text-neutral-400'
              }`} />
            </div>
          </div>

          {/* Card 2: Collections */}
          <div
            onClick={() => scrollToSimulation('collections')}
            className={`group p-6 rounded-2xl border transition-all duration-200 cursor-pointer ${
              activeStream === 'collections'
                ? 'bg-neutral-900 text-white border-neutral-900 shadow-lg'
                : 'bg-[#FBFBFD] text-neutral-900 border-neutral-200 hover:border-neutral-300 hover:shadow-md'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md ${
                activeStream === 'collections'
                  ? 'bg-[#FF5500] text-white'
                  : 'bg-neutral-100 text-neutral-600'
              }`}>
                JOURNEY 02
              </span>
              <span className={`text-xs font-mono ${
                activeStream === 'collections' ? 'text-neutral-400' : 'text-neutral-500'
              }`}>
                ~85–90% Day 1 Reach
              </span>
            </div>
            <h3 className="text-lg font-display font-bold mb-2">
              Collections Operations
            </h3>
            <p className={`text-xs leading-relaxed mb-4 ${
              activeStream === 'collections' ? 'text-neutral-300' : 'text-neutral-600'
            }`}>
              Intelligent Dunning & PTP: Automated NAV sync, multi-channel dunning, and Health Fund (&lt;50%) threshold alerts replace untracked personal mobile calls.
            </p>
            <div className="flex items-center justify-between pt-3 border-t border-neutral-200/40 text-xs font-semibold">
              <span className={activeStream === 'collections' ? 'text-[#FF5500]' : 'text-neutral-900'}>
                Simulate URC (₱2.5M Overdue)
              </span>
              <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                activeStream === 'collections' ? 'text-[#FF5500]' : 'text-neutral-400'
              }`} />
            </div>
          </div>

          {/* Card 3: Reconciliation */}
          <div
            onClick={() => scrollToSimulation('reconciliation')}
            className={`group p-6 rounded-2xl border transition-all duration-200 cursor-pointer ${
              activeStream === 'reconciliation'
                ? 'bg-neutral-900 text-white border-neutral-900 shadow-lg'
                : 'bg-[#FBFBFD] text-neutral-900 border-neutral-200 hover:border-neutral-300 hover:shadow-md'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md ${
                activeStream === 'reconciliation'
                  ? 'bg-[#FF5500] text-white'
                  : 'bg-neutral-100 text-neutral-600'
              }`}>
                JOURNEY 03
              </span>
              <span className={`text-xs font-mono ${
                activeStream === 'reconciliation' ? 'text-neutral-400' : 'text-neutral-500'
              }`}>
                ~60–70% Auto-Clearing
              </span>
            </div>
            <h3 className="text-lg font-display font-bold mb-2">
              Reconciliation Operations
            </h3>
            <p className={`text-xs leading-relaxed mb-4 ${
              activeStream === 'reconciliation' ? 'text-neutral-300' : 'text-neutral-600'
            }`}>
              Straight-Through Bank Clearing: AI vision extracts 2% BIR 2307 tax forms, replaces crash-prone VBA macros, and auto-generates audit-ready SCM reports.
            </p>
            <div className="flex items-center justify-between pt-3 border-t border-neutral-200/40 text-xs font-semibold">
              <span className={activeStream === 'reconciliation' ? 'text-[#FF5500]' : 'text-neutral-900'}>
                Simulate Nestlé (₱4.0M Settlement)
              </span>
              <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                activeStream === 'reconciliation' ? 'text-[#FF5500]' : 'text-neutral-400'
              }`} />
            </div>
          </div>
        </div>

        {/* Operational Transformation Velocity Band */}
        <div className="p-5 sm:p-6 rounded-2xl bg-neutral-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF5500] text-white flex items-center justify-center shrink-0 font-bold">
              <Zap className="w-5 h-5 fill-white" />
            </div>
            <div>
              <div className="text-xs font-mono text-[#FF5500] uppercase tracking-wider font-semibold">
                Operational Velocity Transformation
              </div>
              <div className="text-sm font-bold text-white">
                From Manual Disconnected Tasks to Straight-Through Digital Operations
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="text-neutral-400 line-through">~3–5 Days Cycle</span>
              <span className="text-[#FF5500]">→</span>
              <span className="text-emerald-400 font-bold">Same-Day (&lt;1 hr)</span>
            </div>
            <div className="h-4 w-px bg-neutral-700 hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="text-neutral-400 line-through">Triplicate 3-Way Match</span>
              <span className="text-[#FF5500]">→</span>
              <span className="text-emerald-400 font-bold">~15–30s Auto-Match</span>
            </div>
            <div className="h-4 w-px bg-neutral-700 hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="text-neutral-400 line-through">VBA Macro Crashes</span>
              <span className="text-[#FF5500]">→</span>
              <span className="text-emerald-400 font-bold">~60–70% Auto-Clearing</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
