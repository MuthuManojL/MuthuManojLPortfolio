import React, { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useTheme } from "@/theme/ThemeProvider";

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  category: "computer" | "biology" | "iot";
  icon: string;
  description: string;
}

interface BitsTecanvasProps {
  nodes?: Node[];
  width?: number;
  height?: number;
}

/**
 * BitsTechCanvas - Interactive node visualization system
 * Features: cursor gravity, connecting lines, hover tooltips, particle effects
 */
export const BitsTechCanvas: React.FC<BitsTecanvasProps> = ({
  nodes: customNodes,
  width = 800,
  height = 600,
}) => {
  const { tokens } = useTheme();
  const canvasRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(width / 2);
  const mouseY = useMotionValue(height / 2);
  
  const smoothMouseX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  const [hoveredNode, setHoveredNode] = React.useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = React.useState({ x: 0, y: 0 });

  const defaultNodes: Node[] = [
    // Computer Science nodes
    { id: "ai", label: "AI/ML", x: 20, y: 30, category: "computer", icon: "🤖", description: "Machine Learning & Deep Learning" },
    { id: "web", label: "Web Dev", x: 15, y: 60, category: "computer", icon: "🌐", description: "Full-Stack Development" },
    { id: "data", label: "Data Science", x: 30, y: 80, category: "computer", icon: "📊", description: "Analytics & Visualization" },
    
    // Biology nodes
    { id: "biomedical", label: "Biomedical", x: 70, y: 20, category: "biology", icon: "🧬", description: "Medical Devices & Imaging" },
    { id: "research", label: "Research", x: 80, y: 50, category: "biology", icon: "🔬", description: "Scientific Research" },
    { id: "signal", label: "Signal Proc", x: 75, y: 75, category: "biology", icon: "📈", description: "Biosignal Processing" },
    
    // IoT nodes
    { id: "sensors", label: "Sensors", x: 50, y: 15, category: "iot", icon: "📡", description: "IoT Sensors & Devices" },
    { id: "embedded", label: "Embedded", x: 45, y: 45, category: "iot", icon: "🔌", description: "Embedded Systems" },
    { id: "automation", label: "Automation", x: 55, y: 70, category: "iot", icon: "⚙️", description: "Industrial Automation" },
  ];

  const nodes = customNodes || defaultNodes;

  const labelMap: Record<string, string> = {
    computer: "Computer",
    biology: "Biomedical",
    iot: "IoT",
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "computer":
        return "#3b82f6"; // blue
      case "biology":
        return "#10b981"; // green
      case "iot":
        return "#f59e0b"; // amber
      default:
        return tokens.primary;
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    }
  };

  // Explicit, semantically-related connections between nodes
  const connections = React.useMemo(() => {
    const byId = Object.fromEntries(nodes.map((n) => [n.id, n] as const));
    const edges: Array<[string, string]> = [
      // IoT stack
      ["sensors", "embedded"],
      ["embedded", "automation"],
      ["sensors", "automation"],
      // Biomedical relationships
      ["biomedical", "research"],
      ["biomedical", "signal"],
      ["signal", "research"],
      // CS connections
      ["ai", "data"],
      ["web", "data"],
      // Cross-domain links
      ["sensors", "data"],
      ["automation", "web"],
      ["ai", "biomedical"],
      ["data", "research"],
    ];

    return edges
      .filter(([a, b]) => byId[a] && byId[b])
      .map(([a, b]) => {
        const from = byId[a];
        const to = byId[b];
        const distance = Math.hypot(
          (from.x - to.x) * width / 100,
          (from.y - to.y) * height / 100
        );
        return {
          from,
          to,
          strength: Math.max(0.2, 1 - distance / (width * 0.6)),
        };
      });
  }, [nodes, width, height]);

  return (
    <div className="relative" style={{ width, height }}>
      {/* Canvas container */}
      <motion.div
        ref={canvasRef}
        className="relative w-full h-full rounded-xl border overflow-hidden"
        style={{
          backgroundColor: tokens.surface,
          borderColor: tokens.border,
        }}
        onMouseMove={handleMouseMove}
      >
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${smoothMouseX}px ${smoothMouseY}px, ${tokens.primary}20, transparent 50%)`,
          }}
        />

        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {connections.map(({ from, to, strength }, i) => {
            const x1 = (from.x / 100) * width;
            const y1 = (from.y / 100) * height;
            const x2 = (to.x / 100) * width;
            const y2 = (to.y / 100) * height;
            
            const isHighlighted = hoveredNode === from.id || hoveredNode === to.id;
            
            return (
              <motion.line
                key={`${from.id}-${to.id}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={isHighlighted ? tokens.primary : tokens.border}
                strokeWidth={isHighlighted ? 2 : 1}
                strokeOpacity={isHighlighted ? 0.8 : strength * 0.3}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: i * 0.05 }}
              />
            );
          })}
        </svg>

        {/* Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              backgroundColor: tokens.primary,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Nodes */}
        {nodes.map((node) => {
          const nodeX = (node.x / 100) * width;
          const nodeY = (node.y / 100) * height;
          const categoryColor = getCategoryColor(node.category);
          const isHovered = hoveredNode === node.id;

          return (
            <motion.div
              key={node.id}
              className="absolute cursor-pointer"
              style={{
                left: nodeX,
                top: nodeY,
                x: "-50%",
                y: "-50%",
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                delay: Math.random() * 0.5,
              }}
              onMouseEnter={(e) => {
                setHoveredNode(node.id);
                const rect = e.currentTarget.getBoundingClientRect();
                setTooltipPos({ x: rect.left, y: rect.top - 10 });
              }}
              onMouseLeave={() => setHoveredNode(null)}
            >
              {/* Node glow */}
              <motion.div
                className="absolute inset-0 rounded-full blur-xl"
                style={{ backgroundColor: categoryColor }}
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 0.5 : 0.2 }}
                transition={{ duration: 0.3 }}
              />

              {/* Node circle */}
              <motion.div
                className="relative w-20 h-20 rounded-full flex flex-col items-center justify-center border-2"
                style={{
                  backgroundColor: tokens.surface,
                  borderColor: categoryColor,
                }}
                whileHover={{
                  scale: 1.15,
                  boxShadow: `0 0 30px ${categoryColor}80`,
                }}
              >
                {/* Icon */}
                <span className="text-2xl mb-1">{node.icon}</span>
                
                {/* Label */}
                <span
                  className="text-xs font-semibold text-center px-1"
                  style={{ color: tokens.text_primary }}
                >
                  {node.label}
                </span>
              </motion.div>

              {/* Pulse ring */}
              {isHovered && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2"
                  style={{ borderColor: categoryColor }}
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                  }}
                />
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {/* Tooltip */}
      {hoveredNode && (
        <motion.div
          className="fixed z-50 px-4 py-2 rounded-lg shadow-lg border pointer-events-none"
          style={{
            backgroundColor: tokens.surface,
            borderColor: tokens.border,
            left: tooltipPos.x,
            top: tooltipPos.y,
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          <p className="text-sm font-medium" style={{ color: tokens.text_primary }}>
            {nodes.find((n) => n.id === hoveredNode)?.description}
          </p>
        </motion.div>
      )}

      {/* Legend */}
      <motion.div
        className="absolute bottom-4 left-4 flex gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {["computer", "biology", "iot"].map((cat) => (
          <div key={cat} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: getCategoryColor(cat) }}
            />
            <span className="text-xs" style={{ color: tokens.text_secondary }}>
              {labelMap[cat]}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
