import * as React from "react";
import { Slot } from "@radix-ui/react-slot@1.1.2";
import { cva, type VariantProps } from "class-variance-authority@0.7.1";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };import { useState } from "react";
import { motion } from "motion/react";
import { Sparkles, Search } from "lucide-react";
import { AIToolCard } from "./AIToolCard";

/* =========================
   TYPES
========================= */
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

/* =========================
   DATA (KEEP YOUR EXISTING)
========================= */
const aiTools: AITool[] = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    description:
      "Advanced conversational AI for natural language understanding and generation.",
    category: "Text Generation",
    icon: "💬",
    color: "from-emerald-500 to-teal-600",
    features: ["Chat", "Reasoning", "Coding"],
    pricing: "Free / ₹1,660/mo",
  },
  {
    id: "midjourney",
    name: "Midjourney",
    description:
      "Create stunning, artistic images from text descriptions with AI.",
    category: "Image Generation",
    icon: "🎨",
    color: "from-fuchsia-500 to-pink-600",
    features: ["Text to Image", "Art Styles"],
    pricing: "From ₹830/mo",
  },
  {
    id: "copilot",
    name: "GitHub Copilot",
    description:
      "AI pair programmer that helps you write code faster and smarter.",
    category: "Code Assistant",
    icon: "🚀",
    color: "from-blue-500 to-cyan-600",
    features: ["Code Completion", "Suggestions"],
    pricing: "₹830/mo",
  },
];

/* =========================
   CATEGORIES
========================= */
const categories = [
  "All",
  "Text Generation",
  "Image Generation",
  "Video Generation",
  "Code Assistant",
  "Voice & Audio",
  "Content Creation",
  "Productivity",
  "Search & Research",
];

/* =========================
   COMPONENT
========================= */
export function AIToolsDashboard() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  /* =========================
     FILTER LOGIC (FIXED)
  ========================= */
  const filteredTools = aiTools.filter((tool) => {
    const matchesCategory =
      selectedCategory === "All" ||
      tool.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* =========================
          HEADER
      ========================= */}
      <header className="border-b border-white/10 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-6">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-7 h-7 text-violet-400" />
            </motion.div>
            <div>
              <h1 className="text-lg font-semibold">AI Tools Hub</h1>
              <p className="text-sm text-slate-400">
                Discover the best AI tools in the market
              </p>
            </div>
          </div>

          <button className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-sm">
            + Add Tool
          </button>
        </div>

        {/* SEARCH */}
        <div className="px-6 pb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search AI tools..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
            />
          </div>
        </div>
      </header>

      {/* =========================
          BODY
      ========================= */}
      <div className="flex">
        {/* LEFT SIDEBAR */}
        <aside className="w-56 shrink-0 border-r border-white/10 px-4 py-6">
          <div className="space-y-2 sticky top-28">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-sm transition
                    ${
                      active
                        ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white"
                        : "text-slate-300 hover:bg-white/5"
                    }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </aside>

        {/* RIGHT CONTENT */}
        <main className="flex-1 px-6 py-6">
          {filteredTools.length === 0 ? (
            <div className="text-slate-400 mt-20">
              No tools found
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredTools.map((tool, index) => (
                <AIToolCard key={tool.id} tool={tool} index={index} />
              ))}
            </motion.div>
          )}

          {/* PAGINATION (PLACEHOLDER) */}
          <div className="flex justify-center mt-12 text-slate-400 text-sm">
            Page 1 · 2 · 3 · Next
          </div>
        </main>
      </div>
    </div>
  );
}
