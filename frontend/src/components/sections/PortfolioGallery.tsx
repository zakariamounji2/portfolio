"use client";

import { motion } from "framer-motion";

const portfolioImages = [
  {
    src: "/image1.jpeg",
    title: "HackAI Stage Presentation",
    description: "Participated in HackAI and presented the project on stage, showing my role in the event and my technical communication skills.",
    alt: "Zakaria on stage at HackAI"
  },
  {
    src: "/image2.jpeg",
    title: "Hackathon Collaboration",
    description: "Worked with a team at HackAI to design and build an app under pressure, learning rapid prototyping and real-time problem solving.",
    alt: "Zakaria collaborating during a hackathon"
  },
  {
    src: "/image3.jpeg",
    title: "Mobile App Development",
    description: "Experience building mobile applications from idea to deployment, including UI, backend integration, and user testing.",
    alt: "Zakaria building a mobile app"
  },
  {
    src: "/image4.jpeg",
    title: "Project Demo",
    description: "Demonstrated a working application with live features and explained the architecture, backend services, and user flows.",
    alt: "Zakaria demoing a project"
  },
  {
    src: "/image5.jpeg",
    title: "Event Leadership",
    description: "Led discussions and shared insights at events, highlighting my ability to deliver technical presentations and mentor peers.",
    alt: "Zakaria leading an event session"
  }
];

export default function PortfolioGallery() {
  return (
    <section aria-label="Portfolio Gallery" className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-md">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Portfolio Highlights</h2>
          <p className="mt-2 text-sm text-white/70">
            A visual story of my HackAI participation, event demos, and application-building experience.
          </p>
        </div>
        <div className="text-xs text-white/60">Images from public/image1.jpeg to image5.jpeg</div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {portfolioImages.map((image, index) => (
          <motion.div
            key={image.src}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.05 }}
            className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/30"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="h-72 w-full object-cover transition duration-500 hover:scale-105"
            />
            <div className="space-y-2 bg-black/40 px-4 py-4 text-white/80 backdrop-blur-sm">
              <h3 className="text-sm font-semibold text-white">{image.title}</h3>
              <p className="text-xs leading-relaxed text-white/70">{image.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
