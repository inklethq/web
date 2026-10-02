"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { rise, riseIn } from "@/lib/motion";

export default function PortalHero() {
  return (
    <section className="min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-12 lg:gap-14 items-center py-20">
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
            className="text-lg text-[#888] leading-relaxed max-w-md"
          >
            Send a note, a link, a picture, or a PDF from the browser, your
            Mac, or any app. inklet keeps all of it, turns what you choose into
            cards for the right panel, and answers questions about everything
            you saved.
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
          <Image
            src="/portal/mac-home.png"
            alt="inklet Portal for Mac on its Home page: the weather, an activity grid of saved items, and the displays with what each is showing"
            width={2172}
            height={1434}
            priority
            sizes="(min-width: 1152px) 640px, (min-width: 1024px) 56vw, calc(100vw - 48px)"
            className="w-full h-auto"
          />
        </motion.div>
      </div>
    </section>
  );
}
