# Transformed User Journey: High-Impact Live Simulation & Sequence Realignment

Re-order and enhance the Transformed User Journey centerstage section to make the user experience remarkably eventful, credible, and visually impactful for Medicard's C-suite executives, featuring split-screen live ERP comparisons and dynamic real-world financial records.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following user preferences were explicitly confirmed in Phase 1 and govern this implementation:
> - **Sequence Order**: The **Interactive Journey Simulation Theater** will be positioned FIRST, followed by the **Technical Solution Mechanics (3-Layer Architecture)**.
> - **Visual Focus**: A **Split-screen live ERP comparison with animated state change** will replace the static console view, showing the exact ledger and document transformations happening in real-time.
> - **Data Fidelity**: **Dynamic realistic customer records with live financial math** (e.g., San Miguel Power ₱14,840,000, Universal Robina ₱4,120,000, Nestle PH ₱8,950,000, BIR 2307 2% Creditable Withholding Tax ₱296,800) to ensure high credibility and business realism.

---

### 1. Overview & Core Concept
- **Objective**: Elevate the Transformed User Journey into an engaging keynote-caliber interactive experience where Medicard executives don't just read about transformation—they trigger it, watch real-time split-screen ERP ledger mutations, inspect BIR 2307 withholding tax math, and experience the dramatic shift from 18+ minutes of manual friction down to 1.2 minutes of autonomous execution.
- **Audience**: Medicard C-Suite (CEO, CFO, Head of Operations, Head of Billing & Collections, AIA Group stakeholders).
- **Core Value**: Direct experiential proof of 10–15% collections uplift, 7–10% DSO reduction, and 40% FTE capacity gain.

---

### 2. User Experience & Visual Design
- **New Section Hierarchy**:
  1. **Centerstage Header & Persona Stream Selector**: Clean segmented control to toggle between **Billing Transformation (3-Way Match & Data Entry)**, **Collections Transformation (DPD Triaging & NLP PTP)**, and **Reconciliation Transformation (Auto-Clear & BIR 2307)**.
  2. **Part 1: "Experience the Transformed Operational Speed" (Simulation Theater)**:
     - **Interactive Timeline**: 4 distinct operational pipeline stages with clear progress indicators.
     - **Live Split-Screen Console**:
       - *Left Column: Intelligent Automation Workstation*: Interactive trigger controls, realistic corporate document view (e.g. San Miguel Power 142 lives invoice, Universal Robina DPD 78 dunning notice, BIR 2307 scanned tax certificate), live status badges, and action triggers.
       - *Right Column: Live NAV 2016 ERP & Ledger Reactor*: Real-time subledger state mutation display showing Document No, Posting Date, Gross Amount, 2% CWT, Net Payable, and Journal Status transitioning from `PENDING / UNMATCHED` to `VALIDATED / POSTED`.
     - **Telemetry & Execution Log**: Timestamped micro-event feed with exact API endpoints (MS Dynamics NAV 2016 Web Services, MS Graph API, Vision OCR pipeline).
     - **Stopwatch & Efficiency Delta**: Real-time timer comparison clock (Manual Legacy vs. Automated To-Be) updating with every step.
  3. **Part 2: "How the Solutions Work" (Technical Architecture & Layer Breakdown)**:
     - 3-Layer enterprise architectural blueprint placed immediately beneath the simulator, explaining *why* the live simulation works:
       - Layer 1: Ingestion & Vision OCR
       - Layer 2: Cognitive Core Automations (3-Way Match, DPD Triager, NLP PTP parser, Macro Replacement)
       - Layer 3: NAV 2016 ERP Sync & Dispatch Gateway
  4. **Part 3: As-Is vs. To-Be Process Comparison & Granular Audit Matrix**:
     - Deep-dive flowchart and tabular breakdown for operational diligence teams.

---

### 3. Key Product Decisions & Trade-Offs
- **Decision 1: Split-Screen Live ERP Comparison**:
  - *Chosen Approach*: Show a split-screen viewport with the client document on the left and the live Microsoft Dynamics NAV 2016 general journal/subledger on the right. When the user clicks "Execute Step", both the document and the ledger rows animate with highlighted cell updates, green reconciliation checks, and live tax math calculations.
  - *Rationale*: Eliminates the "black box" feeling of AI demos. Executives see exactly how their core ERP system of record (NAV 2016) is updated without requiring fragile manual keying.
- **Decision 2: Realistic Financial Data & Tax Calculation**:
  - *Chosen Approach*: Use actual Philippine corporate names (San Miguel Power, Universal Robina Corporation, Nestle Philippines, BDO Unibank) with accurate Philippine tax mechanics (12% VAT, 2% Creditable Withholding Tax BIR Form 2307, EOPT Act compliance).
  - *Rationale*: Immediately resonates with Medicard leadership as authentic Philippine enterprise operations rather than boilerplate templates.

---

### 4. Technical Architecture & Component Hierarchy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        TransformedJourneysCenterstage                  │
├────────────────────────────────────────────────────────────────────────┤
│ 1. Stream Selector Bar (Billing · Collections · Reconciliation)       │
│                                                                        │
│ 2. PART 1: LIVE JOURNEY SIMULATION THEATER                             │
│    ┌──────────────────────────────────┬──────────────────────────────┐ │
│    │ Interactive Workstation Console  │ Live NAV 2016 ERP Reactor    │ │
│    │ - Corporate Account Dossier      │ - Journal Batch: MEDICARD-GEN│ │
│    │ - Document Preview (Transmittal) │ - Sub-ledger Line Mutations  │ │
│    │ - Interactive Stage Triggers     │ - Live CWT / BIR 2307 Math   │ │
│    │ - Live Stopwatch (Manual vs Auto)│ - Real-time Audit Trail Log  │ │
│    └──────────────────────────────────┴──────────────────────────────┘ │
│                                                                        │
│ 3. PART 2: TECHNICAL SOLUTION MECHANICS                                │
│    ┌─────────────────┬───────────────────┬───────────────────────────┐ │
│    │ Layer 1:        │ Layer 2:          │ Layer 3:                  │ │
│    │ Ingestion & OCR │ Cognitive Core    │ NAV 2016 & Dispatch       │ │
│    └─────────────────┴───────────────────┴───────────────────────────┘ │
│                                                                        │
│ 4. PART 3: AS-IS VS TO-BE PROCESS FLOWS & AUDIT MATRIX                 │
└────────────────────────────────────────────────────────────────────────┘
```
