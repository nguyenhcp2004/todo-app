import { ScrollView, Platform, View } from 'react-native'
import { ReactNode } from 'react'
import { Box } from '@/components/ui/box'
import { ChevronLeftIcon } from '@/components/ui/icon'
import { Button, ButtonIcon } from '@/components/ui/button'
import { router } from 'expo-router'
import TextComponent from '@/components/TextComponent'

interface Props {
  title?: string
  back?: boolean
  right?: ReactNode
  children: ReactNode
}
const Container = (props: Props) => {
  const { children, back, right, title } = props
  return (
    <View
      className={`flex flex-1 bg-bgColor p-2 ${
        Platform.OS === 'ios' ? 'pt-8' : 'pt-5'
      }`}
    >
      <Box className='flex flex-row pb-4 justify-center items-center'>
        {back && (
          <Button
            className='bg-transparent p-0 w-6 h-6'
            onPress={() => {
              router.back()
            }}
          >
            <ButtonIcon className='text-textColor' as={ChevronLeftIcon} />
          </Button>
        )}
        <Box className={`flex-1 ${back ? '-ml-15`' : ''}`}>
          {title && (
            <TextComponent className={`font-PoppinsBold text-2xl text-center`}>
              {title}
            </TextComponent>
          )}
        </Box>
      </Box>
      <ScrollView>{children}</ScrollView>
    </View>
  )
}

export default Container
