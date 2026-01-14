import { useEffect, useRef } from 'react';

const CircuitBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Circuit nodes
    const nodes: { x: number; y: number; connections: number[] }[] = [];
    const nodeCount = 20;
    
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        connections: []
      });
    }

    // Connect nearby nodes
    nodes.forEach((node, i) => {
      nodes.forEach((other, j) => {
        if (i !== j) {
          const dist = Math.hypot(node.x - other.x, node.y - other.y);
          if (dist < 300 && node.connections.length < 3) {
            node.connections.push(j);
          }
        }
      });
    });

    // Pulses
    interface Pulse {
      fromNode: number;
      toNode: number;
      progress: number;
      speed: number;
    }
    
    const pulses: Pulse[] = [];

    const createPulse = () => {
      const fromNode = Math.floor(Math.random() * nodes.length);
      const node = nodes[fromNode];
      if (node.connections.length > 0) {
        const toNode = node.connections[Math.floor(Math.random() * node.connections.length)];
        pulses.push({
          fromNode,
          toNode,
          progress: 0,
          speed: 0.005 + Math.random() * 0.01
        });
      }
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(11, 12, 16, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      ctx.strokeStyle = 'rgba(102, 252, 241, 0.08)';
      ctx.lineWidth = 1;
      nodes.forEach((node, i) => {
        node.connections.forEach(j => {
          const other = nodes[j];
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(other.x, other.y);
          ctx.stroke();
        });
      });

      // Draw nodes
      nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(102, 252, 241, 0.3)';
        ctx.fill();
      });

      // Update and draw pulses
      pulses.forEach((pulse, i) => {
        pulse.progress += pulse.speed;
        
        if (pulse.progress >= 1) {
          pulses.splice(i, 1);
          return;
        }

        const from = nodes[pulse.fromNode];
        const to = nodes[pulse.toNode];
        const x = from.x + (to.x - from.x) * pulse.progress;
        const y = from.y + (to.y - from.y) * pulse.progress;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 20);
        gradient.addColorStop(0, 'rgba(102, 252, 241, 0.8)');
        gradient.addColorStop(1, 'rgba(102, 252, 241, 0)');
        
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      if (Math.random() < 0.02 && pulses.length < 5) {
        createPulse();
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-60"
      style={{ zIndex: 0 }}
    />
  );
};

export default CircuitBackground;
