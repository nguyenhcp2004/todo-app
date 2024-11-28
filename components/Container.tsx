import { Text, ScrollView, Platform } from 'react-native'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}
const Container = (props: Props) => {
  const { children } = props
  return (
    <ScrollView
      className={`flex flex-1 bg-bgColor p-5 ${
        Platform.OS === 'ios' ? 'pt-8' : 'pt-5'
      }`}
    >
      {children}
    </ScrollView>
  )
}

export default Container
