import React, { ReactNode } from "react";

/**
 * Shared frame for the interactive examples embedded in the docs:
 * a header bar, an optional controls strip, and the graph viewport.
 */
export function DemoShell({
  title,
  controls,
  children,
  height = 380,
}: {
  title: string;
  controls?: ReactNode;
  children: ReactNode;
  height?: number;
}) {
  return (
    <div className="my-6 overflow-hidden rounded-xl border border-slate-700/60 bg-[#0d1019]">
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-2.5">
        <span className="font-mono text-xs text-slate-400">{title}</span>
        <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          Live
        </span>
      </div>
      {controls && (
        <div className="flex flex-wrap items-end gap-x-8 gap-y-4 border-b border-slate-800 bg-[#11141d] px-4 py-4">
          {controls}
        </div>
      )}
      <div className="dgr-dot-grid flex w-full" style={{ height }}>
        {children}
      </div>
    </div>
  );
}

export function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="flex min-w-[200px] flex-col gap-1.5">
      <span className="flex items-baseline justify-between text-xs font-semibold text-slate-300">
        {label}
        <code className="rounded bg-indigo-500/10 px-1.5 py-0.5 font-mono text-[11px] text-indigo-300">
          {value}
        </code>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-700 accent-indigo-400"
      />
    </label>
  );
}

export function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-xs font-semibold text-slate-300">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 cursor-pointer accent-indigo-400"
      />
      {label}
    </label>
  );
}

export function DemoButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="cursor-pointer rounded-lg border border-indigo-400/40 bg-indigo-500/10 px-3.5 py-1.5 text-xs font-semibold text-indigo-300 transition hover:border-indigo-400/80 hover:bg-indigo-500/20"
    >
      {children}
    </button>
  );
}
