import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Compass,
  X,
  ChevronRight,
  ChevronLeft,
  Play,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  Zap,
  Check,
  Server,
  ArrowRight,
} from 'lucide-react';
import { ProcessStream } from '../types';

export interface InSituStep {
  id: string;
  stepNumber: number;
  badge: string;
  title: string;
  subtitle: string;
  content: string;
  keyTakeaway: string;
  targetElementId: string;
  actionButtonLabel: string;
  autoExecuteSimulationStep?: number; // 0-indexed step to trigger in simulation console
}

const TOUR_STEPS_BY_STREAM: Record<ProcessStream, InSituStep[]> = {
  billing: [
    {
      id: 'persona',
      stepNumber: 1,
      badge: 'Operator Profile',
      title: 'Practitioner Profile: Senior Billing Specialist',
      subtitle: 'Maria Santos · Billing & Collections Department',
      content:
        'In legacy operations, Maria spent ~45 minutes manually cross-checking roster transmittals against PBS and Intranet tables. The transformed solution equips her with autonomous OCR extraction (~15–30s match) while preserving dual-control supervisory review.',
      keyTakeaway:
        'Eliminates manual re-typing and focuses operator attention on policy exception validation.',
      targetElementId: 'persona-spotlight',
      actionButtonLabel: 'Next: Inspect As-Is Bottlenecks',
    },
    {
      id: 'bottlenecks',
      stepNumber: 2,
      badge: 'Discovery Audit',
      title: 'The Triplicate 3-Way Match Challenge',
      subtitle: 'Why invoices were verified 3 times across 3 disconnected tools',
      content:
        'Discovery revealed that Billing Assistants checked transmittals vs PBS; Billing Leads duplicated the check in MS Forms; and Leads re-verified entries in NAV 2016. Our Billing Automation Module consolidates this into a single autonomous cross-check.',
      keyTakeaway:
        'Collapses cycle turnaround from ~3–5 working days to same-day / <1 hour.',
      targetElementId: 'bottleneck-context',
      actionButtonLabel: 'Next: Enter Live Simulation Theater',
    },
    {
      id: 'stage-1',
      stepNumber: 3,
      badge: 'Stage 01 · Ingestion',
      title: 'Document Ingestion & Autonomous OCR',
      subtitle: 'San Miguel Global Power · 142 Member Enrollment List (PDF)',
      content:
        'The Billing Automation Module ingests the multi-page enrollment roster. AI vision extracts member tiers, coverage dates, and policy numbers with ~88–94% straight-through confidence.',
      keyTakeaway:
        'Replaces line-by-line manual keying with ~15–30s instant tabular data extraction.',
      targetElementId: 'stage-step-1',
      actionButtonLabel: 'Run Stage 01 in Simulator & Next',
      autoExecuteSimulationStep: 0,
    },
    {
      id: 'stage-2',
      stepNumber: 4,
      badge: 'Stage 02 · 3-Way Match',
      title: 'Autonomous Rate Matching',
      subtitle: 'Reconciling Transmittals vs SOB Contract Matrices vs PBS',
      content:
        'The core match engine cross-references all 142 members against approved contractual rates. 139 standard members match immediately; 3 tier additions are flagged for supervisor confirmation.',
      keyTakeaway:
        'Resolves the ₱5.0M corporate batch in ~15–30 seconds with 100% mathematical precision.',
      targetElementId: 'stage-step-2',
      actionButtonLabel: 'Run Stage 02 in Simulator & Next',
      autoExecuteSimulationStep: 1,
    },
    {
      id: 'stage-3',
      stepNumber: 5,
      badge: 'Stage 03 · Dual Control',
      title: 'Dual-Control Supervisor Approval Gate',
      subtitle: 'Dual-control governance for high-value enterprise invoicing',
      content:
        'The Billing Lead inspects pre-validated totals and confirms standard tier rate adjustments. This enforces strict financial audit controls before any entry touches the ERP ledger.',
      keyTakeaway:
        'Guarantees 100% audit compliance with a single-click supervisor approval.',
      targetElementId: 'stage-step-3',
      actionButtonLabel: 'Run Stage 03 in Simulator & Next',
      autoExecuteSimulationStep: 2,
    },
    {
      id: 'stage-4',
      stepNumber: 6,
      badge: 'Stage 04 · ERP Integration',
      title: 'Real-Time NAV 2016 Sync & Dispatch',
      subtitle: 'Dynamics NAV 2016 General Journal & 2% BIR 2307 Tax Math',
      content:
        'Invoice #INV-2026-9041 is posted directly into Dynamics NAV 2016. The 2% BIR 2307 withholding tax (-₱100,000) is calculated automatically, and finalized PDF invoices dispatch to client Treasury.',
      keyTakeaway:
        'Direct ERP synchronization future-proofed for modern enterprise ERP migration.',
      targetElementId: 'nav-erp-window',
      actionButtonLabel: 'Complete Guided Tour',
      autoExecuteSimulationStep: 3,
    },
  ],
  collections: [
    {
      id: 'persona-col',
      stepNumber: 1,
      badge: 'Operator Profile',
      title: 'Practitioner Profile: Collections Specialist',
      subtitle: 'Carlos Reyes · Revenue Recovery & AR Management',
      content:
        'Carlos previously spent hours downloading manual SSRS spreadsheets and making untracked calls from his personal phone. The transformed solution equips him with continuous NAV AR ingestion and automated DPD dunning (~85–90% Day 1 reach).',
      keyTakeaway:
        'Replaces manual spreadsheet dunning with prioritized risk buckets and tracked touchpoints.',
      targetElementId: 'persona-spotlight',
      actionButtonLabel: 'Next: Inspect Collections Bottleneck',
    },
    {
      id: 'bottleneck-col',
      stepNumber: 2,
      badge: 'Discovery Audit',
      title: 'Untracked Outreach & Health Fund Depletion',
      subtitle: 'Why collections outreach was reactive and uncoordinated',
      content:
        'Discovery uncovered that corporate debtor outreach lacked centralized telephony integration, and enterprise Health Funds nearing the 50% threshold went undetected until employee clinic admissions were blocked.',
      keyTakeaway:
        'Transforms reactive collections into proactive risk-tiered management.',
      targetElementId: 'bottleneck-context',
      actionButtonLabel: 'Next: Enter Live Simulation Theater',
    },
    {
      id: 'stage-col-1',
      stepNumber: 3,
      badge: 'Stage 01 · Ingestion',
      title: 'Automated NAV AR Sync & DPD Triaging',
      subtitle: 'Universal Robina Corp (URC) · ₱2,500,000 Overdue (45 DPD)',
      content:
        'The Intelligent Collections System pulls live balances directly from NAV 2016, prioritizing overdue commercial accounts and sorting accounts by DPD risk bucket.',
      keyTakeaway:
        'Eliminates manual spreadsheet exports and private macro workbooks.',
      targetElementId: 'stage-step-1',
      actionButtonLabel: 'Run Stage 01 in Simulator & Next',
      autoExecuteSimulationStep: 0,
    },
    {
      id: 'stage-col-2',
      stepNumber: 4,
      badge: 'Stage 02 · Omnichannel',
      title: 'Multi-Channel Reminder Dispatch',
      subtitle: 'Branded email & SMS with Statement of Account (SOA)',
      content:
        'Personalized dunning notices with live statement attachments and secure settlement links dispatch automatically across verified channels (~85–90% Day 1 reach).',
      keyTakeaway:
        'Accelerates cash recovery velocity while eliminating personal mobile calls.',
      targetElementId: 'stage-step-2',
      actionButtonLabel: 'Run Stage 02 in Simulator & Next',
      autoExecuteSimulationStep: 1,
    },
    {
      id: 'stage-col-3',
      stepNumber: 5,
      badge: 'Stage 03 · PTP Analysis',
      title: 'Capturing Promise to Pay (PTP)',
      subtitle: 'AI Natural Language Parser extracts debtor commitments',
      content:
        'When URC Finance replies confirming check release next Friday, the NLP engine parses the commitment date and schedules automated 48-hour reminders.',
      keyTakeaway:
        'Cuts DSO by ~7–10% through closed-loop commitment realization.',
      targetElementId: 'stage-step-3',
      actionButtonLabel: 'Run Stage 03 in Simulator & Next',
      autoExecuteSimulationStep: 2,
    },
    {
      id: 'stage-col-4',
      stepNumber: 6,
      badge: 'Stage 04 · Settlement',
      title: 'NAV Ledger Clearing & Counter Reset',
      subtitle: 'Bank deposit of ₱2,450,000 (net of 2% tax) confirmed',
      content:
        'Payment matches against lockbox feed, clearing unapplied AR balances in NAV 2016 and resetting the account DPD counter to 0.',
      keyTakeaway:
        'Instant ledger reconciliation and customer credit reinstatement.',
      targetElementId: 'nav-erp-window',
      actionButtonLabel: 'Complete Guided Tour',
      autoExecuteSimulationStep: 3,
    },
  ],
  reconciliation: [
    {
      id: 'persona-rec',
      stepNumber: 1,
      badge: 'Operator Profile',
      title: 'Practitioner Profile: Senior Reconciliation Analyst',
      subtitle: 'Elena Cruz · Finance & General Accounting',
      content:
        'Elena spent days troubleshooting crashing VBA macros on 10,000+ transaction rows. The transformed solution auto-clears ~60–70% of tallied entries instantly and uses AI vision to extract BIR 2307 withholding certificates.',
      keyTakeaway:
        'Replaces macro crashes with structured, scalable cloud database pipelines.',
      targetElementId: 'persona-spotlight',
      actionButtonLabel: 'Next: Inspect Recon Bottleneck',
    },
    {
      id: 'bottleneck-rec',
      stepNumber: 2,
      badge: 'Discovery Audit',
      title: 'Desktop Macro Instability & IT Ticket Latency',
      subtitle: 'Why month-end financial closing took ~3–5 working days',
      content:
        'Desktop macros corrupted easily, requiring analysts to spend hours manually checking entries that already balanced, and waiting days for IT help desk tickets on system variances.',
      keyTakeaway:
        'Reduces month-end variance resolution from ~3–5 days to ~2–4 hours.',
      targetElementId: 'bottleneck-context',
      actionButtonLabel: 'Next: Enter Live Simulation Theater',
    },
    {
      id: 'stage-rec-1',
      stepNumber: 3,
      badge: 'Stage 01 · Ingestion',
      title: 'Automated Bank Lockbox Ingestion',
      subtitle: 'Nestlé Philippines · ₱3,920,000 Metrobank Lockbox Feed',
      content:
        'Cloud data pipeline ingests daily bank settlement feeds automatically, eliminating desktop CSV downloads and macro formatting crashes.',
      keyTakeaway:
        'Native cloud data pipeline ensures 100% transaction data integrity.',
      targetElementId: 'stage-step-1',
      actionButtonLabel: 'Run Stage 01 in Simulator & Next',
      autoExecuteSimulationStep: 0,
    },
    {
      id: 'stage-rec-2',
      stepNumber: 4,
      badge: 'Stage 02 · Auto-Match',
      title: 'Straight-Through Invoice Matching',
      subtitle: 'Matching deposit against Invoice #INV-2026-3392',
      content:
        'The engine matches the remittance reference and computes the exact 2% BIR 2307 tax withholding variance (-₱80,000) straight through.',
      keyTakeaway:
        '~60–70% of standard entries auto-cleared without manual touch.',
      targetElementId: 'stage-step-2',
      actionButtonLabel: 'Run Stage 02 in Simulator & Next',
      autoExecuteSimulationStep: 1,
    },
    {
      id: 'stage-rec-3',
      stepNumber: 5,
      badge: 'Stage 03 · Tax Extraction',
      title: 'BIR 2307 Withholding Tax Extraction',
      subtitle: 'AI reads client withholding certificate in seconds',
      content:
        'AI vision extracts customer TIN, period covered, and 2% tax amount, verifying tax certificate compliance to clear the invoice balance.',
      keyTakeaway:
        'Prevents tax leakage and audit queries during year-end closing.',
      targetElementId: 'stage-step-3',
      actionButtonLabel: 'Run Stage 03 in Simulator & Next',
      autoExecuteSimulationStep: 2,
    },
    {
      id: 'stage-rec-4',
      stepNumber: 6,
      badge: 'Stage 04 · Financial Close',
      title: 'NAV Settlement & SCM Report Generation',
      subtitle: 'Statement of Collections & Movement compiled',
      content:
        'Settlement journals post to Dynamics NAV 2016 and the audit-ready Statement of Collections & Movement (SCM) compiles instantly.',
      keyTakeaway:
        'Audit-ready financial close completed in hours instead of days.',
      targetElementId: 'nav-erp-window',
      actionButtonLabel: 'Complete Guided Tour',
      autoExecuteSimulationStep: 3,
    },
  ],
};

interface InSituGuidedTourProps {
  isOpen: boolean;
  onClose: () => void;
  activeStream: ProcessStream;
  onSelectStream: (stream: ProcessStream) => void;
  onTriggerSimulationStep: (stepNumber: number) => void;
}

export const InSituGuidedTour: React.FC<InSituGuidedTourProps> = ({
  isOpen,
  onClose,
  activeStream,
  onSelectStream,
  onTriggerSimulationStep,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [spotlightRect, setSpotlightRect] = useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);

  const steps = TOUR_STEPS_BY_STREAM[activeStream] || TOUR_STEPS_BY_STREAM.billing;
  const currentStep = steps[currentStepIndex] || steps[0];
  const totalSteps = steps.length;

  // Smoothly scroll and recalculate spotlight box
  const syncSpotlight = useCallback(() => {
    if (!isOpen) return;
    const el = document.getElementById(currentStep.targetElementId);
    if (el) {
      const rect = el.getBoundingClientRect();
      setSpotlightRect({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
    } else {
      setSpotlightRect(null);
    }
  }, [isOpen, currentStep.targetElementId]);

  // When step changes, smooth scroll target element to center and sync rect
  useEffect(() => {
    if (!isOpen) return;

    const el = document.getElementById(currentStep.targetElementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Give smooth scroll a moment, then lock in spotlight coordinates
    const timer = setTimeout(() => {
      syncSpotlight();
    }, 150);

    return () => clearTimeout(timer);
  }, [isOpen, currentStepIndex, activeStream, currentStep.targetElementId, syncSpotlight]);

  // Recalculate on scroll and resize so fixed halo tracks viewport smoothly
  useEffect(() => {
    if (!isOpen) return;
    let animId: number;

    const handleUpdate = () => {
      animId = requestAnimationFrame(syncSpotlight);
    };

    window.addEventListener('resize', handleUpdate);
    window.addEventListener('scroll', handleUpdate, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleUpdate);
      window.removeEventListener('scroll', handleUpdate);
    };
  }, [isOpen, syncSpotlight]);

  // Keyboard navigation (Escape to close, Left/Right arrows)
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && currentStepIndex < totalSteps - 1) {
        handleNext();
      } else if (e.key === 'ArrowLeft' && currentStepIndex > 0) {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentStepIndex, totalSteps]);

  // Reset to step 0 when stream changes
  useEffect(() => {
    setCurrentStepIndex(0);
  }, [activeStream]);

  if (!isOpen) return null;

  const handleNext = () => {
    // If step has an associated live simulation step, trigger it
    if (
      currentStep.autoExecuteSimulationStep !== undefined &&
      currentStep.autoExecuteSimulationStep !== null
    ) {
      onTriggerSimulationStep(currentStep.autoExecuteSimulationStep);
    }

    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleJumpToStep = (index: number) => {
    setCurrentStepIndex(index);
  };

  return (
    <>
      {/* Subtle backdrop overlay with gentle dark tint */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-neutral-950/40 backdrop-blur-2xs transition-opacity duration-200 pointer-events-auto"
        aria-hidden="true"
      />

      {/* FIXED-POSITION SPOTLIGHT HALO: Follows target element precisely without scrolling desync */}
      {spotlightRect && (
        <div
          style={{
            position: 'fixed',
            top: spotlightRect.top - 6,
            left: spotlightRect.left - 6,
            width: spotlightRect.width + 12,
            height: spotlightRect.height + 12,
          }}
          className="z-40 rounded-2xl ring-4 ring-[#FF5500] ring-offset-4 ring-offset-neutral-950 pointer-events-none transition-all duration-300 shadow-[0_0_40px_rgba(255,85,0,0.5)]"
        />
      )}

      {/* DOCKED FLOATING CONTROL BAR: Always visible, never jumps or hides */}
      <div className="fixed bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95vw] max-w-2xl bg-[#0B0C10]/95 text-white backdrop-blur-xl rounded-2xl border border-neutral-700/80 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.7)] p-4 sm:p-5 transition-all duration-300 animate-in fade-in slide-in-from-bottom-5">
        {/* Progress bar line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-neutral-800 rounded-t-2xl overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#FF5500] to-orange-400 transition-all duration-300 ease-out"
            style={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }}
          />
        </div>

        {/* Top Control Ribbon: Stream Switcher, Step Count & Dismiss */}
        <div className="flex items-center justify-between gap-3 pb-3 mb-3 border-b border-neutral-800/80">
          {/* Stream Switcher Tabs */}
          <div className="flex items-center gap-1 p-0.5 bg-neutral-900 rounded-xl border border-neutral-800 text-[11px] font-mono">
            <button
              onClick={() => onSelectStream('billing')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeStream === 'billing'
                  ? 'bg-[#FF5500] text-white font-bold shadow-xs'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              1. Billing
            </button>
            <button
              onClick={() => onSelectStream('collections')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeStream === 'collections'
                  ? 'bg-[#FF5500] text-white font-bold shadow-xs'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              2. Collections
            </button>
            <button
              onClick={() => onSelectStream('reconciliation')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeStream === 'reconciliation'
                  ? 'bg-[#FF5500] text-white font-bold shadow-xs'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              3. Recon
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold text-neutral-400">
              Step <span className="text-white">0{currentStep.stepNumber}</span> of 0{totalSteps}
            </span>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
              aria-label="Close guided tour"
              title="Close tour (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tour Step Core Narrative */}
        <div className="space-y-2.5 mb-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#FF5500]/20 text-[#FF5500] border border-[#FF5500]/30">
              {currentStep.badge}
            </span>
            <span className="text-xs text-neutral-400 font-mono truncate">
              {currentStep.subtitle}
            </span>
          </div>

          <h4 className="text-sm sm:text-base font-display font-bold text-white tracking-tight">
            {currentStep.title}
          </h4>

          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
            {currentStep.content}
          </p>

          {/* Operational Takeaway Callout */}
          <div className="p-2.5 rounded-xl bg-neutral-900/90 border border-neutral-800 text-xs text-neutral-300 flex items-start gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-neutral-400 font-semibold uppercase text-[10px] block mb-0.5">
                Measurable Operational Value:
              </span>
              <span className="text-white font-medium">{currentStep.keyTakeaway}</span>
            </div>
          </div>
        </div>

        {/* Bottom Action Ribbon: Step Dots, Back, and Live Execute/Next Button */}
        <div className="flex items-center justify-between gap-3 pt-2 border-t border-neutral-800/80">
          {/* Step dots */}
          <div className="flex items-center gap-1.5">
            {steps.map((st, sIdx) => (
              <button
                key={st.id}
                onClick={() => handleJumpToStep(sIdx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  sIdx === currentStepIndex
                    ? 'w-6 bg-[#FF5500]'
                    : sIdx < currentStepIndex
                    ? 'w-2 bg-emerald-500'
                    : 'w-2 bg-neutral-700 hover:bg-neutral-600'
                }`}
                aria-label={`Jump to step ${sIdx + 1}`}
              />
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {currentStepIndex > 0 && (
              <button
                onClick={handlePrev}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold text-neutral-300 bg-neutral-900 border border-neutral-700 hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Back
              </button>
            )}

            <button
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#FF5500] hover:bg-[#FF4500] shadow-md shadow-[#FF5500]/25 transition-all cursor-pointer whitespace-nowrap active:scale-[0.98]"
            >
              {currentStep.autoExecuteSimulationStep !== undefined ? (
                <>
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>{currentStep.actionButtonLabel}</span>
                </>
              ) : currentStepIndex === totalSteps - 1 ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>{currentStep.actionButtonLabel}</span>
                </>
              ) : (
                <>
                  <span>{currentStep.actionButtonLabel}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-white" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
