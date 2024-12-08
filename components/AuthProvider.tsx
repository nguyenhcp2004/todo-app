import React, { useEffect } from 'react'
import { useAuth } from '@/store'
import { auth } from '@/utils/firebaseConfig'

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const { setAuth } = useAuth()
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setAuth(true, user)
      } else {
        setAuth(false, null)
      }
    })
    return unsubscribe
  }, [])

  return <>{children}</>
}

export default AuthProvider
