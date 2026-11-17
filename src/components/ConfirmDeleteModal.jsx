import { Trash2, LoaderCircle } from "lucide-react";

export default function ConfirmDeleteModal({ onClose, onContinue, onLoading }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4 backdrop-blur-sm">
      <div className="animate-pop flex w-full max-w-sm flex-col items-center rounded-3xl bg-surface px-6 py-8 text-center shadow-2xl">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-danger-soft text-danger">
          <Trash2 size={26} />
        </div>
        <h2 className="mt-5 text-xl font-bold text-ink">
          Yakin ingin menghapus?
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Segala data todo akan terhapus.
          <br />
          Aksi tidak dapat dipulihkan.
        </p>
        <div className="mt-7 grid w-full grid-cols-2 gap-3">
          <button
            onClick={() => onClose()}
            disabled={onLoading}
            type="button"
            className="h-11 rounded-xl border border-line bg-surface text-sm font-semibold text-ink transition hover:bg-canvas active:scale-95 disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            onClick={() => onContinue()}
            disabled={onLoading}
            type="button"
            className="h-11 rounded-xl bg-danger text-sm font-semibold text-white transition hover:bg-danger-dark active:scale-95 disabled:opacity-60"
          >
            {onLoading ? (
              <div className="flex justify-center">
                <LoaderCircle size={20} className="animate-spin" />
              </div>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
