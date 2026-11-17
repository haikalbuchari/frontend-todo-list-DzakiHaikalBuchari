const STATUS_STYLE = {
  "to-do": "bg-stone-100 text-stone-700 ring-stone-200",
  "in progress": "bg-amber-50 text-amber-800 ring-amber-200",
  done: "bg-emerald-50 text-emerald-800 ring-emerald-200",
};

const PRIORITY_DOT = {
  low: "bg-stone-400",
  medium: "bg-amber-500",
  high: "bg-red-600",
};

export function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${
        STATUS_STYLE[status] || STATUS_STYLE["to-do"]
      }`}
    >
      {status}
    </span>
  );
}

export function PriorityBadge({ priority }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm font-medium capitalize text-ink">
      <span
        className={`h-2 w-2 rounded-full ${PRIORITY_DOT[priority] || PRIORITY_DOT.low}`}
      />
      {priority}
    </span>
  );
}
