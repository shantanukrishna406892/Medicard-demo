/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { JourneyHero } from './components/JourneyHero';
import { AsIsBottleneckHub } from './components/AsIsBottleneckHub';
import { TransformedJourneysCenterstage } from './components/TransformedJourneysCenterstage';
import { InSituGuidedTour } from './components/InSituGuidedTour';
import { Footer } from './components/Footer';
import { ProcessStream, PersonaId } from './types';

export default function App() {
  const [activeStream, setActiveStream] = useState<ProcessStream>('billing');
  const [activePersonaId, setActivePersonaId] = useState<PersonaId>('billing_expert');
  const [isTourOpen, setIsTourOpen] = useState<boolean>(false);
  const [controlledStepTrigger, setControlledStepTrigger] = useState<number | null>(null);

  // Synchronize persona when stream changes
  const handleSelectStream = (stream: ProcessStream) => {
    setActiveStream(stream);
    if (stream === 'billing') {
      setActivePersonaId('billing_expert');
    } else if (stream === 'collections') {
      setActivePersonaId('collections_agent');
    } else if (stream === 'reconciliation') {
      setActivePersonaId('recon_specialist');
    }
  };

  // Synchronize stream when persona changes
  const handleSelectPersona = (id: PersonaId) => {
    setActivePersonaId(id);
    if (id === 'billing_expert') {
      setActiveStream('billing');
    } else if (id === 'collections_agent') {
      setActiveStream('collections');
    } else if (id === 'recon_specialist') {
      setActiveStream('reconciliation');
    }
  };

  const handleStartTour = () => {
    setControlledStepTrigger(null);
    setIsTourOpen(true);
  };

  const handleLaunchSimulation = () => {
    const el = document.getElementById('simulation-console');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 selection:bg-[#FF5500]/15 selection:text-[#FF5500]">
      {/* Top Navigation Ribbon */}
      <Header
        activeStream={activeStream}
        onSelectStream={handleSelectStream}
        activePersonaId={activePersonaId}
        onStartTour={handleStartTour}
      />

      <main>
        {/* Operational Journey Hero & Persona Spotlight */}
        <JourneyHero
          activeStream={activeStream}
          onSelectStream={handleSelectStream}
          activePersonaId={activePersonaId}
          onSelectPersona={handleSelectPersona}
          onStartTour={handleStartTour}
        />

        {/* Transformed User Journey Centerstage (Simulation Theater, Comparison & 3-Layer Mechanics) */}
        <TransformedJourneysCenterstage
          controlledStream={activeStream}
          onStreamChange={handleSelectStream}
          activePersonaId={activePersonaId}
          controlledStepTrigger={controlledStepTrigger}
        />

        {/* Audited As-Is Bottlenecks Context Hub (Optional Deep Dive Audit at the end of the page) */}
        <AsIsBottleneckHub
          activeStream={activeStream}
          onSelectStream={handleSelectStream}
          onLaunchSimulation={handleLaunchSimulation}
        />
      </main>

      {/* Operations Footer */}
      <Footer />

      {/* Interactive In-Situ Spotlight Guided Tour Anchored to Live Process Elements */}
      <InSituGuidedTour
        isOpen={isTourOpen}
        onClose={() => {
          setIsTourOpen(false);
          setControlledStepTrigger(null);
        }}
        activeStream={activeStream}
        onSelectStream={handleSelectStream}
        onTriggerSimulationStep={(stepNum) => {
          setControlledStepTrigger(stepNum);
        }}
      />
    </div>
  );
}
