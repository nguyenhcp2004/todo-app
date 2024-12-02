import { View, Text } from 'react-native'
import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const SectionComponent = (props: Props) => {
  const { children } = props
  return <View className='mb-4 '>{children}</View>
}

export default SectionComponent
