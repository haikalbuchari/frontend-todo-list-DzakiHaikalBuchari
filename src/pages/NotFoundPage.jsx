import { Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-8 px-4 text-center">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-9xl font-extrabold tracking-tighter text-brand">
          404
        </h1>
        <p className="text-2xl font-bold">Halaman tidak ditemukan</p>
        <p className="text-sm text-muted">
          Alamat yang kamu tuju tidak ada atau sudah dipindahkan.
        </p>
      </div>

      <Link
        to="/"
        className="flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-dark active:scale-95"
      >
        <Home size={18} />
        Kembali ke beranda
      </Link>
    </div>
  );
}
