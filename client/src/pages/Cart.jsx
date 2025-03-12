import React from 'react';
import deleteIcon from "../assets/waste-bin.svg"

const Cart = ({cart,setCart}) => {
    console.log(cart);
    function handleRemove(cartId){
        let remove = cart.filter( ( cartItx ) => cartItx._id !== cartId )
        setCart(remove)
    }
    
  return (
    <>
    {cart.length === 0 ? <h1>No item</h1> :  <main className='bg-[#2F2F2F] text-white wrapper grid lg:grid-cols-3 gap-[20px] '>
        <section className='col-span-2 border '>
            <h1 className='px-8 py-4'> cart</h1>

            <div className='p-6 bg-black'>
                {cart.map((cartItem)=>{
                    const {_id,image,title,price} = cartItem
                    return(
                        <div className='flex justify-between items-center px-8 mb-10  bg-[#252422] p-6'>
                            <div>
                            <img src={image} alt={title}  className='w-40 rounded-2xl'/>
                            <h1> {title} </h1>
                            <h2> {price} </h2>

                            </div>
                            <div className='flex flex-col gap-8'>
                                <img onClick={()=> handleRemove(_id)} className='cursor-pointer ' src={deleteIcon} alt="waste-bin" />
                                <div className='flex gap-4'>
                                    <h2 className=' cursor-pointer bg-yellow-500 p-3 rounded-full '>+</h2>
                                    <p>1 </p>
                                    <h2 className=' cursor-pointer bg-yellow-500 p-3 rounded-full '>-</h2>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
        <section>
            <h1>summary</h1>
        </section>
    </main>  }

   
    </>
  )
}

export default Cart