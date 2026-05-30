"use client";

import { useEffect, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import { Project } from "@/types";
import { motion } from "framer-motion";

async function fetchProjects(): Promise<Project[]> {
  // Use environment variable in production, fallback to localhost for development
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
  
  const res = await fetch(`${apiUrl}/api/projects`, {
    headers: { "Content-Type": "application/json" },
    cache: "no-store"
  });
  
  if (!res.ok) throw new Error("Failed to load projects");
  return (await res.json()) as Project[];
}

const fallback: Project[] = [
  {
    id: "flagship",
    title: "Orchestration Kubernetes & Pipeline Jenkins CI/CD",
    coreStack: [
      "Jenkins",
      "Kubernetes",
      "Docker",
      "Prometheus",
      "Grafana",
      "Spring Boot",
      "Next.js"
    ],
    descriptionBullets: [
      "Conception et automatisation d’un pipeline CI/CD complet via un Jenkinsfile pour builder, tester et conteneuriser une application micro-services.",
      "Déploiement et gestion de l’infrastructure sur un cluster Kubernetes en utilisant des objets natifs (Deployments, Services, Ingress, PV/PVC).",
      "Mise en place de stratégies de mise à jour (Rolling Updates) et supervision des ressources avec Prometheus et Grafana."
    ],
    websiteUrl: null,
    repoUrl: null
  }
];

function badgeLabelFromCoreStack(s: string) {
  return s;
}

export default function ProjectsShowcase() {
  const [projects, setProjects] = useState<Project[]>(fallback);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    
    fetchProjects()
      .then((data) => {
        if (mounted && data && data.length > 0) setProjects(data);
      })
      .catch(() => {
        if (mounted) setProjects(fallback);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
      
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section aria-label="Projects" className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-md">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Projects Showcase</h2>
          <p className="mt-2 text-sm text-white/70">
            A selection of infrastructure and backend projects.
          </p>
        </div>
        <div className="text-xs text-white/60">{loading ? "Loading…" : `${projects.length} projects`}</div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {projects.map((p, idx) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
          >
            <ProjectCard
              href={p.websiteUrl ?? undefined}
              title={p.title}
              description={p.descriptionBullets.join("\n")}
              badges={p.coreStack.map((s) => ({ label: badgeLabelFromCoreStack(s) }))}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
