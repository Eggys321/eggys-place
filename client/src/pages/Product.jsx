import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { menuItems } from "../db";
import MyButton from "../components/MyButton";
import { useEffect } from "react";
import CartContext from "../context/CartContext";
import { toast } from "sonner";

const Product = () => {
  const { handleAddToCart } = useContext(CartContext);
  const { id } = useParams();
  const product = menuItems.find((item) => item._id == id);
  const similarProducts = menuItems
    .filter((item) => item.category == product.category)
    .map((it) => it);
 

  useEffect(() => {
    // window.scrollTo(0, 0);
    // window.scroll({
    //   top: 0,
    //   left: 0,
    //   behavior: "smooth",
    // });
  },[]);

  return (
    <>
      <main className="wrapper bg-[#2F2F2F]  ">
        <section className="md:grid grid-cols-2 py-5 ">
          <div className="">
            <img src={product.image} alt="" className="w-screen object-cover" />
          </div>
          <div className="text-[#FFFFFF] md:px-8 flex flex-col justify-center gap-y-[20px] ">
            <h1 className="font-[500] text-[34px]"> {product.title} </h1>
            <p className="font-[400] text-[20px] py-4">
              {" "}
              {product.description}{" "}
            </p>
            <MyButton
              onClick={() => {
                handleAddToCart(product), toast.success("Item added");
              }}
              text="Add To Cart"
              className="w-full h-[56px] "
            />
          </div>
        </section>

        <section className="mt-10 ">
          <h2 className="text-white text-4xl pb-6">Others You Might Like</h2>
          <div className="inline-flex flex-wrap justify-between gap-8">
            {similarProducts.map((similarProduct) => {
              const {_id,image,title} = similarProduct
              return (
                <div className="" key={_id}>
                  <img src={image} alt={title} className="" />
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
};

export default Product;
