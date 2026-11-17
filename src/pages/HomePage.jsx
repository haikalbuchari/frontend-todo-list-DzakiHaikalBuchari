import { useEffect, useState } from "react";
import TodoCard, { ROW_GRID } from "../components/TodoCard";
import AddTodoModal from "../components/AddTodoModal";
import {
  Ghost,
  LoaderCircle,
  Plus,
  Search,
  Layers,
  ListTodo,
  Timer,
  CircleCheck,
  SearchX,
} from "lucide-react";

const FILTERS = [
  { key: "all", label: "Semua" },
  { key: "to-do", label: "To-do" },
  { key: "in progress", label: "In progress" },
  { key: "done", label: "Done" },
];

export default function HomePage() {
  const [todoModal, setTodoModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  // TODO: fetch data setiap halaman di-mount ke layar

  // TODO: buat function untuk fetch data

  function handleDelete(id) {
    setData((prev) => prev.filter((e) => e.id != id));
  }

  const count = (s) => data.filter((t) => t.status === s).length;
  const stats = [
    { label: "Total", value: data.length, icon: Layers, tone: "bg-violet-100 text-violet-700" },
    { label: "To-do", value: count("to-do"), icon: ListTodo, tone: "bg-slate-100 text-slate-700" },
    { label: "In progress", value: count("in progress"), icon: Timer, tone: "bg-amber-100 text-amber-700" },
    { label: "Done", value: count("done"), icon: CircleCheck, tone: "bg-emerald-100 text-emerald-700" },
  ];

  const filtered = data.filter(
    (t) =>
      (filter === "all" || t.status === filter) &&
      t.title?.toLowerCase().includes(query.toLowerCase()),
  );

  const headCls = "text-xs font-bold uppercase tracking-wider text-muted";

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-violet-700 via-fuchsia-600 to-pink-500 px-4 pb-28 pt-10 sm:px-8">
        <header className="mx-auto flex max-w-5xl items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-white/80">
              Daftar tugasmu ✨
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Todo List
            </h1>
          </div>
          <button
            onClick={() => setTodoModal((prev) => !prev)}
            className="flex shrink-0 items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-brand shadow-lg transition hover:bg-violet-50 active:scale-95"
          >
            <Plus size={18} />
            Tambah Todo
          </button>
        </header>
      </div>

      <div className="mx-auto -mt-20 flex max-w-[68rem] flex-col gap-6 px-4 pb-12 sm:px-8">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {stats.map(({ label, value, icon: Icon, tone }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-4 shadow-lg shadow-violet-900/5"
            >
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${tone}`}
              >
                <Icon size={22} />
              </div>
              <div>
                <p className="text-2xl font-extrabold leading-none">{value}</p>
                <p className="mt-1 text-xs font-semibold text-muted">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {todoModal && (
          <AddTodoModal
            onClose={() => setTodoModal(false)}
            description={"Tambah Todo"}
            onUpdate={() => fetchData()}
          />
        )}

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                  filter === f.key
                    ? "bg-brand text-white shadow-md shadow-violet-500/30"
                    : "bg-surface text-muted ring-1 ring-inset ring-line hover:text-ink"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="relative md:w-64">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari todo..."
              className="w-full rounded-xl border border-line bg-surface py-2.5 pl-10 pr-3 text-sm"
            />
          </div>
        </div>

        {filtered.length != 0 ? (
          <div className={`hidden px-5 ${ROW_GRID}`}>
            <h2 className={headCls}>Judul</h2>
            <h2 className={headCls}>Status</h2>
            <h2 className={headCls}>Prioritas</h2>
            <h2 className={headCls}>Deadline</h2>
            <h2 className={`${headCls} text-right`}>Aksi</h2>
          </div>
        ) : (
          <div className="flex items-center justify-center py-16">
            <div className="flex flex-col items-center gap-4 text-center">
              {loading ? (
                <>
                  <LoaderCircle size={52} className="animate-spin text-brand" />
                  <h2 className="text-xl font-bold">Mengambil Data</h2>
                </>
              ) : data.length != 0 ? (
                <>
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-brand-soft text-brand">
                    <SearchX size={44} />
                  </div>
                  <h2 className="text-xl font-bold">Tidak ada hasil</h2>
                  <p className="text-sm text-muted">
                    Coba ubah kata kunci atau filter.
                  </p>
                </>
              ) : (
                <>
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-brand-soft text-brand">
                    <Ghost size={44} className="animate-pulse" />
                  </div>
                  <h2 className="text-xl font-bold leading-snug">
                    Belum ada <br /> Todo List
                  </h2>
                  <p className="text-sm text-muted">
                    Klik “Tambah Todo” untuk mulai mencatat.
                  </p>
                </>
              )}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3">
          {filtered.map((todo) => (
            <TodoCard
              key={todo.id}
              id={todo.id}
              judul={todo.title}
              status={todo.status}
              prioritas={todo.priority}
              deadline={todo.deadline}
              onDelete={() => handleDelete(todo.id)}
              onUpdate={() => fetchData()}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
