'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';

interface Node {
  id: string;
  name: string;
  type: 'self' | 'partner' | 'supplier' | 'customer' | 'potential';
  trustScore?: number;
  country?: string;
  size?: number;
}

interface Link {
  source: string;
  target: string;
  strength: number;
  type: 'active' | 'pending' | 'potential';
}

interface NetworkVisualizationProps {
  connections: Node[];
  links?: Link[];
  maxNodes?: number;
  interactive?: boolean;
  height?: number;
  width?: number;
  className?: string;
  title?: string;
  loading?: boolean;
}

export function NetworkVisualization({
  connections,
  links,
  maxNodes = 20,
  interactive = true,
  height = 400,
  width = 600,
  className = '',
  title = 'Network Visualization',
  loading = false,
}: NetworkVisualizationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  // Ensure we only run visualization on client-side
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || loading || !connections.length) return;

    // This is where we would normally initialize D3 or another visualization library
    // For now, we'll create a simple canvas-based visualization
    const renderNetwork = () => {
      if (!containerRef.current) return;
      
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      
      // Clear any existing canvas
      while (containerRef.current.firstChild) {
        containerRef.current.removeChild(containerRef.current.firstChild);
      }
      
      containerRef.current.appendChild(canvas);
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Define node colors by type
      const nodeColors = {
        self: '#3B82F6', // blue
        partner: '#10B981', // green
        supplier: '#F59E0B', // amber
        customer: '#8B5CF6', // purple
        potential: '#9CA3AF', // gray
      };
      
      // Define link colors by type
      const linkColors = {
        active: 'rgba(59, 130, 246, 0.5)', // blue with opacity
        pending: 'rgba(245, 158, 11, 0.5)', // amber with opacity
        potential: 'rgba(156, 163, 175, 0.3)', // gray with opacity
      };
      
      // Calculate positions (simple circle layout)
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) / 3;
      
      // Position nodes in a circle
      const nodes = connections.slice(0, maxNodes).map((node, i) => {
        const angle = (i / Math.max(1, connections.length - 1)) * Math.PI * 2;
        // Self node is in center
        const x = node.type === 'self' ? centerX : centerX + Math.cos(angle) * radius;
        const y = node.type === 'self' ? centerY : centerY + Math.sin(angle) * radius;
        const size = node.size || (node.type === 'self' ? 20 : 10);
        
        return {
          ...node,
          x,
          y,
          size,
        };
      });
      
      // Draw links first (so they're behind nodes)
      if (links) {
        links.forEach(link => {
          const source = nodes.find(n => n.id === link.source);
          const target = nodes.find(n => n.id === link.target);
          
          if (source && target) {
            ctx.beginPath();
            ctx.moveTo(source.x, source.y);
            ctx.lineTo(target.x, target.y);
            ctx.strokeStyle = linkColors[link.type] || linkColors.potential;
            ctx.lineWidth = link.strength || 1;
            ctx.stroke();
          }
        });
      } else {
        // If no links provided, connect self to all others
        const self = nodes.find(n => n.type === 'self');
        if (self) {
          nodes.forEach(node => {
            if (node.id !== self.id) {
              ctx.beginPath();
              ctx.moveTo(self.x, self.y);
              ctx.lineTo(node.x, node.y);
              ctx.strokeStyle = linkColors.active;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          });
        }
      }
      
      // Draw nodes
      nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = nodeColors[node.type] || nodeColors.potential;
        ctx.fill();
        
        // Add border for selected node
        if (selectedNode && selectedNode.id === node.id) {
          ctx.strokeStyle = '#000';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
        
        // Add node labels
        ctx.fillStyle = '#000';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(node.name, node.x, node.y + node.size + 12);
      });
      
      // Add interactivity if enabled
      if (interactive) {
        canvas.onclick = (event) => {
          const rect = canvas.getBoundingClientRect();
          const x = (event.clientX - rect.left) * (canvas.width / rect.width);
          const y = (event.clientY - rect.top) * (canvas.height / rect.height);
          
          // Find clicked node
          const clickedNode = nodes.find(node => {
            const dx = node.x - x;
            const dy = node.y - y;
            return Math.sqrt(dx * dx + dy * dy) <= node.size;
          });
          
          setSelectedNode(clickedNode || null);
          renderNetwork(); // Re-render to show selection
        };
      }
    };
    
    renderNetwork();
    
    // Cleanup function
    return () => {
      if (containerRef.current) {
        while (containerRef.current.firstChild) {
          containerRef.current.removeChild(containerRef.current.firstChild);
        }
      }
    };
  }, [connections, links, isClient, loading, maxNodes, interactive, height, width]);

  // Render legend
  const renderLegend = () => {
    return (
      <div className="flex flex-wrap gap-4 mt-4 text-sm">
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
          <span>Your Business</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2"></span>
          <span>Partners</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 rounded-full bg-amber-500 mr-2"></span>
          <span>Suppliers</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 rounded-full bg-purple-500 mr-2"></span>
          <span>Customers</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 rounded-full bg-gray-400 mr-2"></span>
          <span>Potential Connections</span>
        </div>
      </div>
    );
  };

  // Show node details if a node is selected
  const renderNodeDetails = () => {
    if (!selectedNode) return null;
    
    return (
      <div className="mt-4 p-3 bg-gray-50 rounded-md border border-gray-200">
        <h4 className="font-medium">{selectedNode.name}</h4>
        <div className="text-sm text-gray-600 mt-1">
          <p>Type: {selectedNode.type.charAt(0).toUpperCase() + selectedNode.type.slice(1)}</p>
          {selectedNode.trustScore && <p>Trust Score: {selectedNode.trustScore}</p>}
          {selectedNode.country && <p>Country: {selectedNode.country}</p>}
        </div>
      </div>
    );
  };

  return (
    <Card className={className}>
      <div className="p-4">
        <h3 className="text-lg font-medium mb-2">{title}</h3>
        
        {loading ? (
          <div className="flex items-center justify-center" style={{ height: `${height}px` }}>
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : connections.length === 0 ? (
          <div className="flex items-center justify-center text-gray-500" style={{ height: `${height}px` }}>
            No network data available
          </div>
        ) : (
          <>
            <div 
              ref={containerRef} 
              className="border border-gray-200 rounded-md overflow-hidden"
              style={{ height: `${height}px` }}
            />
            {renderLegend()}
            {selectedNode && renderNodeDetails()}
          </>
        )}
      </div>
    </Card>
  );
}
