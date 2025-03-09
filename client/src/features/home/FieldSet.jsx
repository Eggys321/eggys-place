import React from 'react'

const FieldSet = () => {
  return (
    <>
     <fieldset className="fieldset mt-5 ">
            <select defaultValue="Pick a browser" className="select w-full rounded-[12px] h-[56px]">
              <option disabled={true}>Pick a browser</option>
              <option>Chrome</option>
              <option>FireFox</option>
              <option>Safari</option>
            </select>
            <span className="fieldset-label">Optional</span>
          </fieldset>
    </>
  )
}

export default FieldSet