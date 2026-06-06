import { create } from 'zustand'

const STORAGE_KEY = 'label-catalog-auth'

interface AuthData {
  token: string
  email: string
  function: string
}

interface AuthState {
  token: string | null
  email: string | null
  function: string | null
  setSession: (data: AuthData) => void
  clearSession: () => void
  isAuthenticated: () => boolean
}

function loadFromStorage(): Partial<AuthState> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored) as AuthData
      return {
        token: parsed.token,
        email: parsed.email,
        function: parsed.function,
      }
    }
  } catch {
    localStorage.removeItem(STORAGE_KEY)
  }
  return {}
}

function saveToStorage(data: AuthData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

function clearStorage() {
  localStorage.removeItem(STORAGE_KEY)
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  email: null,
  function: null,
  ...loadFromStorage(),
  setSession: (data) => {
    saveToStorage(data)
    set({ token: data.token, email: data.email, function: data.function })
  },
  clearSession: () => {
    clearStorage()
    set({ token: null, email: null, function: null })
  },
  isAuthenticated: () => {
    return get().token !== null
  },
}))
