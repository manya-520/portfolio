import { useCallback, useEffect, useId, useMemo, useState } from "react";
import { createPortal } from "react-dom";

import { Switch } from "@/components/ui/switch";

const AGENTS = [
  "Claude",
  "Cursor",
  "Cline",
  "Aider",
  "Github Copilot",
  "Gemini",
  "Windsurf",
  "AWS Kiro",
];

const DEFAULT_ON = { Claude: true, Cursor: true };

/**
 * “Your coding agents” dialog — Figma Deck `913:2061`–`913:2177` (modal over app).
 */
export default function CodingAgentsModal({ open, onClose, onConfirm }) {
  const titleId = useId();
  const [mounted, setMounted] = useState(false);
  const [agents, setAgents] = useState(() => {
    const initial = {};
    for (const name of AGENTS) initial[name] = Boolean(DEFAULT_ON[name]);
    return initial;
  });

  const enabledCount = useMemo(
    () => Object.values(agents).filter(Boolean).length,
    [agents]
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open || typeof document === "undefined") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const setAgent = useCallback((name, value) => {
    setAgents((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleConfirm = useCallback(() => {
    onConfirm?.();
  }, [onConfirm]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label="Close dialog"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-[101] flex max-h-[min(90vh,880px)] w-full max-w-[720px] flex-col gap-6 overflow-y-auto rounded-lg border border-actual-card bg-white p-8 shadow-2xl sm:p-10"
      >
        <div className="flex flex-col text-center">
          <h2
            id={titleId}
            className="text-[1.125rem] font-bold leading-8 text-actual-welcome"
          >
            Your coding agents
          </h2>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-typ-header font-semibold text-actual-welcome">
              Coding Agents
            </span>
            <span className="inline-flex h-6 items-center rounded-lg bg-actual-card px-3 text-typ-body font-medium text-actual-text">
              {enabledCount} Enabled
            </span>
          </div>
          <p className="text-typ-body text-actual-mute">
            Select which AI coding agents to generate rule files for. Only enabled
            agents will be included.
          </p>

          <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {AGENTS.map((name) => {
              const switchId = `${titleId}-${name.replace(/\s+/g, "-")}`;
              return (
                <label
                  key={name}
                  htmlFor={switchId}
                  className="flex cursor-pointer items-center gap-2 rounded-lg border border-actual-card bg-white p-4"
                >
                  <span className="min-w-0 flex-1">
                    <span className="text-typ-body font-semibold text-actual-welcome">
                      {name}
                    </span>
                  </span>
                  <Switch
                    id={switchId}
                    checked={agents[name]}
                    onCheckedChange={(v) => setAgent(name, v)}
                  />
                </label>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 min-w-[96px] items-center justify-center rounded border border-[#d1d9e0] bg-white px-4 text-typ-body font-semibold text-black hover:bg-actual-subtle"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="inline-flex h-10 min-w-[96px] items-center justify-center rounded-md bg-black px-4 text-typ-body font-semibold text-white shadow-actualCard hover:bg-zinc-900"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
