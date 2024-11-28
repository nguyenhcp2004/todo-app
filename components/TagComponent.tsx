import React from 'react'
import { Button, ButtonText } from '@/components/ui/button'

interface Props {
  text: string
  onPress?: () => void
}
const TagComponent = (props: Props) => {
  const { text, onPress } = props
  return (
    <Button
      onPress={onPress}
      className='rounded-full bg-blue py-1 px-4 flex items-center justify-center'
    >
      <ButtonText className='text-textColor'>{text}</ButtonText>
    </Button>
  )
}

export default TagComponent
