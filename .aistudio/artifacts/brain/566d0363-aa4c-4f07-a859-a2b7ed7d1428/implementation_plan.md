# Transformed Revenue Operations: In-Situ Process Tour, Calibrated Operational Metrics & Client Pitch

Executive client proposal and practitioner-empowering interactive demonstration for Medicard Philippines revenue, billing, and reconciliation operations.

***

### User Review & Critical Decisions

> [!IMPORTANT]
> **Critical Client-Side Operational Governance (Confirmed)**:
> - **Zero FTE / Headcount Reduction Mention**: Per client feedback, since this platform will be viewed directly by client operations agents and team members, **all references to FTE reduction, headcount cuts, labor optimization, and capacity shrinkage are strictly excluded**.
> - **Focus Exclusively on Operational Excellence**:
>   - **Revenue Velocity & Cash Flow**: `~7–10% DSO reduction` and `~10–15% indicative collections uplift in Year 1`.
>   - **Coverage & Reach**: `~85–90% Day 1 outreach coverage` across due accounts.
>   - **Operational Ease & Quality of Work**: Eliminating repetitive manual re-entry, resolving the triplicate 3-way match, eliminating untracked personal mobile calls, and replacing crashing Excel macros.
>   - **Cycle Time Velocity**: Reducing invoice and reconciliation turnaround from `~3–5 working days` to `same-day / < 1 hour`.
>   - **Scale**: Supporting `970,000+ active healthcare lives` across 7 commercial billing substreams.
> - **In-Situ Spotlight Guided Tour**: An interactive walkthrough that anchors directly to the on-page elements (with spotlight glow and anchored tooltips) and **actively triggers the live simulation steps** so client stakeholders see the actual workflow in motion.
> - **Conservative Indicative Ranges**: All quantitative metrics will be presented with tildes (`~`) and conservative operational ranges.

***

### 1. Overview & Core Concept

#### What It Does
- **Practitioner-Centric Operational Transformation**: Demonstrates how modern automation, AI document ingestion, and direct Microsoft Dynamics NAV 2016 ERP integration elevate day-to-day operations for billing specialists, collections agents, and reconciliation analysts.
- **Root Cause & Context-First Narrative**: Establishes why legacy processes create friction (e.g. performing the exact same 3-way match 3 separate times across disconnected applications) and how the transformed solution empowers teams to focus on customer service and complex exceptions.
- **In-Situ Element-Anchored Process Tour**: A guided tour that moves directly across the application's actual DOM components, explains the operational context, and automatically drives the live simulation steps in real-time.

#### Target Personas & Focus Areas
- **Maria Santos (Senior Billing Specialist & Operations Lead)**: Focuses on eliminating triplicate manual 3-way matching, ensuring contract rate accuracy, and dual-control supervisor validation before NAV 2016 posting.
- **Carlos Reyes (Corporate Collections Specialist)**: Focuses on automated DPD aging triaging, structured omnichannel dunning, eliminating personal mobile phone calls, and tracking corporate Health Fund balances (&lt;50% threshold alerts).
- **Elena Cruz (Senior Reconciliation Analyst)**: Focuses on replacing fragile desktop VBA macros with structured cloud pipelines, achieving `~60–70%` straight-through clearing on tallied entries, and AI vision extraction of BIR 2307 withholding certificates.

***

### 2. User Experience & Visual Design

#### A. Interactive In-Situ Spotlight Tour (`InSituGuidedTour.tsx`)
1. **Element Anchoring**:
   - Calculates target bounding boxes dynamically (`#journey-hero`, `#persona-spotlight`, `#bottleneck-context`, `#stage-step-1`, `#stage-step-2`, `#stage-step-3`, `#stage-step-4`, `#nav-erp-window`, `#architecture`).
   - Renders a floating, anchored tooltip card positioned adjacent to the active element.
   - Highlights the target element with a high-contrast focus ring (`ring-2 ring-[#FF5500] ring-offset-4 ring-offset-neutral-900`) and subtle backdrop dim.
   - Smoothly auto-scrolls the active element into the center of the viewport.

2. **Active Step Driving**:
   - As the tour progresses through the simulation stages, it triggers the real simulation engine in `TransformedJourneysCenterstage`, advancing the live accounting state, populating activity logs, and showing the live NAV 2016 ledger updates.
   - Provides options to "Next Step", "Previous Step", "Run Automation", or "Close Tour".

3. **Stream-Specific Journeys**:
   - Allows stakeholders to select whether to tour **Billing Operations**, **Collections Operations**, or **Reconciliation Operations**.

#### B. Calibrated Operational Metrics (Zero FTE/Headcount References)
- **Billing Stream**:
  - Legacy Batch Handle Time: `~18–25 minutes` per corporate batch
  - Transformed Batch Handle Time: `~2–4 minutes` (automated OCR and rate matching in `~15–30 seconds` plus lead review)
  - Straight-Through Auto-Match Rate: `~85–92%` (remaining `~8–15%` flagged for supervisor exception review)
  - Manual Keying Effort: `~75–85% reduction` in repetitive keystrokes
  - Cycle Time: `~3–5 working days` down to `same-day / < 1 hour`
- **Collections Stream**:
  - Day 1 Customer Reach: `~85–90% coverage` of due accounts on Day 1
  - Annual Collections Uplift: `~10–15% indicative uplift in Year 1`
  - Cash Velocity: `~7–10% DSO reduction`
  - Health Fund Protection: Real-time alerts when enterprise replenishment funds drop below `~50–60% threshold`
- **Reconciliation Stream**:
  - Auto-Clearing Rate: `~60–70% of tallied entries cleared straight through`
  - Variance Research TAT: `~3–5 days` collapsed to `~2–4 hours`
  - Stability: `100% elimination of desktop Excel macro crashes and file corruptions`
- **Portfolio Scale**:
  - Supporting `970,000+ active healthcare lives` across 7 commercial billing streams

#### C. Professional Client Pitch Language
- Authoritative, respectful consulting prose suited for both executive leadership and operational staff.
- Emphasizes **dual-control audit safety**, **system interoperability with NAV 2016**, **exception-based review**, and **eliminating tedious clerical rework**.

***

### 3. Key Product Decisions & Trade-Offs

| Decision | Chosen Approach | Why | Rejected Alternative |
| :--- | :--- | :--- | :--- |
| **Operational Framing** | Strict exclusion of FTE/headcount reduction metrics | The pitch will be viewed by client-side operations agents; framing around FTE cuts creates fear and resistance, whereas framing around DSO, collections uplift, and eliminating tedious clerical rework creates strong practitioner buy-in. | Highlighting headcount reductions (strictly rejected per user instruction). |
| **Tour Interaction** | In-situ floating tooltip anchored to live DOM elements with simulation triggering | Directly responds to user feedback that a static detached popup does not guide through the actual user journey. | Detached central modal popup. |
| **Metric Calibration** | Indicative ranges with tildes (`~`) and benchmark references | Provides defensible, realistic operational targets that build credibility with client leadership. | Single-point absolute figures or exaggerated claims. |

***

### 4. Technical Architecture & Component Mapping

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                            App.tsx (Root State)                              │
├──────────────────────────────────────────────────────────────────────────────┤
│  Top Bar (Header.tsx)           │  - Stream Selector, Operator Badge, Tour CTA│
├─────────────────────────────────┴────────────────────────────────────────────┤
│  JourneyHero.tsx                │  - Operational Metrics (+10-15%, ~7-10% DSO)│
│                                 │  - PersonaSpotlight (Maria, Carlos, Elena)  │
├──────────────────────────────────────────────────────────────────────────────┤
│  AsIsBottleneckHub.tsx          │  - Triplicate 3-Way Match Root Cause Context│
│                                 │  - Operational Ease & Quality of Work Shift │
├──────────────────────────────────────────────────────────────────────────────┤
│  TransformedJourneysCenterstage │  - Interactive Simulation Theater Console   │
│                                 │  - Live Step Execution & NAV 2016 ERP Sync  │
│                                 │  - DOM Target IDs for In-Situ Spotlight Tour│
├─────────────────────────────────┴────────────────────────────────────────────┤
│  InSituGuidedTour.tsx (NEW)                                                  │
│  - Calculates getBoundingClientRect() of live DOM elements                    │
│  - Anchors floating card with dynamic positioning (top/bottom/side)           │
│  - Triggers demoStep in Centerstage to advance live simulation in real time  │
└──────────────────────────────────────────────────────────────────────────────┘
```

#### Step Execution Plan
1. **Purge all FTE & Headcount Reduction Metrics** across `transformedJourneyData.ts`, `personaData.ts`, `JourneyHero.tsx`, `AsIsBottleneckHub.tsx`, and `TransformedJourneysCenterstage.tsx`. Replace with DSO reduction, collections uplift, handle time velocity, and operational ease.
2. **Implement `InSituGuidedTour.tsx`**:
   - Live DOM element bounding calculations, viewport offset adjustment, focus ring outline, and real-time step execution callbacks.
3. **Enhance `TransformedJourneysCenterstage.tsx`**:
   - Add target IDs for each stage (`#stage-step-1`, `#stage-step-2`, `#stage-step-3`, `#stage-step-4`, `#nav-erp-window`, `#architecture`).
   - Expose trigger handlers to allow the tour to drive the simulation.
4. **Update `App.tsx` and `Header.tsx`**:
   - Wire `InSituGuidedTour` into the root layout and link all controls.
5. **Verify Build**:
   - Run `compile_applet` and `lint_applet` together, restart dev server.
