import React, { createContext, useContext, useEffect, useReducer } from 'react'

const CartContext = createContext(null)

const STORAGE_KEY = 'swift_cafe_cart_v1'

function cartReducer(state, action) {
  switch (action.type) {
    case 'HYDRATE':
      return action.payload
    case 'ADD': {
      const existing = state.items.find(i => i.id === action.payload.id)
      let items
      if (existing) {
        items = state.items.map(i => i.id === action.payload.id ? { ...i, qty: i.qty + (action.payload.qty || 1) } : i)
      } else {
        items = [...state.items, { ...action.payload, qty: action.payload.qty || 1 }]
      }
      return { ...state, items }
    }
    case 'UPDATE': {
      const items = state.items.map(i => i.id === action.payload.id ? { ...i, qty: action.payload.qty } : i).filter(i => i.qty > 0)
      return { ...state, items }
    }
    case 'REMOVE': {
      const items = state.items.filter(i => i.id !== action.payload.id)
      return { ...state, items }
    }
    case 'CLEAR':
      return { items: [] }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })
  const [open, setOpen] = React.useState(false)

  // hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        dispatch({ type: 'HYDRATE', payload: JSON.parse(raw) })
      }
    } catch (e) {
      // ignore
    }
  }, [])

  // persist
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch (e) {
      // ignore
    }
  }, [state])

  function addItem(item, qty = 1) {
    dispatch({ type: 'ADD', payload: { ...item, qty } })
  }

  function updateItem(id, qty) {
    dispatch({ type: 'UPDATE', payload: { id, qty } })
  }

  function removeItem(id) {
    dispatch({ type: 'REMOVE', payload: { id } })
  }

  function clearCart() {
    dispatch({ type: 'CLEAR' })
  }

  function getSubtotal() {
    return state.items.reduce((s, it) => s + it.price * it.qty, 0)
  }

  function openCart() { setOpen(true) }
  function closeCart() { setOpen(false) }
  function toggleCart() { setOpen(v => !v) }

  const value = {
    items: state.items,
    addItem,
    updateItem,
    removeItem,
    clearCart,
    getSubtotal,
    cartOpen: open,
    openCart,
    closeCart,
    toggleCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
