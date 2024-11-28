import Container from '@/components/Container'
import SectionComponent from '@/components/SectionComponent'
import { Box } from '@/components/ui/box'
import { Icon } from '@/components/ui/icon'
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input'
import { Text } from 'react-native'

export default function HomeScreen() {
  return (
    <Container>
      <SectionComponent>
        <Box className='flex flex-row justify-between items-center'>
          <Text className='text-textColor'>Home 123</Text>
        </Box>
      </SectionComponent>
      <SectionComponent>
        <Text className='text-textColor text-sm'>Hi, Jason</Text>
        <Text className='text-textColor text-xl font-PoppinsBold'>
          Be Productive today
        </Text>
      </SectionComponent>
      <SectionComponent>
        <Input className='bg-gray' variant='outline'>
          <InputField placeholder='Search' />
        </Input>
      </SectionComponent>
      <SectionComponent>
        <Box className='flex flex-row justify-between items-start bg-gray p-3 rounded'>
          <Box>
            <Text className='text-textColor text-xl font-PoppinsBold'>
              Task progress
            </Text>
            <Text className='text-textColor'>30/40 tasks done</Text>
          </Box>
          <Box>
            <Text className='text-textColor'>Task Progress</Text>
          </Box>
        </Box>
      </SectionComponent>
    </Container>
  )
}
