import { View, Text } from 'react-native'
import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
}

const SectionComponent = (props: Props) => {
  const { children, className } = props
  return (
    <View className={`mb-4 px-4 ${className ? className : ''}`}>
      {children}
    </View>
  )
}

export default SectionComponent
