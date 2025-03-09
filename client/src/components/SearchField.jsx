import React from 'react'

const SearchField = () => {
  return (
    <>
    <form className="w-full">
              <input
                type="text"
                placeholder="Search"
                className="w-full h-[56px] rounded-[32px] bg-[#F0F0F0] outline-none placeholder:text-[#100101] px-8 border font-medium text-lg"

                // className="w-[399px] h-[56px] rounded-[32px] bg-[#F0F0F0] outline-none placeholder:text-[#100101] ps-[30px] border font-[400] text-[20px]"
              />
            </form>
    </>
  )
}

export default SearchField