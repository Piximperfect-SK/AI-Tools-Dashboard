import { useState } from 'react';
import { AIToolCard } from './AIToolCard';
import { motion } from 'motion/react';
import { Sparkles, Search } from 'lucide-react';

export interface AITool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  color: string;
  features: string[];
  pricing: string;
}

const aiTools: AITool[] = [
  {
    id: '1',
    name: 'ChatGPT',
    description: 'Advanced conversational AI for natural language understanding and generation.',
    category: 'Text Generation',
    icon: '💬',
    color: 'from-emerald-500 to-teal-600',
    features: ['Natural conversations', 'Code assistance', 'Writing help'],
    pricing: 'Free / ₹1,660/mo'
  },
  {
    id: '2',
    name: 'Midjourney',
    description: 'Create stunning, artistic images from text descriptions with AI.',
    category: 'Image Generation',
    icon: '🎨',
    color: 'from-purple-500 to-pink-600',
    features: ['Art generation', 'Style control', 'High resolution'],
    pricing: 'From ₹830/mo'
  },
  {
    id: '3',
    name: 'GitHub Copilot',
    description: 'AI pair programmer that helps you write code faster and smarter.',
    category: 'Code Assistant',
    icon: '🚀',
    color: 'from-blue-500 to-cyan-600',
    features: ['Code completion', 'Multi-language', 'Context-aware'],
    pricing: '₹830/mo'
  },
  {
    id: '4',
    name: 'Runway ML',
    description: 'Professional video editing and generation powered by AI technology.',
    category: 'Video Generation',
    icon: '🎬',
    color: 'from-orange-500 to-red-600',
    features: ['Video editing', 'Gen-2 models', 'Real-time effects'],
    pricing: 'From ₹996/mo'
  },
  {
    id: '5',
    name: 'Jasper AI',
    description: 'AI content platform for marketing teams and content creators.',
    category: 'Content Creation',
    icon: '✍️',
    color: 'from-violet-500 to-purple-600',
    features: ['Blog posts', 'Ad copy', 'SEO optimization'],
    pricing: 'From ₹3,237/mo'
  },
  {
    id: '6',
    name: 'ElevenLabs',
    description: 'Generate realistic voices and clone speech with advanced AI.',
    category: 'Voice & Audio',
    icon: '🎙️',
    color: 'from-indigo-500 to-blue-600',
    features: ['Voice cloning', 'Text-to-speech', 'Multi-lingual'],
    pricing: 'Free / From ₹415/mo'
  },
  {
    id: '7',
    name: 'Notion AI',
    description: 'Integrated AI assistant for note-taking and knowledge management.',
    category: 'Productivity',
    icon: '📝',
    color: 'from-gray-600 to-gray-800',
    features: ['Writing assistant', 'Summarization', 'Translation'],
    pricing: '₹830/mo'
  },
  {
    id: '8',
    name: 'Synthesia',
    description: 'Create AI-generated videos with virtual presenters in minutes.',
    category: 'Video Generation',
    icon: '🎥',
    color: 'from-pink-500 to-rose-600',
    features: ['AI avatars', '120+ languages', 'Custom branding'],
    pricing: 'From ₹2,490/mo'
  },
  {
    id: '9',
    name: 'Fireflies.ai',
    description: 'Record, transcribe, and analyze your voice conversations automatically.',
    category: 'Voice & Audio',
    icon: '🔥',
    color: 'from-amber-500 to-orange-600',
    features: ['Meeting transcription', 'AI notes', 'CRM integration'],
    pricing: 'Free / From ₹830/mo'
  },
  {
    id: '10',
    name: 'Stability AI',
    description: 'Open-source image generation with Stable Diffusion technology.',
    category: 'Image Generation',
    icon: '🖼️',
    color: 'from-teal-500 to-emerald-600',
    features: ['Open source', 'Customizable', 'High quality'],
    pricing: 'Free / Credits'
  },
  {
    id: '11',
    name: 'Grammarly',
    description: 'AI-powered writing assistant for grammar, style, and tone.',
    category: 'Content Creation',
    icon: '✅',
    color: 'from-green-500 to-emerald-600',
    features: ['Grammar check', 'Tone detection', 'Plagiarism check'],
    pricing: 'Free / From ₹996/mo'
  },
  {
    id: '12',
    name: 'Perplexity AI',
    description: 'AI-powered search engine that provides accurate answers with sources.',
    category: 'Search & Research',
    icon: '🔍',
    color: 'from-sky-500 to-blue-600',
    features: ['Cited answers', 'Follow-up questions', 'Real-time data'],
    pricing: 'Free / ₹1,660/mo'
  }
];

const categories = ['All', 'Text Generation', 'Image Generation', 'Video Generation', 'Code Assistant', 'Voice & Audio', 'Content Creation', 'Productivity', 'Search & Research'];

export function AIToolsDashboard() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = aiTools.filter(tool => {
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-white/10 backdrop-blur-xl bg-slate-900/50 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-8 h-8 text-violet-400" />
              </motion.div>
              <div>
                <h1 className="text-white">AI Tools Hub</h1>
                <p className="text-slate-400 text-sm">Discover the best AI tools in the market</p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search AI tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all"
            />
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 overflow-x-auto pb-2"
        >
          <div className="flex gap-3 min-w-max">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2.5 rounded-full transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/25'
                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-800 border border-slate-700/50'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Tools Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredTools.map((tool, index) => (
            <AIToolCard key={tool.id} tool={tool} index={index} />
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredTools.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🤖</div>
            <h3 className="text-xl text-slate-300 mb-2">No tools found</h3>
            <p className="text-slate-500">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="border-t border-white/10 mt-16 py-8"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-500">
          <p>Discover and explore the latest AI tools powering innovation</p>
        </div>
      </motion.footer>
    </div>
  );
}
