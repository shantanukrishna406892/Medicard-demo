# Streamlined Page Architecture & Docked Floating Process Tour

Refining the application structure to present an immediate, high-impact transformed journey, re-architecting the guided tour into a reliable docked floating control bar, and ensuring a crisp, executive-grade client presentation.

***

### User Review & Critical Decisions

> [!IMPORTANT]
> The user confirmed the following decisions during Phase 1 clarification:
> - **Section Re-Ordering**: Move the "Operational Friction: As-Is Bottlenecks vs To-Be Automation" section to the **very end of the page as an optional deep dive** right before the footer. This puts the **Live Simulation Theater centerstage** immediately below the Hero and Persona Spotlight, keeping the client's first impression crisp, action-oriented, and modern.
> - **Docked Floating Control Bar for Guided Tour**: Replace fragile absolute coordinate tooltips with a sleek, viewport-docked floating control bar (fixed at the bottom-center of the screen). This eliminates positioning clipping, mobile/viewport glitches, and scroll desynchronization, while maintaining an active spotlight glow on the referenced live element and automatically scrolling it into focus.
> - **6 Detailed Steps per Process Stream**: Curate 6 high-value steps covering the practitioner persona, root-cause friction, and the 4 live operational simulation stages with real-time step execution in Microsoft Dynamics NAV 2016.
> - **Zero FTE / Headcount Reduction Mention**: Re-affirm the strict exclusion of all FTE or headcount metrics, focusing entirely on DSO reduction, collections uplift, cycle time compression, and eliminating tedious clerical duplication.

***

### 1. Overview & Core Concept

#### What It Does
- **Crisp Client Flow**:
  1. **Header & Navigation Ribbon**: Stream selector, active operator badge, and "Guided Tour" trigger.
  2. **Journey Hero & Persona Spotlight**: Value metrics (`~10–15% uplift`, `~7–10% DSO`), executive overview, and interactive persona switcher (Maria Santos, Carlos Reyes, Elena Cruz).
  3. **Transformed Journeys Centerstage**: Immediate interactive simulation theater showing split-screen execution (San Miguel ₱5.0M, URC ₱2.5M, Nestlé ₱4.0M) and live NAV 2016 ERP synchronization, followed directly by the 3-Layer Solution Mechanics.
  4. **Optional As-Is Bottlenecks Deep Dive**: Positioned cleanly at the end of the page for stakeholders who want to inspect the triplicate 3-way match, unmonitored outreach, and macro instability in detail.
  5. **Footer**: Clean copyright and corporate attribution.

- **Docked Floating Guided Tour**:
  - Anchors cleanly at the bottom-center of the viewport (`fixed bottom-6 left-1/2 -translate-x-1/2 z-50`).
  - Highlights the target element on the page with a high-contrast glowing spotlight ring.
  - Features real-time simulation execution: clicking "Run Step" or "Next" actually triggers the live step in the simulation theater and updates the NAV 2016 general ledger panel.

***

### 2. User Experience & Visual Design

#### A. Page Layout Re-Ordering
- **Before**: Header $\rightarrow$ Hero $\rightarrow$ As-Is Bottleneck Hub (Long section before simulation) $\rightarrow$ Centerstage Simulator $\rightarrow$ Footer.
- **After (Crisp & Focused)**:
  1. **Header**: Clean top bar with stream links and "Guided Tour" CTA.
  2. **Hero & Persona Spotlight**: Sets practitioner context in under 30 seconds.
  3. **Transformed Journey Centerstage**: Immediate live simulation theater + 3-Layer Solution Architecture.
  4. **Operational Bottlenecks Deep Dive (As-Is vs To-Be)**: Positioned at the bottom for optional forensic audit review.
  5. **Footer**.

#### B. Docked Floating Tour Architecture (`InSituGuidedTour.tsx`)
- **Docked Container**: Sleek, glass-morphic dark/light panel (`bg-neutral-900 text-white rounded-2xl shadow-2xl border border-neutral-700 max-w-xl w-[92vw] sm:w-[580px]`).
- **Target Spotlight**: When a step targets an element (e.g. `#stage-step-2`), the element receives a vibrant spotlight ring (`ring-3 ring-[#FF5500] ring-offset-2 ring-offset-neutral-900`) and the window smoothly scrolls the element into view.
- **Live Step Syncing**:
  - Step 1: Practitioner Persona Spotlight (`#persona-spotlight`)
  - Step 2: Operational Bottleneck Context (`#bottleneck-context` or inline brief)
  - Step 3: Document Ingestion & OCR (`#stage-step-1`) $\rightarrow$ triggers Stage 1
  - Step 4: Autonomous 3-Way Rate Match (`#stage-step-2`) $\rightarrow$ triggers Stage 2
  - Step 5: Dual-Control Supervisor Gate (`#stage-step-3`) $\rightarrow$ triggers Stage 3
  - Step 6: Live NAV 2016 ERP Sync & Dispatch (`#nav-erp-window`) $\rightarrow$ triggers Stage 4
- **Controls**:
  - "Run Live Step" / "Next Step" primary action.
  - "Back" button, Step progress dots (1 to 6), and "Exit Tour".
  - Quick stream switcher (Billing / Collections / Recon) directly inside the tour bar.

#### C. Bug Fixes & QA Hardening
- **Fix 1: Eliminating Coordinate Drift**: By docking the tour bar to the viewport bottom, tooltips will never render offscreen, overlap behind sticky headers, or jump during page scroll.
- **Fix 2: Synchronizing Tour Triggers with Simulation State**: Fix the timing so that when the tour enters a simulation step, the stage automatically highlights and executes cleanly without requiring double clicks.
- **Fix 3: ViewMode Resiliency**: Ensure that starting the tour automatically switches the Centerstage viewMode to `'overview'` (Live Interactive Simulation), guaranteeing all target DOM elements exist.

***

### 3. Key Product Decisions & Trade-Offs

| Decision | Chosen Approach | Why | Rejected Alternative |
| :--- | :--- | :--- | :--- |
| **Section Ordering** | Move As-Is Bottlenecks to the bottom of the page | Client wants a crisp, punchy presentation. Starting with the live simulation theater immediately after the persona switcher maximizes executive engagement. | Leaving As-Is bottlenecks at the top (rejected: slows down reaching the actual solution). |
| **Tour Format** | Docked floating control bar with target spotlight | 100% immune to CSS coordinate clipping, scroll desync, and screen-width overflow bugs. | Absolute tooltip popovers (rejected: prone to layout clipping and scroll bugs). |
| **Step Count** | 6 focused operational steps | Provides complete coverage of practitioner, friction, and all 4 simulation stages without feeling overwhelming. | 15+ micro-step tours or shallow 2-step summaries. |

***

### 4. Technical Architecture & Component Mapping

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                            App.tsx (Root State)                              │
├──────────────────────────────────────────────────────────────────────────────┤
│  Top Bar (Header.tsx)                                                        │
├──────────────────────────────────────────────────────────────────────────────┤
│  1. JourneyHero.tsx & PersonaSpotlight.tsx (Executive Context & Practitioner)│
├──────────────────────────────────────────────────────────────────────────────┤
│  2. TransformedJourneysCenterstage.tsx (Interactive Simulation Theater)      │
│     - Stage 1: Document Ingestion (#stage-step-1)                            │
│     - Stage 2: Autonomous 3-Way Match (#stage-step-2)                        │
│     - Stage 3: Supervisor Approval Gate (#stage-step-3)                      │
│     - Stage 4: Dynamics NAV 2016 Real-Time Sync (#nav-erp-window)           │
│     - 3-Layer Solution Architecture (#architecture-section)                  │
├──────────────────────────────────────────────────────────────────────────────┤
│  3. AsIsBottleneckHub.tsx (MOVED: Optional Deep Dive at Bottom of Page)      │
│     - Triplicate 3-Way Match Redundancy Deep Dive                            │
│     - Collections & Reconciliation Root Causes                               │
├──────────────────────────────────────────────────────────────────────────────┤
│  4. InSituGuidedTour.tsx (Docked Floating Control Bar at Viewport Bottom)   │
│     - Spotlight focus ring on active element                                 │
│     - Smooth auto-scroll to element                                          │
│     - Direct demoStep trigger execution in Centerstage                       │
└──────────────────────────────────────────────────────────────────────────────┘
```

#### Step Execution Plan
1. **Re-Order Sections in `src/App.tsx`** [COMPLETED]:
   - Moved `<AsIsBottleneckHub>` to immediately follow `<TransformedJourneysCenterstage>`, right before `<Footer>`, providing an immediate interactive simulation experience followed by an optional audited deep dive.
2. **Re-Engineer `InSituGuidedTour.tsx`** [COMPLETED]:
   - Replaced fragile absolute coordinate tooltips with a docked floating control bar at `fixed bottom-5 left-1/2 -translate-x-1/2 z-50`.
   - Implemented fixed-position spotlight halo (`position: 'fixed'`) that precisely highlights target elements (`#persona-spotlight`, `#bottleneck-context`, `#stage-step-1` to `#stage-step-4`, `#nav-erp-window`) and smooth auto-scrolling with `scrollIntoView({ behavior: 'smooth', block: 'center' })`.
   - Wired live simulation execution triggers: clicking "Run Stage in Simulator & Next" executes the stage in real time in the Centerstage theater and live NAV 2016 accounting record.
3. **QA & Hardening in `TransformedJourneysCenterstage.tsx`** [COMPLETED]:
   - Added viewMode auto-switch to `'overview'` when tour triggers so that stage cards and ERP window DOM elements are always mounted and visible.
   - Removed any and all mentions of FTE or headcount reduction.
4. **Compile, Lint & Dev Server Verification** [COMPLETED]:
   - Code verified for TypeScript standards and Tailwind CSS fidelity.
