import {
  GestureResponderEvent,
  Image,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import React, { useEffect, useState } from 'react'
import Container from '@/components/Container'
import { VStack } from '@/components/ui/vstack'
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText
} from '@/components/ui/form-control'
import { Input, InputField } from '@/components/ui/input'
import { AlertCircleIcon, Icon, PaperclipIcon } from '@/components/ui/icon'
import { Button, ButtonText } from '@/components/ui/button'
import { Box } from '@/components/ui/box'
import { Textarea, TextareaInput } from '@/components/ui/textarea'
import { colors } from '@/constants/color'
import DateTimePickerComponent from '@/components/DateTimePickerComponent'
import { TaskModel } from '@/models/TaskModel'
import { HStack } from '@/components/ui/hstack'
import { doc, getDocs, setDoc } from 'firebase/firestore'
import { taskRef, usersRef } from '@/utils/firebaseConfig'
import DropDownPicker from '@/components/DropDownPicker'
import { SelectModel } from '@/models/SelectModel'
import * as DocumentPicker from 'expo-document-picker'
import TextComponent from '@/components/TextComponent'
import { upload } from 'cloudinary-react-native'
import { cld } from '@/libs/cloudinary'
import { UploadApiResponse } from 'cloudinary-react-native/lib/typescript/src/api/upload/model/params/upload-params'

const initValue: TaskModel = {
  title: '',
  description: '',
  dueDate: new Date(),
  start: new Date(),
  end: new Date(),
  uids: [],
  fileUrls: []
}

const AddNewTask = () => {
  const [isInvalid, setIsInvalid] = React.useState(false)
  const [inputValue, setInputValue] = React.useState('')
  const [taskDetail, setTaskDetail] = useState<TaskModel>(initValue)
  const [users, setUsers] = useState<SelectModel[]>([])
  const [images, setImages] = useState<string>('')
  const [file, setFile] = useState<DocumentPicker.DocumentPickerResult | null>(
    null
  )

  useEffect(() => {
    handleGetAllUsers()
  }, [])
  const handleGetAllUsers = async () => {
    try {
      const usersSnapshot = (await getDocs(usersRef)).docChanges()
      const usersList = usersSnapshot.map((doc) => doc.doc.data())
      const data: SelectModel[] = []
      usersList.forEach((element) => {
        data.push({ label: element.name, value: element.id })
      })
      setUsers(data)
    } catch (error) {
      console.error('Error getting users:', error)
    }
  }

  const handleChangeValue = (
    field: string,
    value: string | Date | string[]
  ) => {
    const item: any = { ...taskDetail }

    item[`${field}`] = value
    setTaskDetail(item)
  }

  const uploadImage = async (file: string) => {
    const options = {
      upload_preset: 'Default',
      unsigned: true
    }
    return new Promise<UploadApiResponse | undefined>(
      async (resolve, reject) => {
        await upload(cld, {
          file,
          options: options,
          callback: (error, response) => {
            if (error) {
              reject(error)
            } else {
              resolve(response)
            }
          }
        })
      }
    )
  }

  const handlePickImage = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
        multiple: true
      })

      if (!result.canceled) {
        setImages(result.assets[0].uri)
      }
    } catch (error) {
      console.error('Error picking image:', error)
    }
  }

  const handleSubmit = async () => {
    try {
      if (!images) return
      const imageUrl = await uploadImage(images)
      const data = {
        ...taskDetail,
        fileUrls: [imageUrl?.url]
      }

      const taskDocRef = doc(taskRef)
      await setDoc(taskDocRef, data)
      setTaskDetail(initValue)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container back title='Add New Task'>
      <Box className='flex flex-row items-center justify-center'>
        <VStack className='w-full p-4'>
          <FormControl
            isInvalid={isInvalid}
            size='md'
            isDisabled={false}
            isReadOnly={false}
            isRequired={false}
            className='mb-2'
          >
            <FormControlLabel>
              <FormControlLabelText className='text-textColor'>
                Title
              </FormControlLabelText>
            </FormControlLabel>
            <Input className='my-1' variant='rounded' size={'xl'}>
              <InputField
                className='text-textColor'
                type='text'
                placeholder='Title of task'
                value={taskDetail.title}
                onChange={(e) => handleChangeValue('title', e.nativeEvent.text)}
              />
            </Input>
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>
                Atleast 6 characters are required.
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
          <FormControl size='md' className='mb-2'>
            <FormControlLabel>
              <FormControlLabelText className='text-textColor '>
                Description
              </FormControlLabelText>
            </FormControlLabel>
            <Textarea size='md' className='w-full rounded-2xl'>
              <TextareaInput
                className='color-textColor'
                style={{ color: colors.text }}
                placeholder='Your text goes here...'
                value={taskDetail.description}
                onChange={(e) =>
                  handleChangeValue('description', e.nativeEvent.text)
                }
              />
            </Textarea>
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>
                Atleast 6 characters are required.
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
          <FormControl
            isInvalid={isInvalid}
            size='lg'
            isDisabled={false}
            isReadOnly={false}
            isRequired={false}
            className='mb-2 '
          >
            <FormControlLabel>
              <FormControlLabelText className='text-textColor '>
                Due date
              </FormControlLabelText>
            </FormControlLabel>
            <DateTimePickerComponent
              selected={taskDetail.dueDate}
              onSelect={(val) => handleChangeValue('dueDate', val)}
              placeholder='Choice'
              type='date'
            />
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>
                Atleast 6 characters are required.
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
          <HStack space='md'>
            <FormControl
              isInvalid={isInvalid}
              size='lg'
              isDisabled={false}
              isReadOnly={false}
              isRequired={false}
              className='mb-2 w-1/2'
            >
              <FormControlLabel>
                <FormControlLabelText className='text-textColor '>
                  Start
                </FormControlLabelText>
              </FormControlLabel>
              <DateTimePickerComponent
                selected={taskDetail.start}
                onSelect={(val) => handleChangeValue('start', val)}
                placeholder='Choice'
                type='time'
              />
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>
                  Atleast 6 characters are required.
                </FormControlErrorText>
              </FormControlError>
            </FormControl>
            <FormControl
              isInvalid={isInvalid}
              size='lg'
              isDisabled={false}
              isReadOnly={false}
              isRequired={false}
              className='mb-2 w-1/2'
            >
              <FormControlLabel>
                <FormControlLabelText className='text-textColor '>
                  End
                </FormControlLabelText>
              </FormControlLabel>
              <DateTimePickerComponent
                selected={taskDetail.end}
                onSelect={(val) => handleChangeValue('end', val)}
                placeholder='Choice'
                type='time'
              />
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>
                  Atleast 6 characters are required.
                </FormControlErrorText>
              </FormControlError>
            </FormControl>
          </HStack>
          <DropDownPicker
            multible
            onSelect={(data) => handleChangeValue('uids', data)}
            selected={taskDetail.uids}
            items={users}
          />
          <TouchableOpacity onPress={handlePickImage} style={{ marginTop: 3 }}>
            <HStack className='w-fit items-center'>
              <TextComponent className='text-lg font-PoppinsSemiBold w-[110px]'>
                Attachments
              </TextComponent>
              <Icon className='text-typography-500' as={PaperclipIcon} />
            </HStack>
            {file?.assets &&
              file?.assets.map((item) => (
                <TextComponent className='text-md mr-2' key={item.name}>
                  {item.name}
                </TextComponent>
              ))}
          </TouchableOpacity>
          <View
            style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 16 }}
          >
            {images && (
              <Image
                source={{ uri: images }}
                style={{
                  width: 100,
                  height: 100,
                  marginRight: 8,
                  marginBottom: 8
                }}
              />
            )}
          </View>
          <Button
            className='w-full self-center mt-4 bg-blue rounded-xl'
            onPress={handleSubmit}
          >
            <ButtonText className='uppercase'>Save</ButtonText>
          </Button>
        </VStack>
      </Box>
    </Container>
  )
}

export default AddNewTask
