import Container from '@/components/Container'
import SectionComponent from '@/components/SectionComponent'
import { Box } from '@/components/ui/box'
import { Input, InputField, InputSlot } from '@/components/ui/input'
import { Text } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { colors } from '@/constants/color'
import Feather from '@expo/vector-icons/Feather'
import TagComponent from '@/components/TagComponent'
import CircularComponent from '@/components/CircularComponent'

export default function HomeScreen() {
  return (
    <Container>
      <SectionComponent>
        <Box className='flex flex-row justify-between items-center'>
          <MaterialCommunityIcons
            name='view-dashboard-outline'
            size={24}
            color={colors.text}
          />
          <MaterialCommunityIcons
            name='bell-ring-outline'
            size={24}
            color={colors.text}
          />
        </Box>
      </SectionComponent>
      <SectionComponent>
        <Text className='text-textColor text-sm'>Hi, Jason</Text>
        <Text className='text-textColor text-xl font-PoppinsBold'>
          Be Productive today
        </Text>
      </SectionComponent>
      <SectionComponent>
        <Input className='bg-gray' variant='outline' size='lg'>
          <InputField placeholder='Search task' />
          <InputSlot className='pr-3'>
            <Feather name='search' size={20} color={colors.text} />
          </InputSlot>
        </Input>
      </SectionComponent>
      <SectionComponent>
        <Box className='flex flex-row justify-between items-start bg-gray p-3 rounded-2xl'>
          <Box>
            <Text className='text-textColor text-xl font-PoppinsBold'>
              Task progress
            </Text>
            <Text className='text-textColor'>30/40 tasks done</Text>
            <Box className='flex justify-center items-start mt-3'>
              <TagComponent text='March 22' />
            </Box>
          </Box>
          <Box>
            <CircularComponent value={80} />
          </Box>
        </Box>
      </SectionComponent>
    </Container>
  )
}
