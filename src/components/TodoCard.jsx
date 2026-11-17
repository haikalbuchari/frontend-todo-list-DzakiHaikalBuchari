import { Trash2, Eye, LoaderCircle, CalendarDays } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { StatusBadge, PriorityBadge } from "./Badges";

export const ROW_GRID =
  "md:grid md:grid-cols-[minmax(0,2.5fr)_1fr_1fr_1.2fr_104px] md:items-center md:gap-4";

export default function TodoCard({
  id,
  judul,
  status,
  prioritas,
  deadline,
  onDelete,
}) {
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/todos/${id}`,
        { method: "DELETE" },
      );

      const result = await response.json();

      onDelete();

      console.log(result.message);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setConfirm(false);
    }
  }

  return (
    <div
      className={`flex flex-wrap items-center gap-x-4 gap-y-3 rounded-2xl border border-line bg-surface px-5 py-4 shadow-sm transition-shadow hover:shadow-md ${ROW_GRID}`}
    >
      <h2 className="w-full truncate font-semibold text-ink md:w-auto">
        {judul}
      </h2>
      <div>
        <StatusBadge status={status} />
      </div>
      <div>
        <PriorityBadge priority={prioritas} />
      </div>
      <div className="flex items-center gap-2 text-sm text-muted">
        <CalendarDays size={16} />
        {deadline.split("T")[0]}
      </div>

      <div className="ml-auto flex justify-end gap-2">
        <button
          onClick={() => navigate(`/todo/${id}`)}
          aria-label="Lihat detail"
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-soft text-brand transition hover:bg-brand hover:text-white active:scale-90"
        >
          <Eye size={18} />
        </button>

        <button
          onClick={() => setConfirm(true)}
          aria-label="Hapus todo"
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-danger-soft text-danger transition hover:bg-danger hover:text-white active:scale-90"
        >
          {loading ? (
            <LoaderCircle size={18} className="animate-spin" />
          ) : (
            <Trash2 size={18} />
          )}
        </button>
        {confirm && (
          <ConfirmDeleteModal
            onClose={() => setConfirm(false)}
            onContinue={() => handleDelete()}
            onLoading={loading}
          />
        )}
      </div>
    </div>
  );
}
