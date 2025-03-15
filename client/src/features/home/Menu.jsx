import React, { useContext, useState } from "react";
import { categoryList, menuItems } from "../../db";
import MyButton from "../../components/MyButton";
import SearchField from "../../components/SearchField";
import FieldSet from "./FieldSet";
import rateIcon from "../../assets/rating-icon.svg";
import { Link } from "react-router-dom";
import {  toast } from 'sonner';
import CartContext from "../../context/CartContext"


const Menu = () => {
  const [selectedCat, setSelectedCat] = useState("Burger");
  const {handleAddToCart} = useContext(CartContext)
  return (
    <>
      <main className="bg-[#2F2F2F] wrapper">
        <section className="hidden md:flex justify-between items-center text-center my-8 bg-[#252422] rounded-[100px] px-4 lg:px-25 py-[10px]">
          {categoryList.map((oneCategory) => {
            const { _id, category, img } = oneCategory;
            return (
              <div
                key={_id}
                className={`cursor-pointer transition-all ${
                  selectedCat === oneCategory.category
                    ? "brightness-100 text-white scale-105 shadow-lg"
                    : "brightness-[0.4] hover:brightness-75"
                }`}
                onClick={() => setSelectedCat(oneCategory.category)}
              >
                <img src={img} alt={category} />
                <h2 className="text-[#FFFFFF]"> {category} </h2>
              </div>
            );
          })}
        </section>
        <section className="md:hidden mt-5">
          <FieldSet selectedCat={selectedCat}  setSelectedCat={setSelectedCat} />
          {/* <SearchField /> */}
        </section>
        {/* section-2 */}
        <section className="md:grid md:grid-cols-2 lg:grid-cols-3  justify-items-center gap-10  my-10 ">
          {menuItems
            .filter((menuItem) => menuItem.category === selectedCat)
            .map((mappedMenu) => {
              const { _id, title, image, rating, duration, price, category } =
                mappedMenu;
              return (
                <div
                  key={_id}
                  className="card bg-[#252422] w-full md:w-[340px] lg:w-[98%]  p-[16px] my-10 md:my-0 shadow-sm"
                >
                  <Link to={`/product/${_id}`}>
                  
                  <figure>
                    <img
                      src={image}
                      alt="Shoes"
                      className="w-full h-auto object-cover "
                    />
                  </figure>
                  </Link>
                  <div className="pt-4">
                    <div className="flex justify-between items-center">
                      <h2 className="card-title font-[500] text-[20px] text-[#FBFBFB] ">
                        {title}{" "}
                      </h2>
                      <div className="flex gap-x-2 border border-[#B67B0F] py-[6px] px-[4px] rounded-[2px] ">
                        <img src={rateIcon} alt="rate-icon" />
                        <p className="text-[#FBFBFB] font-[400] text-[14px]">
                          {" "}
                          {rating}{" "}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-[#B67B0F]  py-5 ">
                        {" "}
                        <span className="font-[200] text-[23px]">
                          &#8358;
                        </span>{" "}
                        <span className="font-[500] text-[31px]">{price}</span>{" "}
                      </p>
                      <p className="text-[#FBFBFB]"> {duration} </p>
                    </div>
                    <div className="card-actions justify-center ">
                      <MyButton
                        text="Add to cart"
                        className="w-full h-[56px]"
                        onClick={()=> {handleAddToCart(mappedMenu) ,  toast.success('Item added')  } }
                      />
                    </div>
                  </div>
                </div>
              );
            })}
        </section>
      </main>
    </>
  );
};

export default Menu;
