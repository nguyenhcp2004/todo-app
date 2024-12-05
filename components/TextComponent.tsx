import { Text } from '@/components/ui/text'
import React from 'react'

interface Props {
  children: string
  className?: string
}
const TextComponent = (props: Props) => {
  const { children, className } = props

  return (
    <Text className={'p-2 text-sm font-Poppins text-textColor ' + className}>
      {children}
    </Text>
  )
}

export default TextComponent
