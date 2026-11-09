/**
 * Core type definitions for Medicard Intelligent Revenue & Collections Ecosystem
 */

export type ProcessStream = 'billing' | 'collections' | 'reconciliation';

export type PersonaId = 'billing_expert' | 'collections_agent' | 'recon_specialist';

export interface UserPersona {
  id: PersonaId;
  stream: ProcessStream;
  name: string;
  roleTitle: string;
  department: string;
  avatarInitials: string;
  avatarBg: string;
  dailyFriction: string;
  automatedSuperpower: string;
  keyResponsibilities: string[];
  keyQuote: string;
  primaryDomain: string;
  governanceRole: string;
  metricHighlight: {
    label: string;
    value: string;
    subtext: string;
  };
}

export interface BottleneckDetail {
  id: string;
  stream: ProcessStream;
  title: string;
  badge: string;
  summary: string;
  asIsCycleTime: string;
  toBeCycleTime: string;
  repetitionCount?: string;
  rootCause: string;
  tripleMatchPoints?: {
    step: string;
    actor: string;
    system: string;
    friction: string;
  }[];
  solutionIntervention: string;
  businessImpact: string;
}

export interface MetricCardData {
  label: string;
  value: string;
  unit?: string;
  change?: string;
  description: string;
  category: 'efficiency' | 'revenue' | 'volume' | 'scale';
}

export interface DiagnosticStreamData {
  id: ProcessStream;
  title: string;
  operationalScope?: string;
  monthlyVolume: string;
  keySystems: string[];
  asIsPainPoints: {
    title: string;
    description: string;
    severity: 'critical' | 'high' | 'medium';
  }[];
  toBeCapabilities: {
    title: string;
    description: string;
    impact: string;
  }[];
  primaryImpact: string;
}

export interface UserJourneyStep {
  stepNumber: number;
  domain: string;
  actor: string;
  title: string;
  description: string;
  systemInvolved: string;
  interactionType: 'automated' | 'agent-action' | 'supervisor-approval';
  highlightMetric?: string;
}

export interface UserJourneyStream {
  id: ProcessStream;
  name: string;
  subtitle: string;
  agentRole: string;
  supervisorRole?: string;
  steps: UserJourneyStep[];
}

export interface ProcessComparisonStep {
  id: string;
  stepName: string;
  asIs: {
    actor: string;
    action: string;
    systems: string[];
    painPoint: string;
    duration: string;
  };
  toBe: {
    actor: string;
    action: string;
    technologyModule: string;
    benefit: string;
    duration: string;
  };
}

export interface DetailedProcessSubStream {
  id: string;
  stream: ProcessStream;
  name: string;
  volumeDescription: string;
  asIsCycleTime: string;
  toBeCycleTime: string;
  asIsTouchpoints: number;
  toBeTouchpoints: number;
  steps: ProcessComparisonStep[];
}

export interface InvoiceItem {
  id: string;
  accountName: string;
  stream: string;
  amount: number;
  status: 'pending_match' | 'matched' | 'variance_flagged' | 'posted_nav';
  transmittalAmount: number;
  claimsAmount: number;
  intranetMatch: boolean;
  varianceNote?: string;
}

export interface CollectionAccount {
  id: string;
  clientName: string;
  accountType: 'Corporate' | 'Health Fund' | 'Retail' | 'Cost-Plus';
  balance: number;
  dpd: number;
  dpdBucket: 'Current (T+0)' | '31-60 Days' | '61-90 Days' | '91-180 Days' | '180+ Days';
  riskScore: 'Low' | 'Medium' | 'High';
  lastContact: string;
  status: 'Queued' | 'Dunning Sent' | 'PTP Logged' | 'Settled';
  ptpDate?: string;
  ptpAmount?: number;
}

export interface ReconciliationRecord {
  id: string;
  clientName: string;
  receiptNumber: string;
  bankAmount: number;
  ledgerAmount: number;
  variance: number;
  varianceType: 'Tallied Entry' | '2307 Tax Withholding' | 'Short Pay' | 'Disputed Invoice';
  status: 'auto_cleared' | 'pending_review' | 'resolved';
  scmStatus: 'Queued' | 'Included in SCM';
}
