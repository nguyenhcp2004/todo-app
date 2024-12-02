import React from 'react'
import { Stack } from 'expo-router'

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name='home' options={{ headerShown: false }} />
      <Stack.Screen name='explore' options={{ headerShown: false }} />
      <Stack.Screen name='add-new-task' options={{ headerShown: false }} />
    </Stack>
  )
}

export default Layout
