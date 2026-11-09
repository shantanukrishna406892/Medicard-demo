import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Cpu,
  Layers,
  ChevronRight,
  Play,
  RotateCcw,
  Zap,
  ShieldCheck,
  FileSpreadsheet,
  PhoneCall,
  Database,
  ArrowUpRight,
  Check,
  FileText,
  Mail,
  Send,
  Search,
  Activity,
  Sliders,
  TrendingDown,
  Building,
  UserCheck,
  FileCheck,
  Workflow,
  Network,
  Share2,
  Terminal,
  Server,
  Receipt,
  FileBarChart,
  Eye,
  CheckCheck,
  Percent,
} from 'lucide-react';
import { DETAILED_SUBSTREAMS } from '../data/transformedJourneyData';
import { ProcessStream, DetailedProcessSubStream, PersonaId } from '../types';
import { USER_PERSONAS } from '../data/personaData';

// Simple, clear, and realistic corporate examples
interface SimpleCorporateExample {
  clientName: string;
  shortTag: string;
  policyNo: string;
  livesCovered: number;
  invoiceNo: string;
  totalInvoice: number; // e.g. ₱5,000,000
  taxWithheld: number;  // 2% BIR 2307 = ₱100,000
  netPayment: number;   // ₱4,900,000
  statusTag: string;
  // Step-by-step clear operational narrative
  step1: { title: string; subtitle: string; actionText: string; resultText: string; log: string };
  step2: { title: string; subtitle: string; actionText: string; resultText: string; log: string };
  step3: { title: string; subtitle: string; actionText: string; resultText: string; log: string };
  step4: { title: string; subtitle: string; actionText: string; resultText: string; log: string };
}

const STREAM_EXAMPLES: Record<ProcessStream, SimpleCorporateExample> = {
  billing: {
    clientName: 'San Miguel Global Power',
    shortTag: 'Enterprise Corporate Client',
    policyNo: 'POL-2026-8812',
    livesCovered: 142,
    invoiceNo: 'INV-2026-9041',
    totalInvoice: 5000000,
    taxWithheld: 100000,
    netPayment: 4900000,
    statusTag: 'Ready for Monthly Invoicing',
    step1: {
      title: '1. Ingest Document',
      subtitle: 'Upload client enrollment list',
      actionText: 'Client sends 142-member enrollment list (PDF)',
      resultText: 'AI extracts member rosters and tier classifications with automated OCR confidence scoring, reducing manual keying by over 85%.',
      log: 'Parsed San Miguel enrollment list (142 members). Field confidence score: 94.6% straight-through; 2 edge cases flagged for agent validation.',
    },
    step2: {
      title: '2. Check Rates',
      subtitle: 'Match rates against contract',
      actionText: 'System cross-checks 142 members against approved plan rates',
      resultText: '139 member lines matched approved contract schedules; 3 additions validated against standard tier rates for ₱5,000,000 total.',
      log: '3-Way Match complete: 139 matched directly, 3 additions validated. Batch reconciled with contract rate tables at 95.8% straight-through.',
    },
    step3: {
      title: '3. Manager Review',
      subtitle: '1-click billing approval',
      actionText: 'Billing Lead reviews pre-checked invoice summary',
      resultText: 'Approved by Billing Lead. Auto-populates line items directly into NAV general journal draft without retyping.',
      log: 'Billing Lead approved ₱5.0M batch. Draft staged for Dynamics NAV 2016 posting.',
    },
    step4: {
      title: '4. Send Invoice',
      subtitle: 'Post to NAV ERP & email client',
      actionText: 'System posts invoice into Navision and emails client Treasury',
      resultText: 'Invoice #INV-2026-9041 posted to NAV ERP and dispatched with delivery tracking in ~2.5 minutes total cycle time.',
      log: 'Posted to Dynamics NAV 2016. Invoice emailed to client Treasury with delivery receipt tracking.',
    },
  },
  collections: {
    clientName: 'Universal Robina Corp (URC)',
    shortTag: 'Commercial Debtor Account',
    policyNo: 'POL-2025-4421',
    livesCovered: 320,
    invoiceNo: 'INV-2025-7814',
    totalInvoice: 2500000,
    taxWithheld: 50000,
    netPayment: 2450000,
    statusTag: 'Overdue (45 Days Past Due)',
    step1: {
      title: '1. Detect Overdue',
      subtitle: 'Identify unpaid accounts',
      actionText: 'System flags ₱2,500,000 overdue at 45 days past due',
      resultText: 'System syncs AR aging directly from NAV 2016, prioritizing accounts overdue by aging bucket and balance weight.',
      log: 'NAV 2016 sync: Flagged URC account (₱2.5M, 45 DPD overdue). Added to prioritized dunning queue.',
    },
    step2: {
      title: '2. Send Reminder',
      subtitle: 'Multi-channel dunning',
      actionText: 'System sends branded payment reminder email and SMS',
      resultText: 'Personalized statement of account and secure payment link dispatched via verified email & SMS channels (~88% Day 1 reach).',
      log: 'Dispatched automated payment reminder and current SOA via verified email & SMS channels to URC Finance.',
    },
    step3: {
      title: '3. Capture Promise',
      subtitle: 'Read client email reply',
      actionText: 'Client replies: "We will release check next Friday"',
      resultText: 'Natural Language parser extracts payment commitment date, updates collector CRM notes, and schedules automated follow-up.',
      log: 'Client reply parsed: Promise to Pay captured for next Friday. Automated reminder scheduled.',
    },
    step4: {
      title: '4. Clear & Update',
      subtitle: 'Payment received & ledger reset',
      actionText: 'Bank confirms deposit of ₱2,450,000 (net of 2% tax)',
      resultText: 'Payment matched in lockbox; unapplied AR balance cleared in Dynamics NAV and DPD counter reset to 0.',
      log: 'Deposit confirmed in lockbox. NAV unapplied AR cleared. Overdue counter reset to 0.',
    },
  },
  reconciliation: {
    clientName: 'Nestlé Philippines Inc.',
    shortTag: 'Large Corporate Account',
    policyNo: 'POL-2026-1190',
    livesCovered: 580,
    invoiceNo: 'INV-2026-3392',
    totalInvoice: 4000000,
    taxWithheld: 80000,
    netPayment: 3920000,
    statusTag: 'Daily Bank Settlement',
    step1: {
      title: '1. Read Bank Feed',
      subtitle: 'Pull daily deposit receipts',
      actionText: 'System downloads daily bank deposit of ₱3,920,000',
      resultText: 'Replaces crash-prone desktop Excel VBA macros with structured cloud bank feed parsing and scheduled ingestion.',
      log: 'Downloaded bank deposit record (₱3,920,000 from Nestlé via Metrobank lockbox feed).',
    },
    step2: {
      title: '2. Match Invoice',
      subtitle: 'Link payment to billing record',
      actionText: 'System matches bank deposit against Invoice #INV-2026-3392 (₱4,000,000)',
      resultText: 'Deposit matches invoice reference. Automatically calculates standard ₱80,000 (2%) BIR 2307 withholding difference.',
      log: 'Matched bank deposit to invoice. Difference: exactly 2% BIR 2307 Creditable Withholding Tax.',
    },
    step3: {
      title: '3. Verify Tax Slip',
      subtitle: 'Read BIR 2307 tax certificate',
      actionText: 'AI reads client BIR 2307 tax certificate for ₱80,000',
      resultText: '₱3.92M bank deposit + ₱80k BIR 2307 CWT slip fully reconciles ₱4.0M invoice balance with verified tax compliance.',
      log: 'BIR Form 2307 verified: 2% Creditable Withholding Tax (₱80,000) matched to customer TIN and invoice reference.',
    },
    step4: {
      title: '4. Close Books',
      subtitle: 'Post settlement in NAV ERP',
      actionText: 'System creates settlement journal entry in NAV 2016',
      resultText: 'General journal entry generated in NAV 2016 and daily clearing report compiled with complete timestamped audit trail.',
      log: 'NAV 2016 general journal posted. Daily reconciliation report archived with full audit log.',
    },
  },
};

interface TransformedJourneysCenterstageProps {
  controlledStream?: ProcessStream;
  onStreamChange?: (stream: ProcessStream) => void;
  activePersonaId?: PersonaId;
  controlledStepTrigger?: number | null;
}

export const TransformedJourneysCenterstage: React.FC<TransformedJourneysCenterstageProps> = ({
  controlledStream,
  onStreamChange,
  activePersonaId = 'billing_expert',
  controlledStepTrigger,
}) => {
  const [internalStream, setInternalStream] = useState<ProcessStream>('billing');
  const activeStream = controlledStream ?? internalStream;
  const currentPersona = USER_PERSONAS[activePersonaId] || USER_PERSONAS.billing_expert;

  const availableSubStreams = DETAILED_SUBSTREAMS.filter((s) => s.stream === activeStream);
  const [selectedSubStreamId, setSelectedSubStreamId] = useState<string>(
    availableSubStreams[0]?.id || DETAILED_SUBSTREAMS[0].id
  );

  const [activeArchLayer, setActiveArchLayer] = useState<1 | 2 | 3>(2);
  const [viewMode, setViewMode] = useState<'overview' | 'flowcharts' | 'matrix'>('overview');

  const [demoStep, setDemoStep] = useState<number>(0);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);
  const [liveStopwatchSeconds, setLiveStopwatchSeconds] = useState<number>(0);

  const activeCase = STREAM_EXAMPLES[activeStream];

  // Watch for external step triggers from the in-situ guided tour
  useEffect(() => {
    if (controlledStepTrigger !== undefined && controlledStepTrigger !== null) {
      setViewMode('overview');
      if (controlledStepTrigger >= 0 && controlledStepTrigger < 4) {
        const stepNum = controlledStepTrigger + 1;
        const stepKey = `step${stepNum}` as 'step1' | 'step2' | 'step3' | 'step4';
        const stepData = activeCase[stepKey];
        setExecutionLogs((prev) => {
          const entry = `Stage 0${stepNum}: ${stepData.log}`;
          if (prev.includes(entry)) return prev;
          return [...prev, entry];
        });
        setDemoStep(stepNum);
      }
    }
  }, [controlledStepTrigger, activeCase]);

  useEffect(() => {
    let interval: any = null;
    if (isExecuting) {
      interval = setInterval(() => {
        setLiveStopwatchSeconds((s) => s + 1);
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isExecuting]);

  // Sync sub-stream and reset simulation when activeStream changes from props
  useEffect(() => {
    const firstSub = DETAILED_SUBSTREAMS.find((s) => s.stream === activeStream);
    if (firstSub) {
      setSelectedSubStreamId(firstSub.id);
    }
    setDemoStep(0);
    setExecutionLogs([]);
    setLiveStopwatchSeconds(0);
  }, [activeStream]);

  const handleStreamChange = (stream: ProcessStream) => {
    setInternalStream(stream);
    onStreamChange?.(stream);
    const firstSub = DETAILED_SUBSTREAMS.find((s) => s.stream === stream);
    if (firstSub) {
      setSelectedSubStreamId(firstSub.id);
    }
    setDemoStep(0);
    setExecutionLogs([]);
    setLiveStopwatchSeconds(0);
  };

  const handleSubStreamChange = (id: string) => {
    setSelectedSubStreamId(id);
    setDemoStep(0);
    setExecutionLogs([]);
    setLiveStopwatchSeconds(0);
  };

  const currentSubStream: DetailedProcessSubStream =
    DETAILED_SUBSTREAMS.find((s) => s.id === selectedSubStreamId) ||
    availableSubStreams[0] ||
    DETAILED_SUBSTREAMS[0];

  const handleResetSimulation = () => {
    setDemoStep(0);
    setLiveStopwatchSeconds(0);
    setIsExecuting(false);
  };

  const handleJumpToStep = (targetStep: number) => {
    setDemoStep(targetStep);
  };

  const runSimulationAction = () => {
    setIsExecuting(true);

    const stepKey = `step${demoStep + 1}` as 'step1' | 'step2' | 'step3' | 'step4';
    const currentStepData = activeCase[stepKey];

    setTimeout(() => {
      setExecutionLogs((prev) => [
        ...prev,
        `Stage 0${demoStep + 1}: ${currentStepData.log}`,
      ]);
      setDemoStep((prev) => prev + 1);
      setIsExecuting(false);
    }, 700);
  };

  const handleAutoRun = () => {
    if (isExecuting || demoStep >= 4) return;
    setIsExecuting(true);
    let current = demoStep;
    const timer = setInterval(() => {
      if (current >= 4) {
        clearInterval(timer);
        setIsExecuting(false);
        return;
      }
      const stepKey = `step${current + 1}` as 'step1' | 'step2' | 'step3' | 'step4';
      const stepData = activeCase[stepKey];
      setExecutionLogs((prev) => [...prev, `Stage 0${current + 1}: ${stepData.log}`]);
      current += 1;
      setDemoStep(current);
      if (current >= 4) {
        clearInterval(timer);
        setIsExecuting(false);
      }
    }, 850);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(val);
  };

  const currentStepInfo =
    demoStep === 0
      ? activeCase.step1
      : demoStep === 1
      ? activeCase.step2
      : demoStep === 2
      ? activeCase.step3
      : activeCase.step4;

  return (
    <section
      id="centerstage-journeys"
      className="py-10 md:py-14 bg-white border-t border-neutral-200/80 scroll-mt-14"
    >
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-12">
        {/* PROCESS SWITCHER & VIEW MODES */}
        <div className="mb-6 flex flex-col xl:flex-row xl:items-center justify-between gap-4 p-4 rounded-2xl bg-neutral-50 border border-neutral-200/90 shadow-sm">
          {/* Left: Stream Selector */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 pr-3 border-r border-neutral-200 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5500] animate-pulse" />
              <span className="font-display font-bold text-neutral-900 text-sm sm:text-base tracking-tight">
                Transformed Journeys
              </span>
            </div>

            <div className="flex items-center gap-1 p-1 bg-white rounded-xl border border-neutral-200 text-xs">
              <button
                onClick={() => handleStreamChange('billing')}
                className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeStream === 'billing'
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                1. Billing (3-Way Match)
              </button>
              <button
                onClick={() => handleStreamChange('collections')}
                className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeStream === 'collections'
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                2. Collections (Automated Dunning)
              </button>
              <button
                onClick={() => handleStreamChange('reconciliation')}
                className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeStream === 'reconciliation'
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                3. Reconciliation (Auto-Clearing)
              </button>
            </div>
          </div>

          {/* Right: Sub-stream Context & View Mode Switcher */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1 p-1 bg-white rounded-xl border border-neutral-200 text-xs">
              <button
                onClick={() => setViewMode('overview')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  viewMode === 'overview'
                    ? 'bg-[#FF5500] text-white shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Live Interactive Simulation
              </button>
              <button
                onClick={() => setViewMode('flowcharts')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
                  viewMode === 'flowcharts'
                    ? 'bg-neutral-900 text-white'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                As-Is vs To-Be Comparison
              </button>
              <button
                onClick={() => setViewMode('matrix')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
                  viewMode === 'matrix'
                    ? 'bg-neutral-900 text-white'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Audit Matrix
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* VIEW 1: LIVE INTERACTIVE SIMULATOR (SIMPLE, CLEAR, ZERO COMPLEXITY)      */}
        {/* ========================================================================= */}
        {viewMode === 'overview' && (
          <div className="space-y-10">
            {/* The Simulation Theater Card */}
            <div id="simulation-console" className="p-5 sm:p-7 rounded-3xl bg-[#090A0D] text-white shadow-2xl border border-neutral-800/90 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[550px] h-[300px] bg-gradient-to-b from-[#FF5500]/15 via-[#FF5500]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

              {/* Top Banner: Example Overview */}
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-3 border-b border-neutral-800/90">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#FF5500]/20 flex items-center justify-center text-[#FF5500] font-bold text-sm">
                    {activeStream === 'billing' ? '01' : activeStream === 'collections' ? '02' : '03'}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                      Simulation: {activeCase.clientName}
                    </h3>
                    <p className="text-xs text-neutral-400">
                      {activeCase.shortTag} · Policy #{activeCase.policyNo} ({activeCase.livesCovered} members)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                    {activeCase.statusTag}
                  </span>
                  <button
                    onClick={handleAutoRun}
                    disabled={isExecuting || demoStep >= 4}
                    className="p-1.5 px-3 rounded-lg bg-[#FF5500]/20 border border-[#FF5500]/40 hover:bg-[#FF5500]/30 text-[#FF5500] hover:text-white transition-all cursor-pointer text-xs flex items-center gap-1.5 font-bold disabled:opacity-40"
                    title="Auto run all 4 steps"
                  >
                    <Play className="w-3.5 h-3.5 fill-[#FF5500]" />
                    <span>Auto Run</span>
                  </button>
                  <button
                    onClick={handleResetSimulation}
                    className="p-1.5 px-2.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-all cursor-pointer text-xs flex items-center gap-1.5"
                    title="Start Over"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                </div>
              </div>

              {/* Persona Perspective Ribbon */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 p-3 mb-4 rounded-xl bg-neutral-900/80 border border-neutral-800 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className={`w-6 h-6 rounded-md ${currentPersona.avatarBg} text-white flex items-center justify-center font-bold text-[10px]`}>
                    {currentPersona.avatarInitials}
                  </div>
                  <div>
                    <span className="text-neutral-400 font-mono">Active Operator:</span>{' '}
                    <span className="text-white font-bold">{currentPersona.name}</span>{' '}
                    <span className="text-neutral-500 font-normal">({currentPersona.roleTitle})</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-neutral-400">
                    <span>Governance:</span>
                    <span className="text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                      {currentPersona.governanceRole}
                    </span>
                  </div>
                </div>
              </div>

              {/* 4 Connected Pipeline Stages with Domain Swimlanes */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-5">
                {[
                  {
                    num: 1,
                    domain: activeStream === 'billing' ? 'Billing Agent Domain' : activeStream === 'collections' ? 'NAV Ingestion' : 'Lockbox Feed',
                    ...activeCase.step1,
                  },
                  {
                    num: 2,
                    domain: activeStream === 'billing' ? 'Agent + Auto 3-Way Match' : activeStream === 'collections' ? 'Omnichannel Dunning' : '65%+ Auto Clearing',
                    ...activeCase.step2,
                  },
                  {
                    num: 3,
                    domain: activeStream === 'billing' ? 'Billing Supervisor Gate' : activeStream === 'collections' ? 'Agent PTP Capture' : 'Agent 2307 Tax Audit',
                    ...activeCase.step3,
                  },
                  {
                    num: 4,
                    domain: activeStream === 'billing' ? 'NAV Sync & Client Email' : activeStream === 'collections' ? 'NAV Ledger Reset' : 'SCM Report & NAV Close',
                    ...activeCase.step4,
                  },
                ].map((st) => {
                  const isCurrent = demoStep === st.num - 1;
                  const isPassed = demoStep >= st.num;
                  return (
                    <div
                      key={st.num}
                      id={`stage-step-${st.num}`}
                      onClick={() => handleJumpToStep(st.num - 1)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-neutral-900 border-[#FF5500] ring-1 ring-[#FF5500]/30 shadow-xs'
                          : isPassed
                          ? 'bg-neutral-900/60 border-emerald-800/60 hover:border-emerald-700'
                          : 'bg-neutral-900/30 border-neutral-800/80 opacity-60 hover:opacity-90'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className={`text-[10px] font-mono font-bold ${
                            isCurrent
                              ? 'text-[#FF5500]'
                              : isPassed
                              ? 'text-emerald-400'
                              : 'text-neutral-500'
                          }`}
                        >
                          Step 0{st.num}
                        </span>
                        {isPassed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                      </div>
                      <div className="text-[10px] font-mono text-neutral-400 mb-0.5 truncate uppercase">
                        {st.domain}
                      </div>
                      <div className="text-xs font-bold text-white truncate">{st.title}</div>
                      <div className="text-[11px] text-neutral-400 truncate mt-0.5">{st.subtitle}</div>
                    </div>
                  );
                })}
              </div>

              {/* Split-Screen Console: What Happens (Left) vs System State (Right) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4">
                {/* Left: What is happening in plain English */}
                <div className="lg:col-span-7 p-4 sm:p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-2 mb-3 border-b border-neutral-800">
                      <span className="text-xs font-bold text-neutral-200">
                        Operational Step {Math.min(demoStep + 1, 4)} of 4
                      </span>
                      <span className="text-xs font-mono text-[#FF5500] font-semibold">
                        {demoStep >= 4 ? 'COMPLETED' : 'IN PROGRESS'}
                      </span>
                    </div>

                    {/* Simple Big Metric Strip */}
                    <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-xs font-mono mb-4">
                      <div>
                        <span className="text-[10px] text-neutral-500 block uppercase">Invoice Total</span>
                        <span className="text-sm font-bold text-white">
                          {formatCurrency(activeCase.totalInvoice)}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-neutral-500 block uppercase">2% Tax Withheld</span>
                        <span className="text-sm font-bold text-amber-400">
                          -{formatCurrency(activeCase.taxWithheld)}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-neutral-500 block uppercase">Net Amount Due</span>
                        <span className="text-sm font-bold text-emerald-400">
                          {formatCurrency(activeCase.netPayment)}
                        </span>
                      </div>
                    </div>

                    {/* Step Explanation in Plain English */}
                    <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 text-xs mb-4">
                      <div className="text-[10px] uppercase font-mono text-neutral-400 mb-1">
                        Current Action:
                      </div>
                      <div className="text-sm font-bold text-white mb-2">
                        {currentStepInfo.actionText}
                      </div>
                      <div className="text-xs text-emerald-400 leading-relaxed font-medium bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-900/50">
                        <strong>Outcome:</strong> {currentStepInfo.resultText}
                      </div>
                    </div>
                  </div>

                  {/* Big Clickable Action Button */}
                  <div>
                    <div className="flex items-center gap-2">
                      <button
                        disabled={isExecuting || demoStep >= 4}
                        onClick={runSimulationAction}
                        className="flex-1 py-3.5 px-5 rounded-xl font-semibold text-sm text-white bg-[#FF5500] hover:bg-[#FF4500] disabled:bg-neutral-800 disabled:text-neutral-500 transition-all shadow-md shadow-[#FF5500]/25 flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.99]"
                      >
                        {isExecuting ? (
                          <>
                            <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Running Automation...</span>
                          </>
                        ) : demoStep >= 4 ? (
                          <>
                            <CheckCheck className="w-4 h-4 text-emerald-400" />
                            <span>Journey Complete (All 4 Steps Done)</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5 fill-white" />
                            <span>Execute Step {demoStep + 1}: {currentStepInfo.title}</span>
                          </>
                        )}
                      </button>

                      {demoStep < 4 && (
                        <button
                          disabled={isExecuting}
                          onClick={handleAutoRun}
                          className="py-3.5 px-4 rounded-xl font-semibold text-xs text-white bg-neutral-800 hover:bg-neutral-700 disabled:opacity-50 transition-all border border-neutral-700 flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                          title="Run all steps automatically"
                        >
                          <Zap className="w-3.5 h-3.5 text-[#FF5500] fill-[#FF5500]" />
                          <span>Auto Run</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Live Accounting Record (NAV 2016) */}
                <div id="nav-erp-window" className="lg:col-span-5 p-4 sm:p-5 rounded-2xl bg-[#060608] border border-neutral-800 flex flex-col justify-between font-mono text-xs">
                  <div>
                    <div className="flex items-center justify-between pb-2 mb-3 border-b border-neutral-800">
                      <div className="flex items-center gap-2">
                        <Server className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-xs font-semibold text-neutral-200">
                          Accounting Record (NAV 2016)
                        </span>
                      </div>
                      <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Live Sync
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2.5 mb-3 text-xs">
                      <div className="flex items-center justify-between pb-1.5 border-b border-neutral-800 text-[11px]">
                        <span className="text-neutral-400">Invoice Reference:</span>
                        <span className="text-white font-bold">{activeCase.invoiceNo}</span>
                      </div>

                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-neutral-400">HMO Premium Due:</span>
                        <span className={demoStep >= 2 ? 'text-emerald-400 font-bold' : 'text-neutral-500'}>
                          {demoStep >= 2 ? formatCurrency(activeCase.totalInvoice) : 'Awaiting Match'}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-neutral-400">2% BIR Withholding:</span>
                        <span className={demoStep >= 3 ? 'text-amber-400 font-bold' : 'text-neutral-500'}>
                          {demoStep >= 3 ? `-${formatCurrency(activeCase.taxWithheld)}` : 'Pending Certificate'}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[11px] pt-1.5 border-t border-neutral-900">
                        <span className="text-neutral-400">Record Status:</span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            demoStep >= 4
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                              : demoStep >= 2
                              ? 'bg-blue-950 text-blue-400 border border-blue-800'
                              : 'bg-neutral-800 text-neutral-400'
                          }`}
                        >
                          {demoStep >= 4 ? 'POSTED & DELIVERED' : demoStep >= 2 ? 'VERIFIED' : 'PENDING'}
                        </span>
                      </div>
                    </div>

                    {/* Step History Log */}
                    <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                      <div className="text-[10px] uppercase font-mono text-neutral-400 pb-1 mb-1 border-b border-neutral-800">
                        Activity Log:
                      </div>
                      <div className="space-y-1.5 text-[11px] min-h-[90px] max-h-[110px] overflow-y-auto scrollbar-none font-sans">
                        {executionLogs.length === 0 ? (
                          <div className="text-neutral-600 italic py-3 text-center text-xs">
                            Click &quot;Click to Execute Step 1&quot; to begin...
                          </div>
                        ) : (
                          executionLogs.map((log, lIdx) => (
                            <div key={lIdx} className="text-neutral-300 flex items-start gap-1.5 leading-snug">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{log}</span>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 mt-2 border-t border-neutral-800 text-[10px] text-neutral-500 text-center font-mono">
                    ~85% straight-through automation · End-to-end digital audit trail
                  </div>
                </div>
              </div>

              {/* Bottom 3 Simple Impact Badges */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 border-t border-neutral-800">
                <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-neutral-400 uppercase font-mono block">
                      Review Time per Batch
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-bold text-neutral-500 line-through">~18–25 mins</span>
                      <span className="text-base font-bold text-emerald-400">~2–4 mins</span>
                    </div>
                  </div>
                  <Clock className="w-5 h-5 text-[#FF5500] shrink-0" />
                </div>

                <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-neutral-400 uppercase font-mono block">
                      Manual Keying Reduction
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-bold text-neutral-500 line-through">142 rows manual</span>
                      <span className="text-base font-bold text-white">~75–85% automated</span>
                    </div>
                  </div>
                  <UserCheck className="w-5 h-5 text-neutral-400 shrink-0" />
                </div>

                <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-neutral-400 uppercase font-mono block">
                      Straight-Through Rate
                    </span>
                    <div className="text-base font-bold text-white">~88–94% Match</div>
                  </div>
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                </div>
              </div>
            </div>

            {/* Technical Solution Mechanics Section */}
            <div id="architecture-section" className="scroll-mt-20">
              <div id="architecture" className="p-6 sm:p-8 rounded-3xl bg-[#FBFBFD] border border-neutral-200/90 shadow-sm">
              <div className="max-w-3xl mb-6">
                <div className="flex items-center gap-2 mb-1.5">
                  <Workflow className="w-4 h-4 text-[#FF5500]" />
                  <span className="text-xs font-mono font-semibold text-[#FF5500] uppercase tracking-wider">
                    How It Works
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-neutral-900 tracking-tight">
                  The 3-Layer Automation Engine
                </h3>
                <p className="text-neutral-600 text-xs sm:text-sm mt-1.5 leading-relaxed">
                  Straive integrates directly with your existing Microsoft Dynamics NAV 2016 accounting system across three coordinated layers:
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
                <div
                  onClick={() => setActiveArchLayer(1)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    activeArchLayer === 1
                      ? 'bg-white border-[#FF5500] ring-1 ring-[#FF5500]/20 shadow-sm'
                      : 'bg-white/80 border-neutral-200 hover:bg-white hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-2.5">
                    <span className="font-mono font-bold text-[#FF5500]">LAYER 01</span>
                    <span className="text-neutral-400 font-mono text-[11px]">Ingestion</span>
                  </div>
                  <h4 className="text-sm font-bold text-neutral-900 mb-1.5">
                    Digital Document Ingestion
                  </h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    AI automatically reads PDF member lists, hospital billing statements, and daily bank lockbox files. No manual data typing.
                  </p>
                </div>

                <div
                  onClick={() => setActiveArchLayer(2)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    activeArchLayer === 2
                      ? 'bg-white border-[#FF5500] ring-1 ring-[#FF5500]/20 shadow-sm'
                      : 'bg-white/80 border-neutral-200 hover:bg-white hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-2.5">
                    <span className="font-mono font-bold text-[#FF5500]">LAYER 02</span>
                    <span className="text-neutral-400 font-mono text-[11px]">Matching</span>
                  </div>
                  <h4 className="text-sm font-bold text-neutral-900 mb-1.5">
                    Automated Business Rules
                  </h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Automatically cross-checks member plans, calculates the 2% withholding tax, and flags any billing discrepancies instantly.
                  </p>
                </div>

                <div
                  onClick={() => setActiveArchLayer(3)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    activeArchLayer === 3
                      ? 'bg-white border-[#FF5500] ring-1 ring-[#FF5500]/20 shadow-sm'
                      : 'bg-white/80 border-neutral-200 hover:bg-white hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-2.5">
                    <span className="font-mono font-bold text-[#FF5500]">LAYER 03</span>
                    <span className="text-neutral-400 font-mono text-[11px]">Posting</span>
                  </div>
                  <h4 className="text-sm font-bold text-neutral-900 mb-1.5">
                    Direct NAV 2016 Sync & Dispatch
                  </h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Manager signs off in 1 click. The system posts verified entries into Dynamics NAV and emails clean PDF invoices to clients.
                  </p>
                </div>
              </div>
            </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: AS-IS VS TO-BE PROCESS FLOWCHART COMPARATOR */}
        {/* ========================================================================= */}
        {viewMode === 'flowcharts' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
              <div>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-neutral-900">
                  {currentSubStream.name}: Process Comparison
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  How operations work today (As-Is) versus the transformed automated workflow (To-Be).
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-semibold">
                <span className="flex items-center gap-1.5 text-rose-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Current Manual Friction
                </span>
                <span className="flex items-center gap-1.5 text-emerald-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Automated Solution
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {currentSubStream.steps.map((step, idx) => (
                <div
                  key={step.id}
                  className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200/80 hover:border-neutral-300 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2.5 mb-3 border-b border-neutral-200">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-neutral-900 text-white text-xs font-mono font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-neutral-900">{step.stepName}</h4>
                    </div>

                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-neutral-400 font-mono line-through">
                        Today: {step.asIs.duration}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-neutral-300" />
                      <span className="text-emerald-700 font-mono font-bold">
                        With Straive: {step.toBe.duration}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-3.5 rounded-xl bg-white border border-rose-200/70">
                      <div className="flex items-center justify-between text-rose-700 font-bold mb-1">
                        <span className="uppercase text-[10px] tracking-wider">
                          Today&apos;s Manual Method ({step.asIs.actor})
                        </span>
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                      </div>
                      <p className="text-neutral-700 leading-relaxed mb-2 text-xs">{step.asIs.action}</p>
                      <div className="p-2 rounded-lg bg-rose-50 text-rose-900 border border-rose-100 text-[11px] leading-relaxed">
                        <strong>Pain Point:</strong> {step.asIs.painPoint}
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200">
                      <div className="flex items-center justify-between text-emerald-800 font-bold mb-1">
                        <span className="uppercase text-[10px] tracking-wider">
                          Transformed Automated Method
                        </span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      </div>
                      <p className="text-neutral-900 font-medium leading-relaxed mb-2 text-xs">
                        {step.toBe.action}
                      </p>
                      <div className="p-2 rounded-lg bg-emerald-100/70 text-emerald-950 text-[11px] font-semibold leading-relaxed">
                        <strong>Benefit:</strong> {step.toBe.benefit}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 3: DETAILED AUDIT STEP MATRIX */}
        {/* ========================================================================= */}
        {viewMode === 'matrix' && (
          <div className="rounded-3xl border border-neutral-200 overflow-hidden bg-white shadow-sm">
            <div className="p-5 bg-neutral-50 border-b border-neutral-200 flex items-center justify-between">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-neutral-900">
                  Detailed Operational Matrix
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Full breakdown of manual tasks replaced, time saved, and governance controls.
                </p>
              </div>
              <span className="text-xs font-mono text-neutral-400">
                {currentSubStream.steps.length} Documented Steps
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-100/70 text-neutral-500 uppercase font-mono border-b border-neutral-200">
                  <tr>
                    <th className="py-3 px-5">Operational Step</th>
                    <th className="py-3 px-5">Manual Pain Point Today</th>
                    <th className="py-3 px-5">Automated Solution</th>
                    <th className="py-3 px-5 text-right">Time Saved</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 bg-white">
                  {currentSubStream.steps.map((st) => (
                    <tr key={st.id} className="hover:bg-neutral-50 transition-colors">
                      <td className="py-3.5 px-5 font-bold text-neutral-900 whitespace-nowrap">
                        {st.stepName}
                      </td>
                      <td className="py-3.5 px-5 text-neutral-600 max-w-sm">
                        <div className="font-semibold text-neutral-900 mb-0.5">{st.asIs.actor}</div>
                        <p className="line-clamp-2 leading-relaxed">{st.asIs.painPoint}</p>
                      </td>
                      <td className="py-3.5 px-5 text-neutral-900 max-w-md">
                        <div className="font-semibold text-emerald-800 mb-0.5">
                          {st.toBe.technologyModule}
                        </div>
                        <p className="text-neutral-700 line-clamp-2 leading-relaxed">{st.toBe.benefit}</p>
                      </td>
                      <td className="py-3.5 px-5 text-right whitespace-nowrap font-mono tabular-nums">
                        <span className="text-neutral-400 line-through block text-[11px]">
                          {st.asIs.duration}
                        </span>
                        <span className="text-emerald-600 font-bold">{st.toBe.duration}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
