import React, { useState } from 'react'
import Container from '@/components/Container'
import SectionComponent from '@/components/SectionComponent'
import TextComponent from '@/components/TextComponent'
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
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, router } from 'expo-router'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/utils/firebaseConfig'

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorText, setErrorText] = useState('')

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

  const onSubmit = async (data: LoginBodyType) => {
    await signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user
        if (user) {
          setIsLoading(false)
        }
        router.push('/(root)/(tabs)/home')
      })
      .catch((error) => {
        setErrorText(error.message)
        setIsLoading(false)
      })
  }

  return (
    <Container>
      <SectionComponent className='flex-1 justify-center items-center'>
        <VStack className='w-full max-w-md p-4 space-y-4'>
          <TextComponent className='text-4xl font-PoppinsBold uppercase text-center'>
            Login
          </TextComponent>
          <FormControl isInvalid={!!errors.email} className='mb-2'>
            <FormControlLabel>
              <FormControlLabelText className='text-textColor'>
                Email
              </FormControlLabelText>
            </FormControlLabel>
            <Controller
              name='email'
              control={control}
              render={({ field }) => (
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
                    value={field.value || ''}
                    onChangeText={field.onChange}
                    onBlur={field.onBlur}
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
              name='password'
              control={control}
              render={({ field }) => (
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
                    value={field.value || ''}
                    onChangeText={field.onChange}
                    onBlur={field.onBlur}
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
          {errorText && (
            <TextComponent className='text-error-400'>
              {errorText}
            </TextComponent>
          )}
          <Button
            className='w-full mt-6 bg-blue rounded-md'
            onPress={handleSubmit(onSubmit)}
          >
            <ButtonText>LOGIN</ButtonText>
          </Button>
          <Link href={'/(auth)/sign-up'} className='mt-4'>
            <Text className='mt-4 text-sm text-textColor font-Poppins text-center'>
              You don't have an account?{' '}
              <TextComponent className='text-orange-400'>
                Create an account
              </TextComponent>
            </Text>
          </Link>
        </VStack>
      </SectionComponent>
    </Container>
  )
}

export default SignIn
