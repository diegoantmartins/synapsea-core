import { useEffect, useRef } from 'react';

interface AnimatedLogoProps {
  className?: string;
  size?: number;
}

const AnimatedLogo = ({ className = '', size = 40 }: AnimatedLogoProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const scale = window.devicePixelRatio || 1;
    canvas.width = size * scale;
    canvas.height = size * scale;
    ctx.scale(scale, scale);
    
    // Define the S and C paths as bezier curves
    const sPath = {
      points: [
        { x: 0.35, y: 0.15 },
        { x: 0.15, y: 0.15 },
        { x: 0.1, y: 0.35 },
        { x: 0.25, y: 0.45 },
        { x: 0.4, y: 0.55 },
        { x: 0.45, y: 0.75 },
        { x: 0.25, y: 0.85 },
        { x: 0.1, y: 0.75 },
      ],
      color: 'hsl(177, 95%, 69%)', // cyan
      glowColor: 'hsla(177, 95%, 69%, 0.6)',
    };
    
    const cPath = {
      points: [
        { x: 0.85, y: 0.25 },
        { x: 0.75, y: 0.12 },
        { x: 0.55, y: 0.15 },
        { x: 0.5, y: 0.35 },
        { x: 0.5, y: 0.65 },
        { x: 0.55, y: 0.85 },
        { x: 0.75, y: 0.88 },
        { x: 0.85, y: 0.75 },
      ],
      color: 'hsl(300, 70%, 65%)', // purple/pink
      glowColor: 'hsla(300, 70%, 65%, 0.6)',
    };
    
    // Particles for animation
    interface Particle {
      path: typeof sPath;
      progress: number;
      speed: number;
      size: number;
      opacity: number;
    }
    
    const particles: Particle[] = [];
    
    // Create particles for both paths
    const createParticles = () => {
      for (let i = 0; i < 4; i++) {
        particles.push({
          path: sPath,
          progress: Math.random(),
          speed: 0.003 + Math.random() * 0.004,
          size: 1 + Math.random() * 1.5,
          opacity: 0.6 + Math.random() * 0.4,
        });
        particles.push({
          path: cPath,
          progress: Math.random(),
          speed: 0.003 + Math.random() * 0.004,
          size: 1 + Math.random() * 1.5,
          opacity: 0.6 + Math.random() * 0.4,
        });
      }
    };
    
    createParticles();
    
    // Get point on path at progress (0-1)
    const getPointOnPath = (path: typeof sPath, progress: number) => {
      const points = path.points;
      const totalSegments = points.length - 1;
      const segment = Math.floor(progress * totalSegments);
      const segmentProgress = (progress * totalSegments) % 1;
      
      const start = points[Math.min(segment, points.length - 1)];
      const end = points[Math.min(segment + 1, points.length - 1)];
      
      return {
        x: start.x + (end.x - start.x) * segmentProgress,
        y: start.y + (end.y - start.y) * segmentProgress,
      };
    };
    
    // Draw path with glow
    const drawPath = (path: typeof sPath) => {
      ctx.beginPath();
      ctx.moveTo(path.points[0].x * size, path.points[0].y * size);
      
      for (let i = 1; i < path.points.length; i++) {
        const prev = path.points[i - 1];
        const curr = path.points[i];
        const cpX = (prev.x + curr.x) / 2 * size;
        const cpY = (prev.y + curr.y) / 2 * size;
        ctx.quadraticCurveTo(prev.x * size, prev.y * size, cpX, cpY);
      }
      
      const last = path.points[path.points.length - 1];
      ctx.lineTo(last.x * size, last.y * size);
      
      // Glow effect
      ctx.shadowBlur = 8;
      ctx.shadowColor = path.glowColor;
      ctx.strokeStyle = path.color;
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.stroke();
      
      // Inner line
      ctx.shadowBlur = 0;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 0.5;
      ctx.stroke();
    };
    
    // Draw particle
    const drawParticle = (particle: Particle) => {
      const pos = getPointOnPath(particle.path, particle.progress);
      
      ctx.beginPath();
      ctx.arc(pos.x * size, pos.y * size, particle.size, 0, Math.PI * 2);
      
      // Glow
      ctx.shadowBlur = 10;
      ctx.shadowColor = particle.path.color;
      ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
      ctx.fill();
      
      ctx.shadowBlur = 0;
    };
    
    // Animation loop
    let animationId: number;
    
    const animate = () => {
      ctx.clearRect(0, 0, size, size);
      
      // Draw paths
      drawPath(sPath);
      drawPath(cPath);
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.progress += particle.speed;
        if (particle.progress > 1) {
          particle.progress = 0;
          particle.speed = 0.003 + Math.random() * 0.004;
        }
        drawParticle(particle);
      });
      
      // Add static nodes at key points
      const nodePositions = [
        { path: sPath, progress: 0.25 },
        { path: sPath, progress: 0.5 },
        { path: sPath, progress: 0.75 },
        { path: cPath, progress: 0.25 },
        { path: cPath, progress: 0.5 },
        { path: cPath, progress: 0.75 },
      ];
      
      nodePositions.forEach(({ path, progress }) => {
        const pos = getPointOnPath(path, progress);
        ctx.beginPath();
        ctx.arc(pos.x * size, pos.y * size, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = path.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = path.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [size]);
  
  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        width: size,
        height: size,
      }}
    />
  );
};

export default AnimatedLogo;
