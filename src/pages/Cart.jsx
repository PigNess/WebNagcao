import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../cart/CartContext";
import { formatVND } from "../data/products";

export default function Cart() {
  const cart = useCart();
  const [showNotify, setShowNotify] = useState(false);

  const handleCheckout = () => {
    cart.clear();
    setShowNotify(true);
  };

  useEffect(() => {
    if (showNotify) {
      const timer = setTimeout(() => {
        setShowNotify(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [showNotify]);

  if (cart.itemsList.length === 0) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold tracking-tight">Giỏ hàng</h1>

        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <div className="text-base font-semibold">Giỏ hàng đang trống</div>
          <p className="mt-2 text-sm text-slate-600">
            Hãy quay lại danh sách sản phẩm để thêm món bạn thích.
          </p>
          <Link
            to="/"
            className="mt-5 inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            ← Về danh sách sản phẩm
          </Link>
        </div>

        {showNotify && (
          <div className="fixed top-6 right-6 z-50 rounded-xl bg-emerald-600 px-5 py-3 text-white shadow-lg">
            Thanh toán thành công!
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Giỏ hàng</h1>
          <p className="mt-1 text-sm text-slate-600">
            Bạn có thể tăng/giảm số lượng hoặc xoá sản phẩm.
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            to="/"
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            ← Mua thêm
          </Link>
          <button
            onClick={cart.clear}
            className="rounded-xl bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            Xoá tất cả
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {cart.itemsList.map(({ product, qty }) => (
            <div
              key={product.id}
              className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-4"
            >
              <div className="h-20 w-28 overflow-hidden rounded-xl bg-slate-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="flex flex-1 flex-col gap-2">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link
                      to={`/product/${product.id}`}
                      className="line-clamp-1 font-semibold hover:underline"
                    >
                      {product.name}
                    </Link>
                    <div className="mt-1 text-sm text-slate-600">
                      Đơn giá:{" "}
                      <span className="font-medium">
                        {formatVND(product.price)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => cart.remove(product.id)}
                    className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Xoá
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-1">
                    <button
                      onClick={() => cart.dec(product.id)}
                      className="h-9 w-9 rounded-lg text-lg font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      −
                    </button>
                    <div className="min-w-10 text-center text-sm font-semibold">
                      {qty}
                    </div>
                    <button
                      onClick={() => cart.inc(product.id)}
                      className="h-9 w-9 rounded-lg text-lg font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-sm text-slate-600">
                    Thành tiền:{" "}
                    <span className="font-semibold text-slate-900">
                      {formatVND(qty * product.price)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-base font-semibold">Tóm tắt</div>

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Số lượng</span>
                <span className="font-medium text-slate-900">
                  {cart.count}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Tạm tính</span>
                <span className="font-medium text-slate-900">
                  {formatVND(cart.subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Phí ship</span>
                <span className="font-medium text-slate-900">
                  {formatVND(0)}
                </span>
              </div>

              <div className="my-3 border-t border-slate-200" />

              <div className="flex justify-between">
                <span className="text-sm font-semibold">Tổng cộng</span>
                <span className="text-sm font-semibold text-emerald-700">
                  {formatVND(cart.subtotal)}
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="mt-5 w-full rounded-xl bg-emerald-600 px-4 cursor-pointer py-2 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Thanh toán (demo)
            </button>

            <p className="mt-3 text-xs text-slate-500">
              Demo! không tích hợp cổng thanh toán.
            </p>
          </div>
        </div>
      </div>

      {showNotify && (
        <div className="fixed top-6 right-6 z-50 rounded-xl bg-emerald-600 px-5 py-3 text-white shadow-lg">
          Thanh toán thành công!
        </div>
      )}
    </div>
  );
}