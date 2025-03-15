import React, { useContext } from 'react';
import deleteIcon from "../assets/waste-bin.svg";
import CartContext from '../context/CartContext';
import UseTitle from '../Hooks/UseTitle';
import {  toast } from 'sonner';
import { calculateTotalPrice, handleInc,handleDec,handleRemove } from '../utils/CartUtils';



const Cart = () => {
    const {cart,setCart} = useContext(CartContext)
    UseTitle("Your Cart | Eggys place")
   
    const totalPrice    = calculateTotalPrice(cart)
  return (
    <>
    {cart.length === 0 ? <h1>No item</h1> :  <main className='bg-[#2F2F2F] text-white wrapper grid lg:grid-cols-3 gap-[20px] '>
        <section className='col-span-2 border '>
            <h1 className='px-8 py-4'> cart</h1>

            <div className='p-6 bg-black'>
                {cart.map((cartItem)=>{
                    const {_id,image,title,price,quantity} = cartItem
                    return(
                        <div key={_id} className='flex flex-wrap justify-between items-center px-8 mb-10  bg-[#252422] p-6'>
                            <div>
                            <img src={image} alt={title}  className='w-40 rounded-2xl'/>
                            <h1> {title} </h1>
                            <h2> {price} </h2>

                            </div>
                            <div className='flex items-center flex-col gap-8'>
                                <img onClick={()=> {handleRemove(cart, setCart,_id),toast.success('Item removed') }} className='cursor-pointer ' src={deleteIcon} alt="waste-bin" />
                                <div className='flex items-center gap-4'>
                                    <h2 className=' cursor-pointer bg-yellow-500 p-3 rounded-full' onClick={()=>handleInc(cart, setCart,_id)}>+</h2>
                                    <p> {quantity} </p>
                                    <h2 className=' cursor-pointer bg-yellow-500 p-3 rounded-full' onClick={()=>handleDec(cart, setCart,_id)}>-</h2>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
        <section className='p-2 bg-black w-full h-fit'>
            <h1>summary</h1>
            <div className='bg-[#252422] w-full'>
                <h3> product Total ({cart.length}) </h3>
                <h3>VAT 1000 </h3>
                <h3>delivery 1500</h3>
                <hr />
                <h1>Total {(totalPrice + 2500).toLocaleString()} </h1>
            </div>
        </section>
    </main>  }

   
    </>
  )
}

export default Cart