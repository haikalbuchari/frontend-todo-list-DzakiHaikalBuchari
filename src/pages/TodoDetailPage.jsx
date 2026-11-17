import { LoaderCircle, ArrowLeft, Pencil, CalendarDays } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddTodoModal from "../components/AddTodoModal";
import { StatusBadge, PriorityBadge } from "../components/Badges";

export default function TodoDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [update, setUpdate] = useState(false);

  // TODO: fetch detail data setiap halaman di-mount ke layar

  // TODO: buat function untuk fetch detail data

  const metaLabel = "text-xs font-bold uppercase tracking-wider text-muted";

  return loading ? (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <LoaderCircle className="animate-spin text-brand" size={52} />
      <h1 className="text-xl font-bold">Fetching todo detail...</h1>
    </div>
  ) : (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl">
        <button
          onClick={() => navigate("/")}
          className="mb-4 flex items-center gap-2 text-sm font-semibold text-muted transition hover:text-ink"
        >
          <ArrowLeft size={16} />
          Kembali
        </button>

        <div className="grid gap-8 overflow-hidden rounded-3xl border border-line border-t-8 border-t-fuchsia-500 bg-surface p-6 shadow-xl shadow-violet-900/10 sm:p-8 md:grid-cols-3">
          <div className="flex flex-col gap-6 md:col-span-2">
            <div className="flex flex-col gap-2">
              <span className={metaLabel}>Judul</span>
              <h1 className="text-3xl font-extrabold leading-tight tracking-tight">
                {data.title}
              </h1>
            </div>

            <div className="flex flex-col gap-2">
              <span className={metaLabel}>Deskripsi</span>
              <div className="h-40 overflow-y-auto rounded-2xl bg-canvas p-4 text-sm leading-relaxed text-ink">
                {data.description}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5 md:border-l md:border-line md:pl-8">
            <div className="flex flex-col gap-2">
              <span className={metaLabel}>Status</span>
              <div>
                <StatusBadge status={data.status} />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className={metaLabel}>Prioritas</span>
              <PriorityBadge priority={data.priority} />
            </div>

            <div className="flex flex-col gap-2">
              <span className={metaLabel}>Deadline</span>
              <p className="flex items-center gap-2 text-sm font-medium">
                <CalendarDays size={16} className="text-muted" />
                {data?.deadline?.split("T")[0]}
              </p>
            </div>

            <div className="mt-auto grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => navigate("/")}
                className="h-10 rounded-xl border border-line bg-surface text-sm font-semibold text-ink transition hover:bg-canvas active:scale-95"
              >
                Kembali
              </button>
              <button
                onClick={() => setUpdate(true)}
                className="flex h-10 items-center justify-center gap-1.5 rounded-xl bg-brand text-sm font-semibold text-white transition hover:bg-brand-dark active:scale-95"
              >
                <Pencil size={14} />
                Update
              </button>
            </div>

            {update && (
              <AddTodoModal
                onClose={() => setUpdate(false)}
                onUpdate={fetchTodoDetail}
                description="Update Todo"
                todoData={data}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
