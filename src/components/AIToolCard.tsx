import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Star, TrendingUp } from 'lucide-react';
import type { AITool } from './AIToolsDashboard';

interface AIToolCardProps {
  tool: AITool;
  index: number;
}

export function AIToolCard({ tool, index }: AIToolCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative"
    >
      {/* Card */}
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-sm overflow-hidden h-full"
      >
        {/* Animated Background Gradient */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
        />

        {/* Glow Effect */}
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          className={`absolute -inset-0.5 bg-gradient-to-r ${tool.color} rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10`}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <motion.div
              animate={{
                scale: isHovered ? 1.1 : 1,
                rotate: isHovered ? 5 : 0,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="text-4xl"
            >
              {tool.icon}
            </motion.div>
            
            <div className="flex gap-2">
              {/* Favorite Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-2 rounded-lg transition-colors ${
                  isFavorite 
                    ? 'bg-yellow-500/20 text-yellow-400' 
                    : 'bg-slate-700/50 text-slate-400 hover:text-yellow-400'
                }`}
              >
                <Star
                  className="w-4 h-4"
                  fill={isFavorite ? 'currentColor' : 'none'}
                />
              </motion.button>

              {/* External Link */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg bg-slate-700/50 text-slate-400 hover:text-white transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          {/* Title & Category */}
          <div className="mb-3">
            <h3 className="text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-all">
              {tool.name}
            </h3>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs bg-gradient-to-r ${tool.color} bg-opacity-10 text-white border border-white/10`}>
                {tool.category}
              </span>
              <motion.div
                animate={{ x: isHovered ? [0, 3, 0] : 0 }}
                transition={{ repeat: isHovered ? Infinity : 0, duration: 1 }}
                className="flex items-center gap-1 text-emerald-400 text-xs"
              >
                <TrendingUp className="w-3 h-3" />
              </motion.div>
            </div>
          </div>

          {/* ✅ Description — FIXED (only change) */}
          <p className="text-white/90 hover:text-white text-sm mb-4 line-clamp-2 transition-colors">
            {tool.description}
          </p>

          {/* Features */}
          <div className="mb-4 space-y-2">
            <AnimatePresence>
              {isHovered && tool.features.map((feature, idx) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-2 text-xs text-slate-300"
                >
                  <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${tool.color}`} />
                  {feature}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
            <span className="text-xs text-slate-400">{tool.pricing}</span>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-lg text-xs text-white bg-gradient-to-r ${tool.color} hover:shadow-lg transition-shadow`}
            >
              Explore
            </motion.button>
          </div>
        </div>

        {/* Corner Accent */}
        <motion.div
          animate={{
            scale: isHovered ? 1 : 0,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${tool.color} opacity-20 blur-2xl rounded-full`}
        />
      </motion.div>
    </motion.div>
  );
}
