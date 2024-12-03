import React, { useState } from 'react'
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input'
import { ChevronDownIcon, CloseIcon, Icon } from '@/components/ui/icon'
import DateTimePicker from '@react-native-community/datetimepicker'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import { colors } from '@/constants/color'

interface Props {
  type?: 'date' | 'time' | 'datetime' | 'countdown'
  placeholder?: string
  selected?: Date
  onSelect: (val: Date) => void
}

const DateTimePickerComponent = (props: Props) => {
  const { type, onSelect, selected, placeholder } = props
  const [date, setDate] = useState(selected ?? new Date())
  const [show, setShow] = useState(false)

  const onChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || new Date()
    setShow(false)
    setDate(currentDate)
    onSelect(currentDate)
  }

  return (
    <>
      <Input
        className='my-1'
        onTouchStart={() => setShow(true)}
        variant='rounded'
        size={'xl'}
      >
        <InputField
          className='text-textColor'
          type='text'
          placeholder={placeholder || date.toDateString()}
          value={
            selected
              ? type === 'time'
                ? `${selected.getHours()}:${selected.getMinutes()}`
                : `${selected.getDate()}/${
                    selected.getMonth() + 1
                  }/${selected.getFullYear()}`
              : date.toDateString()
          }
        />
        <InputSlot className='pr-3'>
          <InputIcon as={ChevronDownIcon} />
        </InputSlot>
      </Input>
      {show && (
        <RNDateTimePicker
          locale='vi'
          testID='dateTimePicker'
          value={date}
          display='spinner'
          mode={type}
          is24Hour={true}
          onChange={onChange}
          positiveButton={{ label: 'Confirm', textColor: colors.blue }}
          negativeButton={{ label: 'Cancel', textColor: 'red' }}
        />
      )}
    </>
  )
}

export default DateTimePickerComponent
