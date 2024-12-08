import { initializeApp } from 'firebase/app'
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { getFirestore, collection } from 'firebase/firestore'
import envConfig from '@/constants/config'

const firebaseConfig = {
  apiKey: envConfig.EXPO_PUBLIC_API_KEY,
  authDomain: envConfig.EXPO_PUBLIC_AUTH_DOMAIN,
  projectId: envConfig.EXPO_PUBLIC_PROJECT_ID,
  storageBucket: envConfig.EXPO_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: envConfig.EXPO_PUBLIC_MESSAGING_SENDER_ID,
  appId: envConfig.EXPO_PUBLIC_APP_ID
}

const app = initializeApp(firebaseConfig)

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
})

export const db = getFirestore(app)

export const usersRef = collection(db, 'users')
