import { View, ImageBackground } from 'react-native'
import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode
  color?: string
}

const CardImageComponent = (props: Props) => {
  const { children, color } = props
  return (
    <ImageBackground
      source={require('../assets/images/card-bg.png')}
      imageStyle={{ borderRadius: 12 }}
      className='rounded-xl'
    >
      <View
        className={`${
          color ? `bg-[${color}]` : 'bg-[rgba(113,77,217,0.9)]'
        } p-3 rounded-xl w-full h-f`}
        style={{ backgroundColor: color ? color : 'rgba(113,77,217,0.9)' }}
      >
        {children}
      </View>
    </ImageBackground>
  )
}

export default CardImageComponent
