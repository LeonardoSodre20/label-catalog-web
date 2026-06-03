import { create } from 'zustand'

interface AuthState {
  token: string | null
  setToken: (token: string | null) => void
  clearSession: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  setToken: (token) => set({ token }),
  clearSession: () => set({ token: null }),
}))
