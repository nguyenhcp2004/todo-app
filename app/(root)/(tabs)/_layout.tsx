import React from 'react'
import { Redirect, Stack } from 'expo-router'
import { useAuth } from '@/store'

const Layout = () => {
  const { isAuth } = useAuth()
  if (!isAuth) {
    return <Redirect href={'/(auth)/sign-in'} />
  }
  return (
    <Stack>
      <Stack.Screen name='home' options={{ headerShown: false }} />
      <Stack.Screen name='explore' options={{ headerShown: false }} />
      <Stack.Screen name='add-new-task' options={{ headerShown: false }} />
      <Stack.Screen name='search' options={{ headerShown: false }} />
    </Stack>
  )
}

export default Layout
