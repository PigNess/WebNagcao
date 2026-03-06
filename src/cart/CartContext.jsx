import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const CartContext = createContext(null);

const initialState = {
  items: {},
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const p = action.product;
      const current = state.items[p.id];
      const nextQty = (current?.qty ?? 0) + 1;
      return {
        ...state,
        items: {
          ...state.items,
          [p.id]: { product: p, qty: nextQty },
        },
      };
    }
    case "REMOVE": {
      const next = { ...state.items };
      delete next[action.id];
      return { ...state, items: next };
    }
    case "INC": {
      const current = state.items[action.id];
      if (!current) return state;
      return {
        ...state,
        items: {
          ...state.items,
          [action.id]: { ...current, qty: current.qty + 1 },
        },
      };
    }
    case "DEC": {
      const current = state.items[action.id];
      if (!current) return state;
      const nextQty = current.qty - 1;
      if (nextQty <= 0) {
        const next = { ...state.items };
        delete next[action.id];
        return { ...state, items: next };
      }
      return {
        ...state,
        items: {
          ...state.items,
          [action.id]: { ...current, qty: nextQty },
        },
      };
    }
    case "CLEAR":
      return initialState;
    case "HYDRATE":
      return action.state ?? initialState;
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const raw = localStorage.getItem("cart_state_v1");
    if (raw) {
      try {
        dispatch({ type: "HYDRATE", state: JSON.parse(raw) });
      } catch (e) {
        console.error("Failed to hydrate cart state", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart_state_v1", JSON.stringify(state));
  }, [state]);

  const api = useMemo(() => {
    const list = Object.values(state.items);
    const count = list.reduce((sum, it) => sum + it.qty, 0);
    const subtotal = list.reduce((sum, it) => sum + it.qty * it.product.price, 0);

    return {
      itemsMap: state.items,
      itemsList: list,
      count,
      subtotal,
      add: (product) => dispatch({ type: "ADD", product }),
      remove: (id) => dispatch({ type: "REMOVE", id }),
      inc: (id) => dispatch({ type: "INC", id }),
      dec: (id) => dispatch({ type: "DEC", id }),
      clear: () => dispatch({ type: "CLEAR" }),
    };
  }, [state]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}