"use client";

import { motion } from "framer-motion";
import { Code2, Layers, Boxes, Wrench, Cpu } from "lucide-react";

type Category = {
  title: string;
  icon: React.ReactNode;
  items: string[];
};

const categories: Category[] = [
  {
    title: "Languages",
    icon: <Code2 className="h-4 w-4 text-cyan-200" />,
    items: ["Java", "TypeScript", "Python", "Bash"]
  },
  {
    title: "Frameworks",
    icon: <Layers className="h-4 w-4 text-cyan-200" />,
    items: ["Spring Boot", "Next.js", "React"]
  },
  {
    title: "DevOps / Infra",
    icon: <Wrench className="h-4 w-4 text-cyan-200" />,
    items: [
      "Docker",
      "Kubernetes",
      "Jenkins",
      "Prometheus",
      "Grafana"
    ]
  }
];

function Pill({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
      {text}
    </span>
  );
}

export default function AboutStack() {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid gap-5 md:grid-cols-3"
      >
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold tracking-tight">About & Tech Stack</h2>
          <p className="mt-2 text-sm leading-relaxed text-white/70">
            I’m Zakaria Mounji, a student at 1337 School (UM6P) and a Software Engineer
            specializing in Backend, DevOps, and cloud infrastructure. I build robust,
            observable systems—from CI/CD pipelines to Kubernetes deployments.
          </p>
        </div>

        <div className="flex items-center justify-start gap-3 md:justify-end">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/70">
            <Cpu className="h-4 w-4 text-cyan-200" />
            Reliability & Observability
          </span>
        </div>
      </motion.div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {categories.map((c) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="rounded-2xl border border-white/10 bg-black/20 p-4"
          >
            <div className="flex items-center gap-2">
              {c.icon}
              <h3 className="text-sm font-semibold text-white/90">{c.title}</h3>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {c.items.map((it) => (
                <Pill key={it} text={it} />
              ))}
            </div>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="rounded-2xl border border-white/10 bg-cyan-400/5 p-4 md:col-span-3"
        >
          <div className="flex items-center gap-2">
            <Boxes className="h-4 w-4 text-cyan-200" />
            <h3 className="text-sm font-semibold text-white/90">How I work</h3>
          </div>
          <ul className="mt-2 space-y-1 text-sm text-white/70">
            <li>• Backend-first: clean REST design with Spring Boot.</li>
            <li>• DevOps mindset: Docker/Kubernetes pipelines with Jenkins CI/CD.</li>
            <li>• Metrics-driven monitoring with Prometheus & Grafana.</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

