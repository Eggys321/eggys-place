import React from 'react'
import UseTitle from '../Hooks/UseTitle';
import CartSummary from "../components/CartSummary"

const CheckOut = () => {
    UseTitle("let's checkout")
  return (
    <>
    <main className='wrapper md:grid grid-cols-3 py-1 bg-[#2F2F2F] gap-6'>
        {/* section-1 */}
        <section className='col-span-2 bg-[#100101] mt-3 p-3'>
           {/*div-1  */}
           <div>
                <h1 className='text-[#FFFFFF]'>Recipient Information</h1>
           </div>
        </section>
        {/* section-2 */}
        <section className=' text-white'>
            <CartSummary/>
        </section>
    </main>
    </>
  )
}

export default CheckOut