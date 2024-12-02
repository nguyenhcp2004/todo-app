import { Text } from 'react-native'
import React from 'react'
interface Props {
  children: string
  className?: string
}
const TextComponent = (props: Props) => {
  const { children, className } = props
  return (
    <Text className={`text-sm font-Poppins text-textColor ${className || ''}`}>
      {children}
    </Text>
  )
}

export default TextComponent
