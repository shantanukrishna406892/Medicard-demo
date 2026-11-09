import React from 'react';
import {
  UserCheck,
  Sparkles,
  Quote,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Clock,
  Briefcase,
  Layers,
} from 'lucide-react';
import { USER_PERSONAS } from '../data/personaData';
import { PersonaId, ProcessStream } from '../types';

interface PersonaSpotlightProps {
  activePersonaId: PersonaId;
  onSelectPersona: (id: PersonaId) => void;
  onStreamChange?: (stream: ProcessStream) => void;
}

export const PersonaSpotlight: React.FC<PersonaSpotlightProps> = ({
  activePersonaId,
  onSelectPersona,
  onStreamChange,
}) => {
  const currentPersona = USER_PERSONAS[activePersonaId];

  const handleSelect = (id: PersonaId) => {
    onSelectPersona(id);
    if (onStreamChange) {
      onStreamChange(USER_PERSONAS[id].stream);
    }
  };

  return (
    <div id="persona-spotlight" className="mb-8">
      {/* Persona Header & Mode Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">
            <span className="text-[#FF5500] font-bold">Operator Profiles</span>
            <span aria-hidden="true" className="text-neutral-300">·</span>
            <span>Human-in-the-Loop Perspective</span>
          </div>
          <h3 className="text-lg font-display font-bold text-neutral-900">
            Active Operator Journey & Governance Role
          </h3>
        </div>

        {/* 3 Persona Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-neutral-100 rounded-xl border border-neutral-200 shrink-0">
          <button
            onClick={() => handleSelect('billing_expert')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activePersonaId === 'billing_expert'
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/50'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center text-[10px] font-bold">
              MS
            </span>
            <span>Billing Expert</span>
          </button>

          <button
            onClick={() => handleSelect('collections_agent')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activePersonaId === 'collections_agent'
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/50'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
              CR
            </span>
            <span>Collections Agent</span>
          </button>

          <button
            onClick={() => handleSelect('recon_specialist')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activePersonaId === 'recon_specialist'
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/50'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
              EC
            </span>
            <span>Recon Analyst</span>
          </button>
        </div>
      </div>

      {/* Persona Card Detail */}
      <div className="p-5 sm:p-6 rounded-2xl border border-neutral-200 bg-white shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Col 1: Avatar, Name, Role & Metric */}
          <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-neutral-200 pb-5 lg:pb-0 lg:pr-6">
            <div className="flex items-start gap-3.5 mb-4">
              <div
                className={`w-12 h-12 rounded-xl ${currentPersona.avatarBg} text-white flex items-center justify-center font-display font-bold text-base shadow-sm shrink-0`}
              >
                {currentPersona.avatarInitials}
              </div>
              <div>
                <h4 className="text-base font-display font-bold text-neutral-900">
                  {currentPersona.name}
                </h4>
                <p className="text-xs text-neutral-600 font-medium">
                  {currentPersona.roleTitle}
                </p>
                <p className="text-[11px] text-neutral-500 font-mono mt-0.5">
                  {currentPersona.department}
                </p>
              </div>
            </div>

            {/* Metric pill */}
            <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200">
              <div className="text-[11px] font-mono text-neutral-500 uppercase">
                {currentPersona.metricHighlight.label}
              </div>
              <div className="text-xl font-display font-bold text-neutral-900 mt-0.5 tabular-nums">
                {currentPersona.metricHighlight.value}
              </div>
              <div className="text-xs text-emerald-700 font-medium mt-0.5">
                {currentPersona.metricHighlight.subtext}
              </div>
            </div>
          </div>

          {/* Col 2: The Shift: Daily Friction vs Automated Superpower */}
          <div className="lg:col-span-8 space-y-3">
            {/* Quote */}
            <div className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 italic bg-[#FBFBFD] p-3.5 rounded-xl border border-neutral-200">
              <Quote className="w-4 h-4 text-[#FF5500] shrink-0 mt-0.5" />
              <span>&ldquo;{currentPersona.keyQuote}&rdquo;</span>
            </div>

            {/* Friction & Superpower Comparison */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-rose-50/50 border border-rose-200">
                <span className="font-bold text-rose-800 uppercase tracking-wider block mb-1">
                  As-Is Operational Friction
                </span>
                <p className="text-neutral-700 leading-relaxed">
                  {currentPersona.dailyFriction}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-emerald-50/50 border border-emerald-200">
                <span className="font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                  To-Be Transformed Superpower
                </span>
                <p className="text-neutral-700 leading-relaxed">
                  {currentPersona.automatedSuperpower}
                </p>
              </div>
            </div>

            {/* Responsibilities list */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-600 pt-1">
              <span className="font-semibold text-neutral-800">Key Domain Scope:</span>
              {currentPersona.keyResponsibilities.map((resp, i) => (
                <span key={i} className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                  <span>{resp}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
