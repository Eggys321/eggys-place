import React from "react";
import { categoryList, menuItems } from "../../db";
import MyButton from "../../components/MyButton";
import SearchField from "../../components/SearchField";
import FieldSet from "./FieldSet";

const Menu = () => {
  return (
    <>
      <main className="bg-[#2F2F2F] wrapper">
        <section className="hidden md:flex justify-between items-center text-center my-8 bg-[#252422] rounded-[100px] px-4 lg:px-25 py-[10px]">
          {categoryList.map((oneCategory) => {
            const { _id, category, img } = oneCategory;
            return (
              <div key={_id} className="cursor-pointer">
                <img src={img} alt={category} />
                <h2 className="text-[#FFFFFF]"> {category} </h2>
              </div>
            );
          })}
        </section>
        <section className="md:hidden mt-5">
      

         <FieldSet/>
          {/* <SearchField /> */}
        </section>
        {/* section-2 */}
        <section className="md:grid md:grid-cols-2 lg:grid-cols-3  justify-items-center gap-10  my-10 ">
          {menuItems.map((menuItem) => {
            const { _id, title, image, rating, duration, price, category } =
              menuItem;
            return (
              <div
                key={_id}
                className="card bg-[#252422] w-full md:w-[347px] lg:w-[94%] p-[16px] my-10 md:my-0 shadow-sm"
              >
                <figure>
                  <img
                    src={image}
                    alt="Shoes"
                    className="w-full h-auto object-cover "
                  />
                </figure>
                <div className="">
                  <h2 className="card-title text-[#FBFBFB] ">{title} </h2>
                  <p>
                    A card component has a figure, a body part, and inside body
                    there are title and actions parts
                  </p>
                  <div className="card-actions justify-end">
                    <MyButton text="Add to cart" className="w-full h-[56px]" />
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
