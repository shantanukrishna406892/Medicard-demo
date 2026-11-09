import React from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Clock,
  Repeat,
  CheckCircle2,
  FileSpreadsheet,
  PhoneCall,
  Database,
  ShieldAlert,
  Sparkles,
  Zap,
} from 'lucide-react';
import { BOTTLENECK_DETAILS } from '../data/personaData';
import { ProcessStream } from '../types';

interface AsIsBottleneckHubProps {
  activeStream: ProcessStream;
  onSelectStream: (stream: ProcessStream) => void;
  onLaunchSimulation?: () => void;
}

export const AsIsBottleneckHub: React.FC<AsIsBottleneckHubProps> = ({
  activeStream,
  onSelectStream,
  onLaunchSimulation,
}) => {
  const currentBottleneck = BOTTLENECK_DETAILS[activeStream];

  return (
    <section id="bottleneck-context" className="py-12 bg-white border-b border-neutral-200 scroll-mt-14">
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
              <span className="text-amber-600 font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                Audited Baseline Context
              </span>
              <span aria-hidden="true" className="text-neutral-300">·</span>
              <span>Medicard Discovery Diagnosis</span>
              <span aria-hidden="true" className="text-neutral-300">·</span>
              <span>Deep Dive Root Causes</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-neutral-900 tracking-tight">
              Operational Friction: As-Is Bottlenecks vs To-Be Automation
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 mt-1 max-w-3xl">
              Audit the verified operational friction uncovered during discovery that informed the transformed architecture above. Review why manual checks, unmonitored outreach, and Excel macros created systemic cycle delays.
            </p>
          </div>

          {/* Interactive Stream Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-neutral-100 rounded-xl border border-neutral-200/80 shrink-0">
            <button
              onClick={() => onSelectStream('billing')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeStream === 'billing'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/50'
              }`}
            >
              1. Billing Bottleneck
            </button>
            <button
              onClick={() => onSelectStream('collections')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeStream === 'collections'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/50'
              }`}
            >
              2. Collections Bottleneck
            </button>
            <button
              onClick={() => onSelectStream('reconciliation')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeStream === 'reconciliation'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/50'
              }`}
            >
              3. Recon Bottleneck
            </button>
          </div>
        </div>

        {/* Bottleneck Spotlight Card */}
        <div className="rounded-2xl border border-neutral-200 bg-[#FBFBFD] overflow-hidden shadow-xs">
          {/* Top Banner / Summary */}
          <div className="p-6 lg:p-8 border-b border-neutral-200 bg-white">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-amber-100 text-amber-900 border border-amber-200">
                  {currentBottleneck.badge}
                </span>
                {currentBottleneck.repetitionCount && (
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1.5">
                    <Repeat className="w-3 h-3 text-rose-600" />
                    {currentBottleneck.repetitionCount}
                  </span>
                )}
              </div>

              {/* Cycle Time Before vs After */}
              <div className="flex items-center gap-3 text-xs font-mono bg-neutral-50 px-3 py-1.5 rounded-lg border border-neutral-200">
                <span className="text-neutral-500">As-Is:</span>
                <span className="text-rose-700 font-bold line-through">{currentBottleneck.asIsCycleTime}</span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
                <span className="text-neutral-500">To-Be:</span>
                <span className="text-emerald-700 font-bold">{currentBottleneck.toBeCycleTime}</span>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-display font-bold text-neutral-900 mb-3">
              {currentBottleneck.title}
            </h3>
            <p className="text-sm sm:text-base text-neutral-700 leading-relaxed max-w-4xl">
              {currentBottleneck.summary}
            </p>
          </div>

          {/* Special Feature: The 3 Breakdown Points (e.g. 1st, 2nd, and 3rd match in billing) */}
          <div className="p-6 lg:p-8">
            <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-4">
              {activeStream === 'billing'
                ? 'The 3 Disparate Verification Stages in Billing'
                : 'Key Operational Vulnerabilities Uncovered in Discovery'}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {currentBottleneck.tripleMatchPoints?.map((item, index) => (
                <div
                  key={index}
                  className="p-5 rounded-xl border border-neutral-200 bg-white shadow-2xs hover:border-neutral-300 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-neutral-500">
                      STAGE 0{index + 1}
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-neutral-100 text-neutral-700">
                      {item.actor}
                    </span>
                  </div>

                  <h4 className="text-sm font-display font-bold text-neutral-900 mb-1.5">
                    {item.step}
                  </h4>

                  <div className="text-xs font-mono text-neutral-500 bg-neutral-50 p-2 rounded border border-neutral-150 mb-3">
                    {item.system}
                  </div>

                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {item.friction}
                  </p>
                </div>
              ))}
            </div>

            {/* To-Be Transformation Intervention & Impact */}
            <div className="p-5 sm:p-6 rounded-xl bg-gradient-to-r from-emerald-50/80 to-teal-50/40 border border-emerald-200/80">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-1.5 max-w-3xl">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider">
                      <Zap className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                      Transformation Solution
                    </span>
                    <span className="text-xs text-emerald-700/80 font-medium hidden sm:inline">
                      · Direct Remedy
                    </span>
                  </div>
                  <p className="text-sm font-medium text-emerald-950 leading-relaxed">
                    {currentBottleneck.solutionIntervention}
                  </p>
                  <p className="text-xs text-emerald-800 font-semibold">
                    Measurable Result: {currentBottleneck.businessImpact}
                  </p>
                </div>

                {onLaunchSimulation && (
                  <button
                    onClick={onLaunchSimulation}
                    className="self-start lg:self-center inline-flex items-center gap-2 px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <span>Return to Live Simulation Theater</span>
                    <ArrowRight className="w-4 h-4 text-[#FF5500]" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
