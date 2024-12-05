import React, { useState } from 'react'
import Container from '@/components/Container'
import SectionComponent from '@/components/SectionComponent'
import TextComponent from '@/components/TextComponent'

import { z } from 'zod'
import { VStack } from '@/components/ui/vstack'
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText
} from '@/components/ui/form-control'
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input'
import { Button, ButtonText } from '@/components/ui/button'
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from '@/components/ui/icon'
import { colors } from '@/constants/color'
import { Text } from 'react-native'
import { LoginBody, LoginBodyType } from '@/schemaValidations/auth.schema'
import { useForm, set, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false)
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const handleState = () => {
    setShowPassword((showState) => !showState)
  }

  const onSubmit = (data: LoginBodyType) => {
    // Handle login logic here
    console.log('Email:', data.email)
    console.log('Password:', data.password)
  }

  return (
    <Container>
      <SectionComponent className='flex-1 justify-center items-center'>
        <VStack className='w-full max-w-md p-4 space-y-4'>
          <TextComponent className='text-4xl font-PoppinsBold uppercase text-center'>
            Sign In
          </TextComponent>
          <FormControl isInvalid={!!errors.email} className='mb-2'>
            <FormControlLabel>
              <FormControlLabelText className='text-textColor'>
                Email
              </FormControlLabelText>
            </FormControlLabel>
            <Controller
              control={control}
              name='email'
              render={({ field: { onChange, onBlur, value } }) => (
                <Input className='my-1 h-fit'>
                  <InputSlot className='pl-2'>
                    <InputIcon
                      as={MailIcon}
                      className='text-darkBlue-500'
                      color={colors.text}
                    />
                  </InputSlot>
                  <InputField
                    className='text-textColor'
                    type='text'
                    placeholder='Email'
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                  />
                </Input>
              )}
            />
            {errors.email && (
              <FormControlError>
                <FormControlErrorText>
                  {errors.email.message}
                </FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.password} className='mb-2'>
            <FormControlLabel>
              <FormControlLabelText className='text-textColor'>
                Password
              </FormControlLabelText>
            </FormControlLabel>
            <Controller
              control={control}
              name='password'
              render={({ field: { onChange, onBlur, value } }) => (
                <Input className='my-1 h-fit'>
                  <InputSlot className='pl-2'>
                    <InputIcon
                      as={LockIcon}
                      className='text-darkBlue-500'
                      color={colors.text}
                    />
                  </InputSlot>
                  <InputField
                    className='text-textColor'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Password'
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                  />
                  <InputSlot className='pr-3' onPress={handleState}>
                    <InputIcon
                      as={showPassword ? EyeIcon : EyeOffIcon}
                      className='text-darkBlue-500'
                      color={colors.text}
                    />
                  </InputSlot>
                </Input>
              )}
            />
            {errors.password && (
              <FormControlError>
                <FormControlErrorText>
                  {errors.password.message}
                </FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>
          <Button
            className='w-full mt-6 bg-blue rounded-md'
            onPress={handleSubmit(onSubmit)}
          >
            <ButtonText>SIGN IN</ButtonText>
          </Button>
          <Text className='mt-4 text-sm text-textColor font-Poppins text-center'>
            You don't have an account?{' '}
            <TextComponent className='text-orange-400'>
              Create an account
            </TextComponent>
          </Text>
        </VStack>
      </SectionComponent>
    </Container>
  )
}

export default SignIn
