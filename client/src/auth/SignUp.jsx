import React from 'react'

const SignUp = ({switchToSignIn}) => {
  return (
    <>
    <h1>SignUp</h1>
    <p>
        Already have an account?{" "}
        <span className="text-blue-500 cursor-pointer" onClick={switchToSignIn}>
          Sign In
        </span>
      </p>
    </>
  )
}

export default SignUp