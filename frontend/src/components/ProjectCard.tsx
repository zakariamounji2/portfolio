import { ReactNode } from "react";

export type ProjectCardProps = {
  title: string;
  description: string;
  badges: { label: string; icon?: ReactNode }[];
  href?: string;
};

export default function ProjectCard({
  title,
  description,
  badges,
  href
}: ProjectCardProps) {
  const Wrapper = href ? "a" : "div";
  const wrapperProps = href
    ? { href, target: "_blank", rel: "noreferrer" }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/7" +
        (href ? " cursor-pointer" : "")
      }
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-transparent to-indigo-500/10 opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold tracking-tight text-white">
            {title}
          </h3>
          <div className="rounded-xl border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/70">
            Featured
          </div>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-white/75">
          {description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {badges.map((b) => (
            <span
              key={b.label}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/80"
            >
              {b.icon ? (
                <span className="text-white/80">{b.icon}</span>
              ) : null}
              {b.label}
            </span>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
    </Wrapper>
  );
}

