import { useContext } from "react";
import CartContext from "../context/CartContext";
import UseTitle from "../Hooks/UseTitle";
import SimilarProducts from "../components/SimilarProducts";
import CartSummary from "../components/CartSummary";
import CartItems from "../features/cart/CartItems";

const Cart = () => {
  const { cart } = useContext(CartContext);
  UseTitle("Your Cart", "Review the items in your cart before checkout.");

  return (
    <>
      {cart.length === 0 ? (
        <div className="text-center min-h-80 flex justify-center items-center font-[600] text-[20px]">
          <h1 className="text-white">Your cart is feeling lonely! 😟 Add some items to keep it company ☹️.</h1>
        </div>
      ) : (
        <main className="text-white wrapper grid lg:grid-cols-3 gap-[20px]">
          <CartItems />
          <CartSummary />
        </main>
      )}
      <SimilarProducts />
    </>
  );
};

export default Cart;
