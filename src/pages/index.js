import Link from "next/link";

const projects = [
  {
    slug: "/work/actual",
    name: "Actual AI",
    description: "Agentic developer tools platform",
  },
  {
    slug: "/work/superlabs",
    name: "Super Labs",
    description: "AI marketplace for non-technical businesses",
  },
  {
    slug: "/work/bounteous",
    name: "Bounteous",
    description: "AI compliance platform for telecom",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100">
      {/* Ambient depth — very subtle, not a “hero gradient” cliché */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.55]"
        aria-hidden
      >
        <div className="absolute left-1/2 top-0 h-[520px] w-[720px] -translate-x-1/2 rounded-full bg-zinc-500/[0.07] blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-[280px] w-[480px] rounded-full bg-zinc-700/[0.05] blur-[90px]" />
      </div>

      <main className="relative mx-auto flex min-h-screen max-w-xl flex-col justify-center px-6 py-20 sm:px-8 md:py-28">
        <header className="mb-14 text-center sm:mb-16">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-600">
            Work
          </p>
          <h1 className="mt-4 text-[1.65rem] font-semibold tracking-[-0.03em] text-zinc-50 sm:text-[1.85rem]">
            portfolui
          </h1>
          <p className="mx-auto mt-3 max-w-[19rem] text-sm font-normal leading-relaxed text-zinc-500">
            UI projects and prototypes—product design.
          </p>
        </header>

        <ul className="flex flex-col gap-3.5 sm:gap-4">
          {projects.map((project) => (
            <li key={project.slug}>
              <Link
                href={project.slug}
                className="group relative block overflow-hidden rounded-2xl border border-zinc-800/90 bg-zinc-900/[0.35] px-6 py-6 shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset] outline-none transition-[border-color,background-color,box-shadow,transform] duration-300 ease-out hover:border-zinc-600/80 hover:bg-zinc-900/60 hover:shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset,0_20px_50px_-28px_rgba(0,0,0,0.9)] focus-visible:ring-2 focus-visible:ring-zinc-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] sm:px-7 sm:py-7"
              >
                <span
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden
                >
                  <span className="absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-transparent" />
                </span>

                <div className="relative flex items-start justify-between gap-6">
                  <div className="min-w-0 flex-1">
                    <h2 className="text-[1.0625rem] font-semibold tracking-[-0.02em] text-zinc-100 sm:text-lg">
                      {project.name}
                    </h2>
                    <p className="mt-2 text-[0.8125rem] font-normal leading-relaxed text-zinc-500 sm:text-sm">
                      {project.description}
                    </p>
                  </div>
                  <span className="mt-0.5 shrink-0 text-[0.8125rem] font-medium tabular-nums text-zinc-600 transition-colors duration-300 group-hover:text-zinc-300">
                    View
                    <span
                      className="ml-1 inline-block transition-transform duration-300 ease-out group-hover:translate-x-0.5"
                      aria-hidden
                    >
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
