import React, { useState, useEffect, useRef } from 'react';
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
  Target,
  ArrowRight,
  ShieldCheck,
  Server,
} from 'lucide-react';
import { ProcessStream, PersonaId } from '../types';

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
  autoExecuteSimulationStep?: number; // 0-indexed step to trigger in simulation
  preferredPlacement?: 'top' | 'bottom' | 'left' | 'right';
}

const TOUR_STEPS_BY_STREAM: Record<ProcessStream, InSituStep[]> = {
  billing: [
    {
      id: 'persona',
      stepNumber: 1,
      badge: 'Operator Perspective',
      title: 'Practitioner Profile: Senior Billing Specialist',
      subtitle: 'Maria Santos · Billing & Collections Department (BCD)',
      content: 'In legacy operations, Maria spent ~45 minutes manually verifying transmittals against PBS and Intranet. The transformed solution equips her with autonomous OCR extraction (~15–30s match) while preserving dual-control supervisory review.',
      keyTakeaway: 'Focuses human expertise on exception handling while routine lines match straight through.',
      targetElementId: 'persona-spotlight',
      actionButtonLabel: 'Next: Inspect As-Is Bottleneck',
      preferredPlacement: 'bottom',
    },
    {
      id: 'bottlenecks',
      stepNumber: 2,
      badge: 'Root Cause Context',
      title: 'The Triplicate 3-Way Match Challenge',
      subtitle: 'Why invoices were verified 3 separate times across 3 disconnected tools',
      content: 'Notice the 3 distinct stages below: Billing Assistant checks transmittals vs PBS; Billing Lead duplicates the check in MS Forms; and the Lead re-verifies GL entries in NAV 2016. Our Billing Automation Module consolidates this into a single autonomous cross-check.',
      keyTakeaway: 'Collapses turnaround from ~3–5 working days to same-day / < 1 hour without increasing headcount.',
      targetElementId: 'bottleneck-context',
      actionButtonLabel: 'Next: Step Into Simulation Theater',
      preferredPlacement: 'bottom',
    },
    {
      id: 'stage-1',
      stepNumber: 3,
      badge: 'Agent Domain · Ingestion',
      title: 'Step 1: Document Ingestion & Autonomous OCR',
      subtitle: 'San Miguel Global Power · 142 Member Enrollment List (PDF)',
      content: 'The Billing Automation App ingests the multi-page enrollment roster. AI vision extracts member tiers, coverage dates, and policy numbers with ~88–94% straight-through confidence.',
      keyTakeaway: 'Replaces line-by-line manual keying with instant tabular data extraction.',
      targetElementId: 'stage-step-1',
      actionButtonLabel: 'Execute Step 1 (Ingestion)',
      autoExecuteSimulationStep: 0,
      preferredPlacement: 'bottom',
    },
    {
      id: 'stage-2',
      stepNumber: 4,
      badge: 'Agent Domain · 3-Way Match',
      title: 'Step 2: Autonomous Rate Matching',
      subtitle: 'Reconciling Transmittals vs SOB Contract Matrices vs PBS',
      content: 'The core match engine cross-references all 142 members against approved contractual rates. 139 standard members match immediately; 3 tier additions are flagged for supervisor confirmation.',
      keyTakeaway: 'Eliminates duplicate manual reviews; resolves ₱5.0M batch in ~15–30 seconds.',
      targetElementId: 'stage-step-2',
      actionButtonLabel: 'Execute Step 2 (3-Way Match)',
      autoExecuteSimulationStep: 1,
      preferredPlacement: 'bottom',
    },
    {
      id: 'stage-3',
      stepNumber: 5,
      badge: 'Supervisor Domain · Dual Control',
      title: 'Step 3: Supervisor Validation Gate',
      subtitle: 'Dual-control governance for high-value enterprise invoicing',
      content: 'The Billing Lead inspects pre-validated totals and confirms standard tier rate adjustments. This enforces strict financial audit controls before any entry touches the ERP ledger.',
      keyTakeaway: 'Guarantees 100% audit compliance with a single-click supervisor approval.',
      targetElementId: 'stage-step-3',
      actionButtonLabel: 'Execute Step 3 (Supervisor Gate)',
      autoExecuteSimulationStep: 2,
      preferredPlacement: 'bottom',
    },
    {
      id: 'nav-erp',
      stepNumber: 6,
      badge: 'Enterprise Integration',
      title: 'Step 4: Real-Time NAV 2016 Sync & Dispatch',
      subtitle: 'Dynamics NAV 2016 General Journal & 2% BIR 2307 Tax Math',
      content: 'Watch the accounting record on the right update live: Invoice #INV-2026-9041 is posted, the 2% BIR 2307 withholding tax (-₱100,000) is calculated, and non-editable PDF invoices dispatch to client Treasury.',
      keyTakeaway: 'Direct ERP synchronization future-proofed for modern enterprise ERP migration.',
      targetElementId: 'nav-erp-window',
      actionButtonLabel: 'Execute Step 4 (NAV Sync & Dispatch)',
      autoExecuteSimulationStep: 3,
      preferredPlacement: 'left',
    },
    {
      id: 'architecture',
      stepNumber: 7,
      badge: 'Solution Mechanics',
      title: 'The 3-Layer Automation Engine',
      subtitle: 'Ingestion Layer → Matching Engine → NAV 2016 Orchestration Gateway',
      content: 'Explore the architectural mechanics powering this transformation. Built without fragile desktop macros or intrusive ERP replacements, ensuring seamless enterprise scalability for 970k+ lives.',
      keyTakeaway: 'Empowers operational teams with reliable, audit-ready automated workflows.',
      targetElementId: 'architecture-section',
      actionButtonLabel: 'Complete Tour',
      preferredPlacement: 'top',
    },
  ],
  collections: [
    {
      id: 'persona-col',
      stepNumber: 1,
      badge: 'Operator Perspective',
      title: 'Practitioner Profile: Collections Specialist',
      subtitle: 'Carlos Reyes · Revenue Recovery & AR Management',
      content: 'Carlos previously relied on manual SSRS spreadsheet downloads and untracked calls from his personal phone. The transformed solution equips him with continuous NAV AR ingestion and automated DPD dunning (~85–90% Day 1 reach).',
      keyTakeaway: 'Protects customer relationship trust with branded, audit-compliant communication.',
      targetElementId: 'persona-spotlight',
      actionButtonLabel: 'Next: Collections Bottleneck',
      preferredPlacement: 'bottom',
    },
    {
      id: 'bottleneck-col',
      stepNumber: 2,
      badge: 'Root Cause Context',
      title: 'Untracked Outreach & Health Fund Depletion',
      subtitle: 'Why collections outreach was reactive and vulnerable',
      content: 'Examine how corporate debtor outreach lacked centralized telephony integration, and how enterprise Health Funds nearing the 50% threshold went undetected until employee clinic admissions were blocked.',
      keyTakeaway: 'Transforms reactive collections into proactive risk-tiered management.',
      targetElementId: 'bottleneck-context',
      actionButtonLabel: 'Next: Enter Live Console',
      preferredPlacement: 'bottom',
    },
    {
      id: 'stage-col-1',
      stepNumber: 3,
      badge: 'Automated Ingestion',
      title: 'Step 1: Automated NAV AR Sync & DPD Triaging',
      subtitle: 'Universal Robina Corp (URC) · ₱2,500,000 Overdue (45 DPD)',
      content: 'The Intelligent Collections System pulls live balances directly from NAV 2016, prioritizing overdue commercial accounts and sorting accounts by DPD risk bucket.',
      keyTakeaway: 'Eliminates manual spreadsheet exports and private macro workbooks.',
      targetElementId: 'stage-step-1',
      actionButtonLabel: 'Execute Step 1 (AR Sync)',
      autoExecuteSimulationStep: 0,
      preferredPlacement: 'bottom',
    },
    {
      id: 'stage-col-2',
      stepNumber: 4,
      badge: 'Omnichannel Dunning',
      title: 'Step 2: Multi-Channel Reminder Dispatch',
      subtitle: 'Branded email & SMS with Statement of Account (SOA)',
      content: 'Personalized dunning notices with live statement attachments and secure settlement links dispatch automatically across verified channels (~85–90% Day 1 reach).',
      keyTakeaway: 'Accelerates cash recovery velocity while eliminating personal mobile calls.',
      targetElementId: 'stage-step-2',
      actionButtonLabel: 'Execute Step 2 (Dunning)',
      autoExecuteSimulationStep: 1,
      preferredPlacement: 'bottom',
    },
    {
      id: 'stage-col-3',
      stepNumber: 5,
      badge: 'Agent Domain · PTP Analysis',
      title: 'Step 3: Capturing Promise to Pay (PTP)',
      subtitle: 'AI Natural Language Parser extracts debtor commitments',
      content: 'When URC Finance replies confirming check release next Friday, the NLP engine parses the commitment date and schedules automated 48-hour reminders.',
      keyTakeaway: 'Cuts DSO by ~7–10% through closed-loop commitment realization.',
      targetElementId: 'stage-step-3',
      actionButtonLabel: 'Execute Step 3 (PTP Capture)',
      autoExecuteSimulationStep: 2,
      preferredPlacement: 'bottom',
    },
    {
      id: 'nav-col',
      stepNumber: 6,
      badge: 'Ledger Settlement',
      title: 'Step 4: NAV Ledger Clearing & Counter Reset',
      subtitle: 'Bank deposit of ₱2,450,000 (net of 2% tax) confirmed',
      content: 'Payment matches against lockbox feed, clearing unapplied AR balances in NAV 2016 and resetting the account DPD counter to 0.',
      keyTakeaway: 'Instant ledger reconciliation and customer credit reinstatement.',
      targetElementId: 'nav-erp-window',
      actionButtonLabel: 'Execute Step 4 (Ledger Settlement)',
      autoExecuteSimulationStep: 3,
      preferredPlacement: 'left',
    },
  ],
  reconciliation: [
    {
      id: 'persona-rec',
      stepNumber: 1,
      badge: 'Operator Perspective',
      title: 'Practitioner Profile: Senior Reconciliation Analyst',
      subtitle: 'Elena Cruz · Finance & General Accounting',
      content: 'Elena spent days troubleshooting crashing VBA macros on 10k+ rows. The transformed solution auto-clears ~60–70% of tallied entries instantly and uses AI vision to extract BIR 2307 withholding certificates.',
      keyTakeaway: 'Replaces macro crashes with structured, scalable database pipelines.',
      targetElementId: 'persona-spotlight',
      actionButtonLabel: 'Next: Recon Bottleneck',
      preferredPlacement: 'bottom',
    },
    {
      id: 'bottleneck-rec',
      stepNumber: 2,
      badge: 'Root Cause Context',
      title: 'Desktop Macro Instability & IT Ticket Latency',
      subtitle: 'Why month-end financial closing took ~3–5 working days',
      content: 'Desktop macros corrupted easily, requiring analysts to spend hours manually checking entries that already balanced, and waiting days for IT help desk tickets on system variances.',
      keyTakeaway: 'Reduces month-end variance resolution from ~3–5 days to ~2–4 hours.',
      targetElementId: 'bottleneck-context',
      actionButtonLabel: 'Next: Enter Live Console',
      preferredPlacement: 'bottom',
    },
    {
      id: 'stage-rec-1',
      stepNumber: 3,
      badge: 'Native Pipeline',
      title: 'Step 1: Automated Bank Lockbox Ingestion',
      subtitle: 'Nestlé Philippines · ₱3,920,000 Metrobank Lockbox Feed',
      content: 'Cloud data pipeline ingests daily bank settlement feeds automatically, eliminating desktop CSV downloads and macro formatting crashes.',
      keyTakeaway: 'Native cloud data pipeline ensures 100% data integrity.',
      targetElementId: 'stage-step-1',
      actionButtonLabel: 'Execute Step 1 (Bank Feed)',
      autoExecuteSimulationStep: 0,
      preferredPlacement: 'bottom',
    },
    {
      id: 'stage-rec-2',
      stepNumber: 4,
      badge: 'Auto-Clearing',
      title: 'Step 2: Straight-Through Invoice Matching',
      subtitle: 'Matching deposit against Invoice #INV-2026-3392',
      content: 'The engine matches the remittance reference and computes the exact 2% BIR 2307 tax withholding variance (-₱80,000) straight through.',
      keyTakeaway: '~60–70% of standard entries auto-cleared without manual touch.',
      targetElementId: 'stage-step-2',
      actionButtonLabel: 'Execute Step 2 (Auto-Match)',
      autoExecuteSimulationStep: 1,
      preferredPlacement: 'bottom',
    },
    {
      id: 'stage-rec-3',
      stepNumber: 5,
      badge: 'AI Vision Extraction',
      title: 'Step 3: BIR 2307 Withholding Tax Extraction',
      subtitle: 'AI reads client withholding certificate in seconds',
      content: 'AI vision extracts customer TIN, period covered, and 2% tax amount, verifying tax certificate compliance to clear the invoice balance.',
      keyTakeaway: 'Prevents tax leakage and audit queries during year-end closing.',
      targetElementId: 'stage-step-3',
      actionButtonLabel: 'Execute Step 3 (Tax Verification)',
      autoExecuteSimulationStep: 2,
      preferredPlacement: 'bottom',
    },
    {
      id: 'nav-rec',
      stepNumber: 6,
      badge: 'Financial Close',
      title: 'Step 4: NAV Settlement & SCM Report Generation',
      subtitle: 'Statement of Collections & Movement compiled',
      content: 'Settlement journals post to Dynamics NAV 2016 and the audit-ready Statement of Collections & Movement (SCM) compiles instantly.',
      keyTakeaway: 'Audit-ready financial close completed in hours instead of days.',
      targetElementId: 'nav-erp-window',
      actionButtonLabel: 'Execute Step 4 (SCM & Close)',
      autoExecuteSimulationStep: 3,
      preferredPlacement: 'left',
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
  const [targetRect, setTargetRect] = useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);

  const steps = TOUR_STEPS_BY_STREAM[activeStream] || TOUR_STEPS_BY_STREAM.billing;
  const currentStep = steps[currentStepIndex] || steps[0];
  const totalSteps = steps.length;

  // Reposition tooltip and scroll target element into view
  const updatePosition = () => {
    if (!isOpen) return;
    const el = document.getElementById(currentStep.targetElementId);
    if (el) {
      const rect = el.getBoundingClientRect();
      setTargetRect({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        height: rect.height,
      });

      // Smooth scroll if element is outside comfortable viewing area
      const isInViewport =
        rect.top >= 100 && rect.bottom <= window.innerHeight - 100;
      if (!isInViewport) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else {
      setTargetRect(null);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    updatePosition();
    const handleScrollOrResize = () => {
      updatePosition();
    };
    window.addEventListener('resize', handleScrollOrResize);
    window.addEventListener('scroll', handleScrollOrResize);
    return () => {
      window.removeEventListener('resize', handleScrollOrResize);
      window.removeEventListener('scroll', handleScrollOrResize);
    };
  }, [isOpen, currentStepIndex, activeStream]);

  // Keyboard navigation
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

  // Reset step index when stream changes
  useEffect(() => {
    setCurrentStepIndex(0);
  }, [activeStream]);

  if (!isOpen) return null;

  const handleNext = () => {
    // If the step has a simulation action, execute it live
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

  // Determine tooltip style positioning based on target element
  let tooltipTop = targetRect ? targetRect.top + targetRect.height + 16 : 100;
  let tooltipLeft = targetRect ? Math.max(16, targetRect.left) : 20;

  // Make sure it doesn't overflow right edge on wide screens
  if (typeof window !== 'undefined' && tooltipLeft + 440 > window.innerWidth - 20) {
    tooltipLeft = Math.max(16, window.innerWidth - 460);
  }

  return (
    <>
      {/* Semi-transparent Backdrop with subtle focus tint */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-neutral-950/40 backdrop-blur-2xs transition-opacity duration-200 pointer-events-auto"
      />

      {/* Target Element Spotlight Halo Indicator (in page coordinate space) */}
      {targetRect && (
        <div
          style={{
            position: 'absolute',
            top: targetRect.top - 6,
            left: targetRect.left - 6,
            width: targetRect.width + 12,
            height: targetRect.height + 12,
          }}
          className="z-40 rounded-2xl ring-3 ring-[#FF5500] ring-offset-2 ring-offset-neutral-900 pointer-events-none transition-all duration-300 shadow-[0_0_35px_rgba(255,85,0,0.35)]"
        />
      )}

      {/* Floating In-Situ Tooltip Card */}
      <div
        style={{
          position: 'absolute',
          top: tooltipTop,
          left: tooltipLeft,
        }}
        className="z-50 w-full max-w-[430px] bg-white rounded-2xl border border-neutral-200 shadow-2xl overflow-hidden transition-all duration-300 animate-in fade-in zoom-in-95"
      >
        {/* Top Progress bar */}
        <div className="h-1.5 w-full bg-neutral-100">
          <div
            className="h-full bg-[#FF5500] transition-all duration-300 ease-out"
            style={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }}
          />
        </div>

        {/* Card Header with Stream Picker */}
        <div className="p-4 px-5 border-b border-neutral-150 bg-[#FBFBFD] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-md bg-[#FF5500]/15 text-[#FF5500] flex items-center justify-center text-xs font-bold">
              <Compass className="w-3.5 h-3.5" />
            </span>
            <div className="text-xs font-mono">
              <span className="font-bold text-[#FF5500] uppercase">{currentStep.badge}</span>
              <span className="text-neutral-300 mx-1.5">·</span>
              <span className="text-neutral-500 font-medium">
                {currentStep.stepNumber} of {totalSteps}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-md text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 transition-colors cursor-pointer"
            aria-label="Close Tour"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-3">
          <div>
            <h4 className="text-base sm:text-lg font-display font-bold text-neutral-900 leading-snug">
              {currentStep.title}
            </h4>
            <p className="text-xs text-neutral-500 font-medium mt-0.5">
              {currentStep.subtitle}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
            {currentStep.content}
          </p>

          {/* Operational Takeaway Pill */}
          <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-800 leading-relaxed font-medium flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-neutral-900">Operational Value: </span>
              {currentStep.keyTakeaway}
            </div>
          </div>
        </div>

        {/* Card Footer with Action Buttons */}
        <div className="p-4 px-5 border-t border-neutral-200 bg-[#FBFBFD] flex items-center justify-between gap-3">
          {/* Stream Switcher in Tour */}
          <div className="flex items-center gap-1 text-[11px] font-mono text-neutral-500">
            <button
              onClick={() => onSelectStream('billing')}
              className={`px-2 py-0.5 rounded cursor-pointer ${
                activeStream === 'billing' ? 'font-bold text-[#FF5500] bg-orange-50' : 'hover:text-neutral-900'
              }`}
            >
              Billing
            </button>
            <span>/</span>
            <button
              onClick={() => onSelectStream('collections')}
              className={`px-2 py-0.5 rounded cursor-pointer ${
                activeStream === 'collections' ? 'font-bold text-[#FF5500] bg-orange-50' : 'hover:text-neutral-900'
              }`}
            >
              Collections
            </button>
            <span>/</span>
            <button
              onClick={() => onSelectStream('reconciliation')}
              className={`px-2 py-0.5 rounded cursor-pointer ${
                activeStream === 'reconciliation' ? 'font-bold text-[#FF5500] bg-orange-50' : 'hover:text-neutral-900'
              }`}
            >
              Recon
            </button>
          </div>

          {/* Forward / Back Buttons */}
          <div className="flex items-center gap-1.5">
            {currentStepIndex > 0 && (
              <button
                onClick={handlePrev}
                className="p-1.5 px-2.5 rounded-lg text-xs font-semibold text-neutral-600 bg-white border border-neutral-200 hover:bg-neutral-50 transition-colors cursor-pointer"
              >
                Back
              </button>
            )}

            <button
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 py-1.5 px-3.5 rounded-lg text-xs font-bold bg-neutral-900 hover:bg-neutral-800 text-white shadow-xs transition-all cursor-pointer"
            >
              <span>{currentStep.actionButtonLabel}</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#FF5500]" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
