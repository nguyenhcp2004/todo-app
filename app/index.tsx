import React, { useEffect, useState } from 'react'
import { Redirect } from 'expo-router'
import { auth } from '@/utils/firebaseConfig'

const Page = () => {
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLogin(true)
      } else {
        setIsLogin(false)
      }
    })
  }, [])

  if (!isLogin) {
    return <Redirect href={'/(auth)/sign-in'} />
  }
  return <Redirect href={'/(root)/(tabs)/home'} />
}

export default Page
