import '@/global.css'
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import 'react-native-reanimated'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded] = useFonts({
    PoppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
    PoppinsRegular: require('../assets/fonts/Poppins-Regular.ttf'),
    PoppinsMedium: require('../assets/fonts/Poppins-Medium.ttf'),
    PoppinsItalic: require('../assets/fonts/Poppins-Italic.ttf'),
    PoppinsSemibold: require('../assets/fonts/Poppins-SemiBold.ttf')
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <GluestackUIProvider mode='light'>
      <Stack>
        <Stack.Screen name='(root)' options={{ headerShown: false }} />
        <Stack.Screen name='index' options={{ headerShown: false }} />
        <Stack.Screen name='+not-found' />
      </Stack>
    </GluestackUIProvider>
  )
}
