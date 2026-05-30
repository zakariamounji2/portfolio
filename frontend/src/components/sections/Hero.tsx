"use client";

import { motion } from "framer-motion";
import { FileText, Mail } from "lucide-react";
import { useMemo, useState, useEffect } from "react";

const roles = [
  "Software Engineer & DevOps Enthusiast",
  "Backend Engineer (Spring Boot)",
  "Cloud & Kubernetes Operator",
  "CI/CD & Automation Advocate"
];

function useTyping(texts: string[], intervalMs = 2400) {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    const current = texts[index];
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;

    const type = () => {
      if (!isDeleting) {
        // Typing
        if (charIndex < current.length) {
          setDisplayText(current.slice(0, charIndex + 1));
          charIndex++;
          timeoutId = setTimeout(type, 60);
        } else {
          // Pause before deleting
          timeoutId = setTimeout(() => {
            isDeleting = true;
            type();
          }, intervalMs);
        }
      } else {
        // Deleting
        if (charIndex > 0) {
          charIndex--;
          setDisplayText(current.slice(0, charIndex));
          timeoutId = setTimeout(type, 40);
        } else {
          // Move to next text
          setIndex((prev) => (prev + 1) % texts.length);
        }
      }
    };

    type();

    return () => clearTimeout(timeoutId);
  }, [index, texts, intervalMs]);

  return displayText;
}

export default function Hero() {
  const typed = useTyping(roles, 3000);

  return (
    <section className="relative" aria-label="Hero">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="flex flex-col gap-5"
      >
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-glow" />
          Student at 1337 School (UM6P)
        </div>

        <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          Zakaria Mounji
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-300">
            {" "}
            {typed}
            <span className="ml-1 inline-block h-[1.1em] w-[2px] animate-pulse bg-cyan-200 align-[-2px]" />
          </span>
        </h1>

        <p className="max-w-2xl text-pretty text-base leading-relaxed text-white/70">
          Backend, DevOps and cloud infrastructure focused. Building reliable APIs with Spring Boot, automating delivery with Jenkins & Kubernetes, and monitoring with Prometheus & Grafana.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/85 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/10"
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <FileText className="h-4 w-4 transition group-hover:rotate-6" />
            GitHub
          </a>

          <a
            className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/85 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/10"
            href="https://linkedin.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <FileText className="h-4 w-4 transition group-hover:rotate-6" />
            LinkedIn
          </a>


          <a
            className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/85 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/10"
            href="mailto:zakariamounji44499@gmail.com"
            aria-label="Email"
          >
            <Mail className="h-4 w-4 transition group-hover:rotate-6" />
            Email
          </a>

          <a
            href="/devops"
            className="ml-auto inline-flex items-center gap-2 rounded-xl bg-cyan-400/15 px-4 py-2 text-sm text-cyan-200 ring-1 ring-cyan-300/30 backdrop-blur transition hover:bg-cyan-400/25"
          >
            Live DevOps Dashboard
            <span className="text-cyan-100">→</span>
          </a>
        </div>

        <div className="mt-10 overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/30 shadow-glow">
          <img
            src="/image1.jpeg"
            alt="Zakaria on stage"
            className="h-90 w-full object-cover transition duration-500 hover:scale-105"
            style={{ objectPosition: "center center" }}
          />
          <div className="px-4 py-4 text-sm text-white/80">
            Captured on stage: a portfolio moment that showcases experience, confidence and design presence.
          </div>
        </div>
      </motion.div>

      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -right-28 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />
    </section>
  );
}

