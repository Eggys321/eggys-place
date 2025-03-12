import React from 'react'

const FieldSet = ({selectedCat,setSelectedCat}) => {
  return (
    <>
     <fieldset className="fieldset mt-5 ">
            <select defaultValue="Pick a browser" className="select w-full rounded-[12px] h-[56px]"         onChange={(e) => setSelectedCat(e.target.value)}
         value={selectedCat}
            >
              <option disabled={true}>Select a category</option>
              <option value="Burger" className='w-full'>Burger</option>
              <option value="Drinks" className='w-full'>Drinks</option>
              <option value="Salads" className='w-full'>Salads</option>
              <option value="Combos" className='w-full'>Combos</option>
              <option value="Chips" className='w-full'>Chips</option>
              <option value="Chicken" className='w-full'>Chicken</option>
            </select>
          </fieldset>
    </>
  )
}

export default FieldSet