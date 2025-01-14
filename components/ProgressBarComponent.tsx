import { View, Text } from 'react-native'
import React from 'react'
import { Box } from '@/components/ui/box'
import { Progress, ProgressFilledTrack } from '@/components/ui/progress'
import TextComponent from '@/components/TextComponent'

interface Props {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  color?: string
  percent: number
}

const ProgressBarComponent = (props: Props) => {
  const { size, percent, color } = props
  return (
    <Box className='w-full mb-12'>
      <Progress
        value={percent}
        size={size || 'md'}
        orientation='horizontal'
        className='bg-[rgba(0,0,0,0.4)]'
      >
        <ProgressFilledTrack className={color ? color : 'bg-[#0aacff]'} />
      </Progress>
      <Box className='flex flex-row items-center justify-between w-full'>
        <TextComponent>Progress</TextComponent>
        <TextComponent className='font-PoppinsBold'>
          {percent + '%'}
        </TextComponent>
      </Box>
    </Box>
  )
}

export default ProgressBarComponent
