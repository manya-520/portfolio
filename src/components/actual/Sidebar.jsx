import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRightIcon,
  BotMessageSquareIcon,
  ChartColumnIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  DatabaseIcon,
  FolderCodeIcon,
  HouseIcon,
  LayoutGridIcon,
  UserIcon,
  UsersIcon,
} from "./Icons";
import { useHydratedActualPath } from "./useHydratedActualPath";

/** Brand mark — `public/color (4).png` */
const ACTUAL_LOGO_COLOR_SRC = encodeURI("/color (4).png");

const TOP_ITEMS = [
  { label: "Home", href: "/work/actual", Icon: HouseIcon },
  { label: "Insights", href: "/work/actual/insights", Icon: ChartColumnIcon },
];

const ARCH_GROUP = {
  label: "Architecture Agent",
  items: [
    { label: "Decisions", href: "/work/actual/adr", Icon: FolderCodeIcon },
    {
      label: "Advisor",
      href: "/work/actual/advisor",
      Icon: BotMessageSquareIcon,
    },
  ],
};

const MGMT_GROUP = {
  label: "Management Agent",
  items: [
    {
      label: "Organization",
      href: "/work/actual/organization",
      Icon: LayoutGridIcon,
    },
    { label: "Teams", href: "/work/actual/teams", Icon: UsersIcon },
    { label: "Developers", href: "/work/actual/developers", Icon: UserIcon },
    {
      label: "Repositories",
      href: "/work/actual/repositories",
      Icon: DatabaseIcon,
    },
  ],
};

/** Deck `903:5295`–`903:5304`: top-level rows, 14px, #18181b; active bg #f4f4f5 */
function NavTopItem({ href, label, Icon, active }) {
  return (
    <Link
      href={href}
      className={[
        "flex w-full items-center gap-4 rounded px-2 py-1.5 transition-colors",
        active ? "bg-[#f4f4f5]" : "hover:bg-[#f4f4f5]/70",
      ].join(" ")}
    >
      <Icon size={18} className="shrink-0 text-[#18181b]" />
      <span
        className={[
          "min-w-0 flex-1 truncate text-typ-body leading-5 text-[#18181b]",
          active ? "font-semibold" : "font-normal",
        ].join(" ")}
      >
        {label}
      </span>
    </Link>
  );
}

/** Deck `903:5311`+: nested items, 14px regular #3f3f47 */
function NavNestedItem({ href, label, Icon, active }) {
  return (
    <Link
      href={href}
      className={[
        "flex w-full min-w-[128px] items-center gap-4 overflow-hidden rounded p-2 transition-colors",
        active ? "bg-[#f4f4f5]" : "hover:bg-[#f4f4f5]/70",
      ].join(" ")}
    >
      <Icon size={18} className="shrink-0 text-[#3f3f47]" />
      <span
        className={[
          "min-w-0 flex-1 truncate text-typ-body leading-5 text-[#3f3f47]",
          active ? "font-semibold" : "font-normal",
        ].join(" ")}
      >
        {label}
      </span>
    </Link>
  );
}

/** Separate stacked chevrons (workspace / account disclosure affordance). */
function VerticalChevronPair({ className }) {
  return (
    <span
      className={[
        "inline-flex shrink-0 flex-col items-center justify-center gap-0 leading-none",
        className ?? "",
      ].join(" ")}
      aria-hidden
    >
      <ChevronUpIcon size={14} className="text-[#94a3b8]" />
      <ChevronDownIcon size={14} className="-mt-1 text-[#94a3b8]" />
    </span>
  );
}

/** Collapsible nav group: ▼ collapsed, ▲ expanded */
function CollapsibleGroupHeader({ label, expanded, onToggle, panelId }) {
  return (
    <button
      type="button"
      id={`${panelId}-trigger`}
      aria-expanded={expanded}
      aria-controls={panelId}
      onClick={onToggle}
      className="flex h-8 w-full min-w-[128px] items-center justify-between gap-2 overflow-hidden rounded px-2 py-1.5 text-left transition-colors hover:bg-[#f4f4f5]/70"
    >
      <span className="min-w-0 flex-1 truncate text-typ-body font-semibold leading-5 text-[#18181b]">
        {label}
      </span>
      <span className="inline-flex shrink-0 leading-none" aria-hidden>
        {expanded ? (
          <ChevronUpIcon size={16} className="text-[#18181b]" />
        ) : (
          <ChevronDownIcon size={16} className="text-[#18181b]" />
        )}
      </span>
    </button>
  );
}

function routeMatchesPath(path, href) {
  if (!path) return false;
  if (href === "/work/actual") return path === "/work/actual";
  return path === href || path.startsWith(`${href}/`);
}

export default function Sidebar() {
  const { path } = useHydratedActualPath();
  const [archOpen, setArchOpen] = useState(true);
  const [mgmtOpen, setMgmtOpen] = useState(true);

  const isActive = (href) => routeMatchesPath(path, href);

  useEffect(() => {
    if (!path) return;
    if (ARCH_GROUP.items.some((it) => routeMatchesPath(path, it.href))) {
      setArchOpen(true);
    }
    if (MGMT_GROUP.items.some((it) => routeMatchesPath(path, it.href))) {
      setMgmtOpen(true);
    }
  }, [path]);

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-[100dvh] w-[220px] flex-col justify-between border-r border-[#e2e8f0] bg-[#fafafa]">
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex h-[68px] shrink-0 flex-col justify-center border-b border-[#e5e5e5] px-6 py-2">
          <Link
            href="/work/actual"
            className="flex w-full items-center gap-2 overflow-hidden rounded-md py-2"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-black">
              <img
                src={ACTUAL_LOGO_COLOR_SRC}
                alt=""
                width={32}
                height={32}
                className="h-full w-full object-contain p-0.5"
              />
            </span>
            <span className="min-w-0 flex-1 truncate text-typ-body font-semibold leading-none text-[#334155]">
              Actual AI
            </span>
            <VerticalChevronPair />
          </Link>
        </div>

        <nav className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain px-4 py-2">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              {TOP_ITEMS.map((it) => (
                <NavTopItem
                  key={it.href}
                  {...it}
                  active={isActive(it.href)}
                />
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <CollapsibleGroupHeader
                label={ARCH_GROUP.label}
                expanded={archOpen}
                onToggle={() => setArchOpen((o) => !o)}
                panelId="sidebar-arch-panel"
              />
              {archOpen ? (
                <div
                  id="sidebar-arch-panel"
                  role="region"
                  aria-labelledby="sidebar-arch-panel-trigger"
                  className="flex flex-col gap-2"
                >
                  {ARCH_GROUP.items.map((it) => (
                    <NavNestedItem
                      key={it.href}
                      {...it}
                      active={isActive(it.href)}
                    />
                  ))}
                </div>
              ) : null}
            </div>

            <div className="flex flex-col gap-2">
              <CollapsibleGroupHeader
                label={MGMT_GROUP.label}
                expanded={mgmtOpen}
                onToggle={() => setMgmtOpen((o) => !o)}
                panelId="sidebar-mgmt-panel"
              />
              {mgmtOpen ? (
                <div
                  id="sidebar-mgmt-panel"
                  role="region"
                  aria-labelledby="sidebar-mgmt-panel-trigger"
                  className="flex flex-col gap-2"
                >
                  {MGMT_GROUP.items.map((it) => (
                    <NavNestedItem
                      key={it.href}
                      {...it}
                      active={isActive(it.href)}
                    />
                  ))}
                </div>
              ) : null}
            </div>

            <div className="flex flex-col pb-2">
              <div className="flex h-8 w-full min-w-[128px] items-center justify-between gap-2 overflow-hidden rounded px-2 py-1.5">
                <span className="truncate text-typ-body font-semibold leading-5 text-[#18181b]">
                  Configuration
                </span>
                <ChevronDownIcon
                  size={16}
                  className="shrink-0 text-[#18181b]"
                  aria-hidden
                />
              </div>
            </div>
          </div>
        </nav>
      </div>

      <div className="shrink-0 bg-[#fafafa]">
        <div className="p-4">
          <div className="flex flex-col gap-3 overflow-hidden rounded-lg border border-[#dbeafe] bg-gradient-to-r from-[#EFFBF3] to-[#E8F0FC] p-4">
            <p className="text-typ-body font-semibold text-actual-welcome">
              Take a Product Tour
            </p>
            <p className="text-typ-body font-normal text-actual-mute">
              New here? Get a quick walkthrough of how everything works.
            </p>
            <button
              type="button"
              className="inline-flex items-center gap-1 self-start text-typ-body font-medium text-black"
            >
              Start Tour
              <ArrowRightIcon size={12} />
            </button>
          </div>
        </div>

        <div className="border-t border-[#E5E5E5]">
          <div className="px-2 pb-2 pt-4">
            <div className="flex items-center gap-2 overflow-hidden rounded-md p-2">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#fbcfe8] to-[#a78bfa] text-typ-body font-semibold leading-none text-white">
                M
              </span>
              <div className="min-w-0 flex-1 text-[#334155]">
                <p className="truncate text-typ-body font-semibold leading-none">
                  manya@actual..
                </p>
                <p className="truncate text-typ-helper font-normal leading-4">
                  Admin
                </p>
              </div>
              <VerticalChevronPair />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
