import React from 'react'

const SearchField = () => {
  return (
    <>
    <form className="w-full wrapper">
              <input
                type="text"
                placeholder="Search"
                className="w-full h-[56px] rounded-[32px] bg-[#F0F0F0] outline-none placeholder:text-[#100101] px-8 border font-medium text-lg"
              />
            </form>
    </>
  )
}

export default SearchField