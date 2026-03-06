import React from "react";
import { Link, useParams } from "react-router-dom";
import { products, formatVND } from "../data/products";
import { useCart } from "../cart/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const cart = useCart();

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8">
        <div className="text-lg font-semibold">Không tìm thấy sản phẩm</div>
        <p className="mt-2 text-sm text-slate-600">
          Sản phẩm không tồn tại hoặc đã bị xoá.
        </p>
        <Link
          to="/"
          className="mt-4 inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          Quay về danh sách
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Chi tiết sản phẩm</h1>
          <p className="mt-1 text-sm text-slate-600">Xem thông tin và thêm vào giỏ hàng.</p>
        </div>
        <Link
          to="/"
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          ← Về danh sách
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="aspect-16/12 bg-slate-100">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="text-xl font-semibold">{product.name}</div>
            <div className="mt-2 text-lg font-semibold text-emerald-700">
              {formatVND(product.price)}
            </div>
            <p className="mt-3 text-sm text-slate-600">{product.description}</p>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => cart.add(product)}
                className="flex-1 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 active:scale-[0.99]"
              >
                Thêm vào giỏ
              </button>
              <Link
                to="/cart"
                className="flex-1 rounded-xl border border-slate-200 px-4 py-2 text-center text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Xem giỏ hàng
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="text-sm font-semibold">Thông số nổi bật</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {product.specs.map((s) => (
                <li key={s} className="flex items-start gap-2">
                  <span className="mt-1.5 inline-block h-2 w-2 rounded-full bg-emerald-600" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="text-sm font-semibold">Gợi ý</div>
            <p className="mt-2 text-sm text-slate-600">
              Bạn có thể quay về danh sách để thêm sản phẩm khác, hoặc vào giỏ hàng để chỉnh số lượng.
            </p>
            <div className="mt-3 flex gap-2">
              <Link
                to="/"
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Mua thêm
              </Link>
              <Link
                to="/cart"
                className="rounded-xl bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700"
              >
                Thanh toán (demo)
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}