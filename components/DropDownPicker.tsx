import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SelectModel } from '@/models/SelectModel'
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText
} from '@/components/ui/form-control'
import {
  AlertCircleIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  CloseIcon,
  Icon,
  SearchIcon
} from '@/components/ui/icon'
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input'
import {
  Drawer,
  DrawerBackdrop,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader
} from '@/components/ui/drawer'
import { Button, ButtonText } from '@/components/ui/button'
import TextComponent from '@/components/TextComponent'
import { Box } from '@/components/ui/box'
import { HStack } from '@/components/ui/hstack'
import { colors } from '@/constants/color'
import { ScrollView } from 'react-native-reanimated/lib/typescript/Animated'

interface Props {
  title?: string
  items: SelectModel[]
  selected?: string[]
  onSelect: (val: string[]) => void
  multible?: boolean
}

const DropDownPicker = (props: Props) => {
  const { items, onSelect, multible, selected, title } = props

  const [showDrawer, setShowDrawer] = useState(false)
  const [searckKey, setSearckKey] = useState('')
  const [results, setResults] = useState<SelectModel[]>([])
  const [dataSelected, setDataSelected] = useState<string[]>([])

  useEffect(() => {
    selected && setDataSelected(selected)
  }, [selected])
  useEffect(() => {
    if (!searckKey) {
      setResults([])
    } else {
      const data = items.filter((element) =>
        element.label.toLowerCase().includes(searckKey.toLowerCase())
      )
      setResults(data)
    }
  }, [searckKey])
  const handleSelectItem = (id: string) => {
    if (multible) {
      const data = [...dataSelected]
      const index = data.findIndex((element) => element === id)
      if (index !== -1) {
        data.splice(index, 1)
      } else {
        data.push(id)
      }
      setDataSelected(data)
    } else {
      setDataSelected([id])
    }
  }
  const handleConfirmSelect = () => {
    onSelect(dataSelected)
    setShowDrawer(false)
    setDataSelected([])
  }
  const handleRemoveItemSelected = (index: number) => {
    if (selected) {
      const newSelected = [...selected]
      newSelected.splice(index, 1)
      onSelect(newSelected)
    }
  }

  const renderSelectedItem = (id: string, index: number) => {
    const item = items.find((element) => element.value === id)
    return (
      item && (
        <TouchableOpacity onPress={() => handleRemoveItemSelected(index)}>
          <HStack className='items-center justify-between my-1 mx-1 p-2 border rounded-full border-gray2 mb-2 '>
            <Text className='text-textColor pr-1'>{item.label}</Text>

            <Icon as={CloseIcon} size='md' color={colors.text} />
          </HStack>
        </TouchableOpacity>
      )
    )
  }
  return (
    <View>
      <TouchableOpacity onPress={() => setShowDrawer(true)}>
        <FormControl
          size='lg'
          isDisabled={false}
          isReadOnly={false}
          isRequired={false}
          className='mb-2 '
        >
          <FormControlLabel>
            <FormControlLabelText className='text-textColor '>
              Member
            </FormControlLabelText>
          </FormControlLabel>
          <Input
            className={`h-fit my-1 ${selected ? 'p-1' : 'p-2'}`}
            variant='outline'
            size={'xl'}
          >
            {selected && selected.length > 0 ? (
              <HStack>
                {selected.map((id, index) => renderSelectedItem(id, index))}
              </HStack>
            ) : (
              <>
                <InputField
                  className='text-textColor'
                  type='text'
                  placeholder='Search'
                  value={''}
                />
                <InputSlot className='pr-1'>
                  <InputIcon as={ChevronDownIcon} />
                </InputSlot>
              </>
            )}
          </Input>
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>
              Atleast 6 characters are required.
            </FormControlErrorText>
          </FormControlError>
        </FormControl>
      </TouchableOpacity>

      <Drawer
        isOpen={showDrawer}
        onClose={() => {
          setShowDrawer(false)
        }}
        size='full'
        anchor='bottom'
      >
        <DrawerBackdrop />
        <DrawerContent className='bg-bgColor'>
          <DrawerHeader>
            <HStack className='w-full items-center justify-between' space='md'>
              <Box className='flex-1'>
                <Input className='h-fit my-1 p-1' variant='outline' size={'xl'}>
                  <InputSlot className='pl-2'>
                    <InputIcon as={SearchIcon} color={colors.gray2} />
                  </InputSlot>
                  <InputField
                    className='text-textColor'
                    type='text'
                    placeholder='Search...'
                    value={''}
                  />
                </Input>
              </Box>
              <Button
                onPress={() => setShowDrawer(false)}
                className='bg-transparent p-0'
              >
                <ButtonText className='text-orange-400'>Cancel</ButtonText>
              </Button>
            </HStack>
          </DrawerHeader>
          <DrawerBody>
            <FlatList
              nestedScrollEnabled={true}
              showsVerticalScrollIndicator={false}
              style={{ flex: 1 }}
              data={searckKey ? results : items}
              renderItem={({ item }) => (
                <HStack
                  key={item.label}
                  className='justify-between items-center'
                  onTouchStart={() => handleSelectItem(item.value)}
                >
                  <Box>
                    <TextComponent
                      className={`text-lg  ${
                        dataSelected.includes(item.value)
                          ? 'text-orange-400'
                          : 'text-textColor'
                      } `}
                    >
                      {item.label}
                    </TextComponent>
                  </Box>
                  <Box>
                    <Icon
                      as={CheckCircleIcon}
                      size='md'
                      color={
                        dataSelected.includes(item.value)
                          ? 'coral'
                          : colors.text
                      }
                    />
                  </Box>
                </HStack>
              )}
            />
          </DrawerBody>
          <DrawerFooter>
            <Button
              onPress={handleConfirmSelect}
              className='flex-1 bg-blue'
              size='lg'
            >
              <ButtonText>Confirm</ButtonText>
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </View>
  )
}

export default DropDownPicker
