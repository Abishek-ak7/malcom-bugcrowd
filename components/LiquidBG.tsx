'use client';

import LiquidEther from './LiquidEther';

export default function LiquidBG() {
  return (
    <div className="absolute inset-0 w-full h-full -z-50">
      <LiquidEther
        colors={['#000814','#001D3D','#00A8E8']}  // 🔥 Strong Cyber Blue
        mouseForce={20}
        cursorSize={100}
        isViscous={false}
        viscous={30}
        iterationsViscous={32}
        iterationsPoisson={32}
        resolution={0.5}
        isBounce={false}
        autoDemo={true}
        autoSpeed={0.5}
        autoIntensity={2.2}
        takeoverDuration={0.25}
        autoResumeDelay={3000}
        autoRampDuration={0.6}
      />
    </div>
  );
}
