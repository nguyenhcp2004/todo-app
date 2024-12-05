import { create } from 'zustand'

type AppStoreType = {
  isAuth: boolean
  setAuth: (isAuth: boolean) => void
}

export const useAppStore = create<AppStoreType>((set) => ({
  isAuth: false,
  setAuth: (isAuth) => set({ isAuth })
}))
