import { LoaderCircle, X } from "lucide-react";
import { useState } from "react";

const field =
  "w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm text-ink transition placeholder:text-muted/60";
const label = "text-sm font-semibold text-ink";

export default function AddTodoModal({
  onClose,
  onUpdate,
  description,
  todoData,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState({
    title: todoData?.title || "",
    description: todoData?.description || "",
    status: todoData?.status || "to-do",
    priority: todoData?.priority || "low",
    deadline: todoData?.deadline?.split("T")[0] || "",
  });

  function handleChange(e) {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit() {
    try {
      setLoading(true);
      setError("");

      if (!data.title || !data.description || !data.deadline) {
        return setError("Semua Field Diperlukan!");
      }

      const isUpdate = Boolean(todoData?.id);

      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/todos${isUpdate ? `/${todoData.id}` : ""}`,
        {
          method: isUpdate ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );
      onUpdate();
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-ink/40 p-4 backdrop-blur-sm">
      <div className="animate-pop my-auto w-full max-w-lg rounded-3xl bg-surface p-6 shadow-2xl sm:p-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-extrabold tracking-tight">
            {description}
          </h1>
          <button
            onClick={onClose}
            aria-label="Tutup"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted transition hover:bg-canvas hover:text-ink"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className={label}>Judul</label>
            <input
              type="text"
              name="title"
              value={data.title}
              onChange={handleChange}
              placeholder="Apa yang perlu dikerjakan?"
              className={field}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={label}>Deskripsi</label>
            <textarea
              name="description"
              value={data.description}
              onChange={handleChange}
              rows={4}
              placeholder="Tulis detail singkat..."
              className={`${field} resize-none`}
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className={label}>Status</label>
              <select
                name="status"
                value={data.status}
                onChange={handleChange}
                className={field}
              >
                <option value="to-do">to-do</option>
                <option value="in progress">in progress</option>
                <option value="done">done</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={label}>Prioritas</label>
              <select
                name="priority"
                value={data.priority}
                onChange={handleChange}
                className={field}
              >
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={label}>Deadline</label>
            <input
              name="deadline"
              value={data.deadline}
              onChange={handleChange}
              type="date"
              className={field}
            />
          </div>

          {error && (
            <p className="rounded-xl bg-danger-soft px-4 py-2.5 text-center text-sm font-semibold text-danger">
              {error}
            </p>
          )}

          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              disabled={loading}
              className="h-11 rounded-xl border border-line bg-surface text-sm font-semibold text-ink transition hover:bg-canvas active:scale-95 disabled:opacity-60"
              onClick={onClose}
            >
              Batal
            </button>
            <button
              disabled={loading}
              className="h-11 rounded-xl bg-brand text-sm font-semibold text-white transition hover:bg-brand-dark active:scale-95 disabled:opacity-60"
              onClick={handleSubmit}
            >
              {loading ? (
                <div className="flex justify-center">
                  <LoaderCircle size={20} className="animate-spin" />
                </div>
              ) : todoData ? (
                "Update"
              ) : (
                "Tambah"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
