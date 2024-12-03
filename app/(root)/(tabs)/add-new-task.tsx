import { GestureResponderEvent, Text } from 'react-native'
import React, { useState } from 'react'
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
import { AlertCircleIcon } from '@/components/ui/icon'
import { Button, ButtonText } from '@/components/ui/button'
import { Box } from '@/components/ui/box'
import { Textarea, TextareaInput } from '@/components/ui/textarea'
import { colors } from '@/constants/color'
import DateTimePickerComponent from '@/components/DateTimePickerComponent'
import { TaskModel } from '@/models/TaskModel'
import { HStack } from '@/components/ui/hstack'

const initValue: TaskModel = {
  title: '',
  desctiption: '',
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

  const handleChangeValue = (field: string, value: string | Date) => {
    const item: any = { ...taskDetail }

    item[`${field}`] = value

    setTaskDetail(item)
  }

  const handleSubmit = (e: GestureResponderEvent) => {}
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
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
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
            <Textarea
              size='md'
              isReadOnly={false}
              isInvalid={false}
              isDisabled={false}
              className='w-full rounded-2xl'
            >
              <TextareaInput
                className='color-textColor'
                style={{ color: colors.text }}
                placeholder='Your text goes here...'
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
                selected={taskDetail.dueDate}
                onSelect={(val) => handleChangeValue('dueDate', val)}
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
                selected={taskDetail.dueDate}
                onSelect={(val) => handleChangeValue('dueDate', val)}
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
          <Button
            className='w-fit self-center mt-4 bg-transparent'
            size='lg'
            onPress={(e) => handleSubmit(e)}
          >
            <ButtonText className='color-cyan-600'>Save</ButtonText>
          </Button>
        </VStack>
      </Box>
    </Container>
  )
}

export default AddNewTask
