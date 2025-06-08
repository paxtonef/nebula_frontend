'use client';

import { useEffect, useRef } from 'react';
import { BarChart3 } from 'lucide-react'; // Use Lucide instead of Heroicons

interface NetworkVisualizationProps {
  title?: string;
}

export default function NetworkVisualization({ title = "Network Overview" }: NetworkVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Simple network visualization
    const drawNetwork = () => {
      const width = canvas.width;
      const height = canvas.height;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Draw background
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, width, height);

      // Draw nodes (representing businesses)
      const nodes = [
        { x: width * 0.5, y: height * 0.5, radius: 20, label: 'Your Business' },
        { x: width * 0.3, y: height * 0.3, radius: 15, label: 'Partner A' },
        { x: width * 0.7, y: height * 0.3, radius: 15, label: 'Partner B' },
        { x: width * 0.3, y: height * 0.7, radius: 15, label: 'Supplier C' },
        { x: width * 0.7, y: height * 0.7, radius: 15, label: 'Client D' },
      ];

      // Draw connections
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      // Connect center node to all others
      nodes.slice(1).forEach(node => {
        ctx.moveTo(nodes[0].x, nodes[0].y);
        ctx.lineTo(node.x, node.y);
      });
      
      ctx.stroke();

      // Draw nodes
      nodes.forEach((node, index) => {
        // Node circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, 2 * Math.PI);
        ctx.fillStyle = index === 0 ? '#3b82f6' : '#64748b';
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Node label
        ctx.fillStyle = '#1e293b';
        ctx.font = '12px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, node.x, node.y + node.radius + 15);
      });
    };

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    drawNetwork();

    // Redraw on resize
    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      drawNetwork();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <BarChart3 className="h-5 w-5 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      
      <div className="relative h-64 w-full">
        <canvas
          ref={canvasRef}
          className="w-full h-full border border-gray-200 rounded"
        />
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">12</div>
          <div className="text-gray-600">Active Connections</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">85%</div>
          <div className="text-gray-600">Trust Score</div>
        </div>
      </div>
    </div>
  );
}
