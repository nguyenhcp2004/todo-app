import { colors } from '@/constants/color'
import React from 'react'
import { Text } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress'

interface Props {
  color?: string
  value: number
  maxValue?: number
}

const CircularComponent = (props: Props) => {
  const { color, value, maxValue } = props
  return (
    <AnimatedCircularProgress
      size={120}
      width={15}
      fill={value}
      rotation={0}
      tintColor={colors.blue}
      backgroundColor='#3C444A'
    >
      {() => (
        <Text className='text-textColor text-3xl font-PoppinsSemiBold'>
          {value}%
        </Text>
      )}
    </AnimatedCircularProgress>
  )
}

export default CircularComponent
