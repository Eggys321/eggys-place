import React from 'react'
import Input from '../components/Input'
import MyButton from '../components/MyButton'

const SignIn = ({switchToSignUp}) => {
  return (
    <>
    <h1>sign in</h1>
    <form className='flex flex-col gap-y-4'>

    <Input type="email" placeholder="Email" />
    <Input type="password" placeholder="Password" />
    <MyButton text='sign in' className='w-full'/>
    </form>
    <p>
        Don't have an account?
        <span className="text-blue-500 cursor-pointer" onClick={switchToSignUp}>
          Sign Up
        </span>
      </p>
    </>
  )
}

export default SignIn