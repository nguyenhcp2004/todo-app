import { create } from 'zustand'
import { auth } from '@/utils/firebaseConfig'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from 'firebase/auth'

type AuthStoreType = {
  isAuth: boolean
  user: any
  setAuth: (isAuth: boolean, user: any) => void
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

export const useAuth = create<AuthStoreType>((set) => ({
  isAuth: false,
  user: null,
  setAuth: (isAuth, user) => set({ isAuth, user }),
  login: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      set({ isAuth: true, user: userCredential.user })
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  },
  register: async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      set({ isAuth: true, user: userCredential.user })
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    }
  },
  logout: async () => {
    try {
      await signOut(auth)
      set({ isAuth: false, user: null })
    } catch (error) {
      console.error('Logout error:', error)
      throw error
    }
  }
}))
