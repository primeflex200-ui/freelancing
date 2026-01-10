"use client"

import { useEffect, useRef } from "react"

export function LiquidEffectAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    // Load the script dynamically
    const script = document.createElement("script")
    script.type = "module"
    script.textContent = `
      import LiquidBackground from 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.22/build/backgrounds/liquid1.min.js';
      
      const canvas = document.getElementById('liquid-canvas');
      if (canvas) {
        const app = LiquidBackground(canvas);
        app.loadImage('https://images.unsplash.com/photo-1557683316-973673baf926?w=1200&h=800&fit=crop');
        
        // Optimize for performance
        app.liquidPlane.material.metalness = 0.6;
        app.liquidPlane.material.roughness = 0.3;
        app.liquidPlane.uniforms.displacementScale.value = 3;
        app.setRain(false);
        
        // Reduce animation intensity for smoother performance
        if (app.liquidPlane.uniforms.speed) {
          app.liquidPlane.uniforms.speed.value = 0.5;
        }
        
        window.__liquidApp = app;
      }
    `
    document.body.appendChild(script)

    return () => {
      if (window.__liquidApp && window.__liquidApp.dispose) {
        window.__liquidApp.dispose()
      }
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      id="liquid-canvas"
      className="w-full h-full"
      style={{ 
        display: 'block',
        willChange: 'transform',
        transform: 'translateZ(0)'
      }}
    />
  )
}

declare global {
  interface Window {
    __liquidApp?: any
  }
}
