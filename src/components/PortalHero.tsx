"use client";

import { motion } from "framer-motion";
import { rise, riseIn } from "@/lib/motion";

const cards = [
  { room: "Kitchen", widths: ["w-full", "w-3/4", "w-1/2"], caption: "Grocery list · on the screen" },
  { room: "Study", widths: ["w-full", "w-5/6", "w-2/3"], caption: "Daily summary · waiting" },
  { room: "Hallway", widths: ["w-full", "w-4/5"], caption: "Weather · on the screen" },
];

function DashboardMockup() {
  return (
    <div className="bg-[#111] rounded-2xl overflow-hidden border border-[#2a2a2a]">
      <div className="flex items-center justify-between px-5 py-3 border-b border-[#2a2a2a]">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-xs font-[family-name:var(--font-ibm-plex-mono)] text-[#555]">
          portal.iminklet.com
        </span>
      </div>

      <div className="p-5">
        <p className="font-[family-name:var(--font-newsreader)] text-sm text-[#f5f3ed] mb-3">
          What should your home know?
        </p>
        <div className="flex items-center justify-between gap-3 bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] px-3 py-2 mb-6">
          <span className="text-[10px] text-[#555] truncate">
            Write a note, paste a link, drop a picture…
          </span>
          <span className="shrink-0 text-[9px] font-[family-name:var(--font-ibm-plex-mono)] text-[#888] border border-[#333] rounded-full px-2 py-0.5">
            Just Upload ▾
          </span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-[family-name:var(--font-ibm-plex-mono)] text-[#555] uppercase tracking-wider">
            Your displays
          </span>
          <span className="text-[10px] font-[family-name:var(--font-ibm-plex-mono)] text-[#555]">
            3 of 3 online
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          {cards.map((card) => (
            <div key={card.room} className="bg-[#1a1a1a] rounded-lg p-3 border border-[#2a2a2a]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#f5f3ed]">{card.room}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#28c840]" />
              </div>
              <div className="space-y-1.5">
                {card.widths.map((width) => (
                  <div key={width} className={`h-1.5 bg-[#2a2a2a] rounded ${width}`} />
                ))}
              </div>
              <span className="text-[9px] text-[#555] mt-2 block font-[family-name:var(--font-ibm-plex-mono)]">
                {card.caption}
              </span>
            </div>
          ))}

          <div className="bg-[#1a1a1a] rounded-lg p-3 border border-dashed border-[#333] flex items-center justify-center min-h-[88px]">
            <span className="text-[#333] text-lg">+</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-[#2a2a2a]">
          <span className="text-[10px] text-[#555] font-[family-name:var(--font-ibm-plex-mono)]">
            Reading your notes · 3 read
          </span>
          <span className="text-[10px] text-[#555] font-[family-name:var(--font-ibm-plex-mono)]">
            ●
          </span>
        </div>
      </div>
    </div>
  );
}

export default function PortalHero() {
  return (
    <section className="min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center py-20">
        <div>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={rise}
            className="eyebrow text-[#777] mb-3"
          >
            Software
          </motion.p>
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={rise}
            className="font-[family-name:var(--font-newsreader)] text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] mb-6"
          >
            inklet Portal
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={riseIn(0.15)}
            className="text-lg text-[#888] leading-relaxed max-w-lg"
          >
            Your cloud dashboard for ambient life. Send a note, a link, a
            picture, or a PDF — from the browser, from your Mac, or from any
            app with one shortcut. Say whether it should become a card, then
            watch inklet&apos;s agent lay it out, choose a panel, and deliver it.
          </motion.p>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={riseIn(0.25)}
            className="flex items-center gap-4 mt-8"
          >
            <a
              href="https://portal.iminklet.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-7 py-3 bg-[#f5f3ed] text-[#1a1a1a] rounded-full text-sm font-medium hover:bg-[#e8e5db] transition-colors"
            >
              Get Started
            </a>
            <a
              href="#download"
              className="inline-flex items-center px-7 py-3 border border-[#333] text-[#888] rounded-full text-sm font-medium hover:border-[#555] hover:text-[#f5f3ed] transition-colors"
            >
              Download
            </a>
          </motion.div>
        </div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={riseIn(0.3)}
        >
          <DashboardMockup />
        </motion.div>
      </div>
    </section>
  );
}
