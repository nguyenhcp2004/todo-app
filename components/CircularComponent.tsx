import { colors } from '@/constants/color'
import React from 'react'
import { Text } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress'

interface Props {
  color?: string
  value: number
  maxValue?: number
  radius?: number
}

const CircularComponent = (props: Props) => {
  const { color, value, maxValue, radius } = props
  return (
    <AnimatedCircularProgress
      size={120}
      width={15}
      fill={value}
      rotation={0}
      tintColor={colors.blue}
      onAnimationComplete={() => console.log('onAnimationComplete')}
      backgroundColor='#3d5875'
    >
      {() => <Text className='text-textColor text-3xl'>{value}%</Text>}
    </AnimatedCircularProgress>
  )
}

export default CircularComponent
