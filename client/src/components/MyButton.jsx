import React from 'react'

const MyButton = ({text ,className = ""}) => {
  return (
    <button className={`bg-[#B67B0F] text-[#FBFBFB]  rounded-[31px] cursor-pointer ${className}`}> {text} </button>
  )
}

export default MyButton