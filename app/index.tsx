import { Redirect } from 'expo-router'
import { useAuth } from '@/store'

const Page = () => {
  const { isAuth } = useAuth()

  if (!isAuth) {
    return <Redirect href={'/(auth)/sign-in'} />
  }
  return <Redirect href={'/(root)/(tabs)/home'} />
}

export default Page
