import React, { useEffect } from 'react'

const UseTitle = (title) => {
    useEffect(()=>{
        document.title = title
    },[title])
  return (
    <div>UseTitle</div>
  )
}

export default UseTitle