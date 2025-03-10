import React from 'react'

const FieldSet = () => {
  return (
    <>
     <fieldset className="fieldset mt-5 ">
            <select defaultValue="Pick a browser" className="select w-full rounded-[12px] h-[56px]">
              <option disabled={true}>Select a category</option>
              <option>Burger</option>
              <option>Drinks</option>
              <option>Salads</option>
              <option>Combos</option>
              <option>Chips</option>
              <option>Chicken</option>
            </select>
          </fieldset>
    </>
  )
}

export default FieldSet