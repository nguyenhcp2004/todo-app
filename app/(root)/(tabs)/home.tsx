import Container from '@/components/Container'
import SectionComponent from '@/components/SectionComponent'
import { Box } from '@/components/ui/box'
import { Input, InputField, InputSlot } from '@/components/ui/input'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { colors } from '@/constants/color'
import Feather from '@expo/vector-icons/Feather'
import TagComponent from '@/components/TagComponent'
import CircularComponent from '@/components/CircularComponent'
import TextComponent from '@/components/TextComponent'
import { Grid, GridItem } from '@/components/ui/grid'
import CardImageComponent from '@/components/CardImageComponent'
import { Avatar, AvatarFallbackText, AvatarGroup } from '@/components/ui/avatar'
import { AddIcon, EditIcon } from '@/components/ui/icon'
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button'
import { Progress, ProgressFilledTrack } from '@/components/ui/progress'
import { router } from 'expo-router'
import { auth, taskRef } from '@/utils/firebaseConfig'
import { HStack } from '@/components/ui/hstack'
import { useAuth } from '@/store'
import { getDocs, limitToLast, orderBy, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import React from 'react'
import { TaskModel } from '@/models/TaskModel'
import ProgressBarComponent from '@/components/ProgressBarComponent'

const avatars = [
  {
    src: 'https://example.com.jpg',
    alt: 'Sandeep Srivastva',
    color: 'bg-emerald-600'
  },
  {
    src: 'https://example.com.jpg',
    alt: 'Arjun Kapoor',
    color: 'bg-cyan-600'
  },
  {
    src: 'https://example.com.jpg',
    alt: 'Ritik Sharma ',
    color: 'bg-indigo-600'
  },
  {
    src: 'https://example.com.jpg',
    alt: 'Akhil Sharma',
    color: 'bg-gray-600'
  },
  {
    src: 'https://example.com.jpg',
    alt: 'Rahul Sharma ',
    color: 'bg-red-400'
  }
]

const extraAvatars = avatars.slice(3)
const remainingCount = extraAvatars.length

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(false)
  const [tasks, setTasks] = useState<TaskModel[]>([])
  const user = auth.currentUser
  const { logout } = useAuth()
  const handleLogout = async () => {
    await logout()
  }

  useEffect(() => {
    getNewTasks()
  }, [])

  const getNewTasks = async () => {
    setIsLoading(true)
    try {
      const tasksQuery = query(
        taskRef,
        orderBy('dueDate', 'desc'),
        limitToLast(3)
      )
      const tasksSnapshot = await getDocs(tasksQuery)
      const tasksList = tasksSnapshot.docs.map((doc) => {
        const data = doc.data() as TaskModel
        return {
          ...data,
          dueDate: data.dueDate ? data.dueDate.toDate() : null, // Convert Firestore Timestamp to Date
          start: data.start ? data.start.toDate() : null, // Convert Firestore Timestamp to Date
          end: data.end ? data.end.toDate() : null // Convert Firestore Timestamp to Date
        }
      })
      setTasks(tasksList)
      setIsLoading(false)
      console.log(tasksList)
    } catch (error) {
      setIsLoading(false)
      console.error('Error getting tasks:', error)
    }
  }
  return (
    <Box className='flex-1'>
      <Container isScroll={true}>
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
          <HStack className='justify-between items-center'>
            <Box>
              <Text className='text-textColor text-sm'>
                Hi, {user?.email || 'user'}
              </Text>
              <Text className='text-textColor text-xl font-PoppinsBold'>
                Be Productive today
              </Text>
            </Box>
            <Box>
              <TouchableOpacity onPress={handleLogout}>
                <MaterialCommunityIcons
                  name='logout'
                  size={24}
                  color={colors.text}
                />
              </TouchableOpacity>
            </Box>
          </HStack>
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
        {isLoading ? (
          <ActivityIndicator />
        ) : tasks.length > 0 ? (
          <SectionComponent>
            <Grid
              className='justify-between gap-x-[-15px]'
              _extra={{
                className: 'grid-cols-12'
              }}
            >
              <GridItem
                className='rounded-md'
                _extra={{
                  className: 'col-span-6'
                }}
              >
                {tasks[0] && (
                  <CardImageComponent>
                    <Button
                      size='lg'
                      className=' flex flex-row rounded-full w-12 h-12 items-center justify-center bg-[rgba(0,0,0,0.2)]'
                    >
                      <ButtonIcon as={EditIcon} />
                    </Button>

                    <TextComponent className='text-xl font-PoppinsBold'>
                      {tasks[0].title}
                    </TextComponent>
                    <TextComponent>{tasks[0].description}</TextComponent>
                    <Box className='ml-3 mt-8 mb-2 flex flex-row items-center justify-start'>
                      <AvatarGroup className='items-center'>
                        {avatars.slice(0, 3).map((avatar, index) => {
                          return (
                            <Avatar
                              key={index}
                              size='sm'
                              className={
                                'border-2 border-outline-0 ' + avatar.color
                              }
                            >
                              <AvatarFallbackText className='text-white'>
                                {avatar.alt}
                              </AvatarFallbackText>
                            </Avatar>
                          )
                        })}
                        <Avatar size='sm'>
                          <AvatarFallbackText>
                            {'+ ' + remainingCount + ''}
                          </AvatarFallbackText>
                        </Avatar>
                      </AvatarGroup>
                    </Box>
                    {tasks[0].progress && (
                      <ProgressBarComponent
                        percent={Number(tasks[0].progress)}
                      />
                    )}
                    <TextComponent>{tasks[0].dueDate.toString()}</TextComponent>
                  </CardImageComponent>
                )}
              </GridItem>
              <GridItem
                className='rounded-md'
                _extra={{
                  className: 'col-span-5'
                }}
              >
                <Box className='flex flex-col justify-between items-center gap-2'>
                  {tasks[1] && (
                    <Box className='rounded'>
                      <CardImageComponent color='rgba(33,150,243,0.9)'>
                        <Button
                          size='lg'
                          className=' flex flex-row rounded-full w-12 h-12 items-center justify-center bg-[rgba(0,0,0,0.2)]'
                        >
                          <ButtonIcon as={EditIcon} />
                        </Button>
                        <TextComponent className='text-xl font-PoppinsBold'>
                          {tasks[1].title}
                        </TextComponent>
                        <Box className='ml-3 my-3 flex flex-row items-center justify-start'>
                          <AvatarGroup className='items-center'>
                            {avatars.slice(0, 3).map((avatar, index) => {
                              return (
                                <Avatar
                                  key={index}
                                  size='sm'
                                  className={
                                    'border-2 border-outline-0 ' + avatar.color
                                  }
                                >
                                  <AvatarFallbackText className='text-white'>
                                    {avatar.alt}
                                  </AvatarFallbackText>
                                </Avatar>
                              )
                            })}
                            <Avatar size='sm'>
                              <AvatarFallbackText>
                                {'+ ' + remainingCount + ''}
                              </AvatarFallbackText>
                            </Avatar>
                          </AvatarGroup>
                        </Box>
                        {tasks[1].progress && (
                          <ProgressBarComponent
                            percent={Number(tasks[1].progress)}
                            color='bg-[#a2f068]'
                          />
                        )}
                      </CardImageComponent>
                    </Box>
                  )}
                  {tasks[2] && (
                    <Box className='rounded'>
                      <CardImageComponent color='rgba(18,181,22,0.9)'>
                        <Button
                          size='lg'
                          className=' flex flex-row rounded-full w-12 h-12 items-center justify-center bg-[rgba(0,0,0,0.2)]'
                        >
                          <ButtonIcon as={EditIcon} />
                        </Button>
                        <TextComponent className='text-xl font-PoppinsBold'>
                          {tasks[2].title}
                        </TextComponent>
                        <TextComponent>{tasks[2].description}</TextComponent>
                      </CardImageComponent>
                    </Box>
                  )}
                </Box>
              </GridItem>
            </Grid>
          </SectionComponent>
        ) : (
          <></>
        )}

        <SectionComponent>
          <TextComponent className='text-xl font-PoppinsBold'>
            Urgent tasks
          </TextComponent>
          <Box className='flex flex-row justify-start items-start bg-gray p-3 rounded-2xl mt-4 gap-3'>
            <Box>
              <CircularComponent value={40} />
            </Box>
            <Box>
              <Text className='text-textColor text-xl font-PoppinsBold'>
                Task title
              </Text>
            </Box>
          </Box>
        </SectionComponent>
      </Container>
      <Box className='absolute bottom-0 right-0 left-0 flex items-center justify-center p-5 z-1'>
        <Button
          onPress={() => {
            router.push('/(root)/(tabs)/add-new-task')
          }}
          className='bg-blue p-3 rounded-3xl w-[80%] opacity-100 h-fit'
        >
          <ButtonText className='h-fit'>Add new task</ButtonText>
          <ButtonIcon as={AddIcon} />
        </Button>
      </Box>
    </Box>
  )
}
