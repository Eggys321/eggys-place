import React, { useContext } from "react"
import CartContext from "../context/CartContext"


export const totalPrice = cart.reduce((total,product)=> total + parseFloat(product?.price) * product?.quantity, 0)

const TotalPrice = () => {
    const {cart,setCart} = useContext(CartContext)
  return {totalPrice}
}

export default TotalPrice
// total price