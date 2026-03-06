import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useCart } from "../cart/CartContext";

export default function Layout({ children }) {
  const cart = useCart();
  const location = useLocation();

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-slate-900 text-white">
              <span className="text-sm font-semibold">S</span>
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold">Shop UI</div>
              <div className="text-xs text-slate-500">React + Tailwind</div>
            </div>
          </Link>

          <nav className="flex items-center gap-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `rounded-xl px-3 py-2 text-sm font-medium transition ${
                  isActive ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"
                }`
              }
              end
            >
              Sản phẩm
            </NavLink>

            <Link
              to="/cart"
              className={`relative rounded-xl px-3 py-2 text-sm font-medium transition ${
                location.pathname.startsWith("/cart")
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              Giỏ hàng
              {cart.count > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-emerald-600 px-1 text-[11px] font-semibold text-white">
                  {cart.count}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>

      <footer className="border-t border-slate-200 py-8">
        <div className="mx-auto max-w-6xl px-4 text-sm text-slate-500">
          © {new Date().getFullYear()} Shop UI — demo 3 trang (List / Detail / Cart)
        </div>
      </footer>
    </div>
  );
}