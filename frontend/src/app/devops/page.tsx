"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Box, Activity, GitBranch, Server, Gauge } from "lucide-react";

const pipelineStages = [
  { key: "checkout", label: "Checkout", icon: <GitBranch className="h-4 w-4" /> },
  { key: "parallel", label: "Parallel Test / Build", icon: <Activity className="h-4 w-4" /> },
  { key: "registry", label: "Push Registry", icon: <Box className="h-4 w-4" /> },
  { key: "k8s", label: "K8s Deployment", icon: <Server className="h-4 w-4" /> }
] as const;

function sparklinePath(values: number[], width = 220, height = 44) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  return values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * width;
      const y = height - ((v - min) / span) * height;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
}

function MetricCard({
  title,
  subtitle,
  value,
  unit,
  values
}: {
  title: string;
  subtitle: string;
  value: string;
  unit: string;
  values: number[];
}) {
  const d = useMemo(() => sparklinePath(values), [values]);
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-white/90">{title}</div>
          <div className="mt-1 text-xs text-white/60">{subtitle}</div>
        </div>
        <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
          <Gauge className="mr-2 h-4 w-4 text-cyan-200" />
          {value}
          <span className="text-white/60">{unit}</span>
        </div>
      </div>

      <div className="mt-3">
        <svg viewBox="0 0 220 44" className="h-11 w-full" aria-hidden="true">
          <path d={d} fill="none" stroke="rgba(34,211,238,0.85)" strokeWidth="2.25" />
          <path
            d={d + " L 220 44 L 0 44 Z"}
            fill="rgba(34,211,238,0.12)"
          />
        </svg>
      </div>
    </div>
  );
}

function PodHealth() {
  const pods = [
    { name: "api-7b9d9d8c7d-1", status: "Running" },
    { name: "api-7b9d9d8c7d-2", status: "Running" },
    { name: "worker-65f6d5b8d9-1", status: "Running" },
    { name: "worker-65f6d5b8d9-2", status: "Pending" }
  ];

  const badge = (s: string) => {
    if (s === "Running") return "border-emerald-400/30 bg-emerald-400/10 text-emerald-200";
    if (s === "Pending") return "border-amber-400/30 bg-amber-400/10 text-amber-200";
    return "border-rose-400/30 bg-rose-400/10 text-rose-200";
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm font-semibold text-white/90">Pod Health Status</div>
          <div className="mt-1 text-xs text-white/60">Kubernetes mocked view (Prometheus-backed in real life)</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">Live</div>
      </div>

      <div className="mt-4 space-y-2">
        {pods.map((p) => (
          <div key={p.name} className="flex items-center justify-between gap-3 rounded-xl border border-white/5 bg-white/5 px-3 py-2">
            <div className="text-xs text-white/80">{p.name}</div>
            <span className={`rounded-full border px-3 py-1 text-[11px] ${badge(p.status)}`}>
              {p.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DevOpsDashboard() {
  const [activeStage, setActiveStage] = useState(0);
  const [pulse, setPulse] = useState(false);

  const cpuValues = useMemo(() => [12, 19, 15, 22, 26, 18, 24, 28, 21, 27], []);
  const memValues = useMemo(() => [38, 41, 44, 40, 46, 50, 49, 52, 48, 55], []);

  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
              Orchestration Kubernetes & Pipeline Jenkins CI/CD
            </div>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight">DevOps Live Dashboard</h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70">
              Mocked real-time monitoring UI: Jenkins pipeline progression and Kubernetes resource metrics with Prometheus/Grafana-style cards.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setPulse(true);
                setActiveStage((s) => (s + 1) % pipelineStages.length);
                setTimeout(() => setPulse(false), 420);
              }}
              className="rounded-xl bg-cyan-400/15 px-4 py-2 text-sm text-cyan-100 ring-1 ring-cyan-300/30 backdrop-blur transition hover:bg-cyan-400/25"
            >
              Simulate Next Stage
            </button>
          </div>
        </motion.div>

        <div className="grid gap-4 lg:grid-cols-3">
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-md"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Jenkins Pipeline</h2>
              <div className="text-xs text-white/60">Active stage: {pipelineStages[activeStage].label}</div>
            </div>

            <div className="mt-6 space-y-4">
              {pipelineStages.map((st, i) => {
                const isActive = i === activeStage;
                const isDone = i < activeStage;
                return (
                  <button
                    key={st.key}
                    onClick={() => setActiveStage(i)}
                    className={
                      "w-full rounded-2xl border px-4 py-3 text-left transition " +
                      (isActive
                        ? "border-cyan-300/30 bg-cyan-400/10"
                        : isDone
                          ? "border-emerald-300/25 bg-emerald-400/5"
                          : "border-white/10 bg-black/10 hover:bg-white/5")
                    }
                  >
                    <div className="flex items-center gap-3">
                      <div className={"rounded-xl border border-white/10 bg-black/20 p-2" + (isActive ? " shadow-glow" : "")}>{st.icon}</div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-white/90">{st.label}</div>
                        <div className="mt-1 text-xs text-white/60">
                          {isActive
                            ? "Running…"
                            : isDone
                              ? "Completed"
                              : "Queued"}
                        </div>
                      </div>
                      <div
                        className={
                          "text-xs font-semibold rounded-full border px-3 py-1 " +
                          (isActive
                            ? "border-cyan-300/30 bg-cyan-400/15 text-cyan-100"
                            : isDone
                              ? "border-emerald-300/30 bg-emerald-400/10 text-emerald-200"
                              : "border-white/10 bg-black/20 text-white/70")
                        }
                      >
                        {isActive ? "LIVE" : isDone ? "OK" : "—"}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className={`mt-6 rounded-2xl border border-white/10 bg-black/20 p-4 transition ${pulse ? "ring-2 ring-cyan-300/40" : ""}`}>
              <div className="text-xs text-white/60">Pipeline summary</div>
              <div className="mt-2 text-sm text-white/80">
                {activeStage === 0
                  ? "Checkout: repo fetched and Jenkinsfile parsed."
                  : activeStage === 1
                    ? "Parallel: tests and image build running concurrently."
                    : activeStage === 2
                      ? "Registry: images pushed with version tags."
                      : "Kubernetes: Deployments updated using rolling strategies."}
              </div>
            </div>
          </motion.section>

          <motion.aside
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-md"
          >
            <h2 className="text-lg font-semibold">Kubernetes Widgets</h2>
            <div className="mt-4">
              <PodHealth />
            </div>
          </motion.aside>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <MetricCard
            title="CPU Utilization"
            subtitle="Prometheus rate(container_cpu_usage_seconds_total)"
            value="27.4"
            unit="%"
            values={cpuValues}
          />
          <MetricCard
            title="Memory Utilization"
            subtitle="Prometheus sum(container_memory_working_set_bytes)"
            value="55.0"
            unit="%"
            values={memValues}
          />
        </div>

        <div className="mt-4 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-md">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold">Prometheus & Grafana (Mock)</h2>
              <p className="mt-2 text-sm text-white/70">
                In production, these charts are rendered from Prometheus data via Grafana. Here we use placeholders with consistent visual hierarchy.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-xs text-white/60">
              Metrics: pod/*, node/*, deployment/*
            </div>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {["Requests", "Errors", "Latency"].map((k, i) => (
              <div
                key={k}
                className="rounded-2xl border border-white/10 bg-black/20 p-4"
              >
                <div className="text-xs text-white/60">{k}</div>
                <div className="mt-2 text-2xl font-semibold">
                  {i === 0 ? "128" : i === 1 ? "3.2" : "41ms"}
                </div>
                <div className="mt-3 h-2 w-full rounded-full bg-white/5">
                  <div
                    className={
                      "h-2 w-2/3 rounded-full " +
                      (i === 0 ? "bg-cyan-400/70" : i === 1 ? "bg-rose-400/70" : "bg-indigo-400/70")
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

