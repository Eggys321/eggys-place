import React, { useContext } from 'react';
import deleteIcon from "../assets/waste-bin.svg";
import CartContext from '../context/CartContext';
import UseTitle from '../Hooks/UseTitle';
import {  toast } from 'sonner';


const Cart = () => {
    const {cart,setCart} = useContext(CartContext)
    console.log(cart);
    UseTitle("Your Cart | Eggys place")
    // handleRemove
    function handleRemove(cartId){
        let remove = cart.filter( ( cartItx ) => cartItx._id !== cartId )
        setCart(remove)
    }

    // handleInc
    let handleInc =(productId)=>{
        const incQty = cart.map((cartItx)=>cartItx._id === productId ? {...cartItx,quantity:cartItx.quantity + 1 } : cartItx )

        setCart(incQty)

    }

    // handleDec


    let handleDec = function(itemId){
        const decQty = cart.map((cartItx)=>{
            if(cartItx._id === itemId){
                const qty = cartItx.quantity > 1 ? cartItx.quantity - 1 : 1;
                return{...cartItx,quantity:qty}
            }
            return cartItx;
        })
        setCart(decQty)
    }

    // total price
    const totalPrice = cart.reduce((total,product)=> total + parseFloat(product?.price) * product?.quantity, 0)
    // console.log(totalPrice);
    
    
  return (
    <>
    {cart.length === 0 ? <h1>No item</h1> :  <main className='bg-[#2F2F2F] text-white wrapper grid lg:grid-cols-3 gap-[20px] '>
        <section className='col-span-2 border '>
            <h1 className='px-8 py-4'> cart</h1>

            <div className='p-6 bg-black'>
                {cart.map((cartItem)=>{
                    const {_id,image,title,price,quantity} = cartItem
                    return(
                        <div className='flex flex-wrap justify-between items-center px-8 mb-10  bg-[#252422] p-6'>
                            <div>
                            <img src={image} alt={title}  className='w-40 rounded-2xl'/>
                            <h1> {title} </h1>
                            <h2> {price} </h2>

                            </div>
                            <div className='flex items-center flex-col gap-8'>
                                <img onClick={()=> {handleRemove(_id),toast.success('Item removed') }} className='cursor-pointer ' src={deleteIcon} alt="waste-bin" />
                                <div className='flex items-center gap-4'>
                                    <h2 className=' cursor-pointer bg-yellow-500 p-3 rounded-full' onClick={()=>handleInc(_id)}>+</h2>
                                    <p> {quantity} </p>
                                    <h2 className=' cursor-pointer bg-yellow-500 p-3 rounded-full' onClick={()=>handleDec(_id)}>-</h2>
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