import React, { useContext } from "react";
import deleteIcon from "../assets/waste-bin.svg";
import CartContext from "../context/CartContext";
import UseTitle from "../Hooks/UseTitle";
import { toast } from "sonner";
import {
  calculateTotalPrice,
  handleInc,
  handleDec,
  handleRemove,
} from "../utils/CartUtils";

const Cart = () => {
  const { cart, setCart } = useContext(CartContext);
  UseTitle("Your Cart | Eggys place");

  const totalPrice = calculateTotalPrice(cart);
  return (
    <>
      {cart.length === 0 ? (
        <h1>No item</h1>
      ) : (
        <main className="bg-[#2F2F2F] text-white wrapper grid lg:grid-cols-3 gap-[20px] ">
          <section className="md:col-span-2 rounded-[10px] mt-3 bg-[#100101] ">
            <h1 className="px-3 md:px-8 pt-4 font-[500] text-[24px] "> Carts ({cart.length}) </h1>

            <div className="px-3 md:px-8 pb-3 pt-2">
                <h1 className="border-t"></h1>
            </div>

            <div className=" bg-black px-3 md:px-8  ">
              {cart.map((cartItem) => {
                const { _id, image, title, price, quantity } = cartItem;
                return (
                  <div
                    key={_id}
                    className="flex flex-wrap justify-between items-center  mb-6 rounded-[11px]  bg-[#252422] p-[10px]"
                  >
                    <div className="flex justify-between items-center gap-3">
                        <div className="h-[88px]">

                      <img
                        src={image}
                        alt={title}
                        className="w-[98px] h-full  rounded-2xl"
                      />
                        </div>
                      <div className="flex flex-col gap-2">

                      <h1 className="font-[500] text-[18px]"> {title.slice(0,7)} </h1>
                      <p className="font-[400] text-[12px] text-[#FBFBFB]"> 14/01/2025 </p>
                      <h2 >  <span className="text-[#B67B0F] font-[500] text-[18px]">
                          &#8358;
                        </span>{" "}  <span className="text-[#B67B0F] font-[500] text-[18px]">  {price} </span> </h2>
                      </div>
                    </div>
                    <div className="flex  flex-col gap-8">
                        <div className="flex justify-end">
                            
                      <img
                        onClick={() => {
                          handleRemove(cart, setCart, _id),
                            toast.success("Item removed");
                        }}
                        className="cursor-pointer w-[24px] "
                        src={deleteIcon}
                        alt="waste-bin"
                      />
                        </div>
                      <div className="flex items-center gap-4">
                        <h2
                          className="text-center cursor-pointer bg-[#B67B0F] text-[#FBFBFB]  p-[4px] rounded-[17px] h-[32px] w-[32px]"
                          onClick={() => handleInc(cart, setCart, _id)}
                        >
                          +
                        </h2>
                        <p> {quantity} </p>
                        <h2
                          className=" text-center cursor-pointer bg-[#B67B0F] text-[#FBFBFB]  p-[4px] rounded-[17px] h-[32px] w-[32px]"
                          onClick={() => handleDec(cart, setCart, _id)}
                        >
                          -
                        </h2>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
          <section className="p-[15px] rounded-[10px] bg-black w-full h-fit mt-3 sticky top-24 ">
            <h1 className="font-[500] text-[24px] pb-[15px]">Summary</h1>
            <div className="bg-[#252422] p-[10px] rounded-[8px] w-full">
              <h3> product Total ({cart.length}) </h3>
              <h3>VAT 1000 </h3>
              <h3>delivery 1500</h3>
              <hr />
              <h1>Total {(totalPrice + 2500).toLocaleString()} </h1>
            </div>
          </section>
        </main>
      )}
    </>
  );
};

export default Cart;
