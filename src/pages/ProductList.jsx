import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { products, formatVND } from "../data/products";
import { useCart } from "../cart/CartContext";

export default function ProductList() {
  const cart = useCart();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => p.name.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Danh sách sản phẩm</h1>
          <p className="mt-1 text-sm text-slate-600">
            Bấm <span className="font-medium">Xem chi tiết</span> hoặc{" "}
            <span className="font-medium">Thêm vào giỏ</span>.
          </p>
        </div>

        <div className="w-full sm:w-80">
          <label className="text-xs font-medium text-slate-600">Tìm kiếm</label>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ví dụ: bàn phím, tai nghe..."
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-slate-900/10 focus:ring-4"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <div
            key={p.id}
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
          >
            <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
              <img
                src={p.image}
                alt={p.name}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-1 text-xs font-medium text-slate-700 backdrop-blur">
                New
              </div>
            </div>

            <div className="space-y-3 p-4">
              <div>
                <div className="line-clamp-1 text-base font-semibold">{p.name}</div>
                <div className="mt-1 text-sm font-semibold text-emerald-700">
                  {formatVND(p.price)}
                </div>
                <p className="mt-2 line-clamp-2 text-sm text-slate-600">{p.description}</p>
              </div>

              <div className="flex gap-2">
                <Link
                  to={`/product/${p.id}`}
                  className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-center text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Xem chi tiết
                </Link>

                <button
                  onClick={() => cart.add(p)}
                  className="flex-1 rounded-xl bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-800 active:scale-[0.99]"
                >
                  Thêm vào giỏ
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <div className="text-sm font-medium">Không tìm thấy sản phẩm phù hợp.</div>
          <div className="mt-1 text-sm text-slate-600">Thử từ khóa khác nhé.</div>
        </div>
      )}
    </div>
  );
}