import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, useState,useEffect } from "react";
import { Home, Navbar } from "./routes/routes";
import Footer from "./layouts/Footer";
import LoadingRing  from "./utils/Loader";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import { Toaster, toast } from 'sonner';


// const cartItemsFromLocalStorage = JSON.parse(localStorage.getItem('cart')) || []

function App() {
  // const [cart, setCart] = useState(cartItemsFromLocalStorage);
  // useEffect(()=>{
  //   localStorage.setItem('cart',JSON.stringify(cart))

  // },[cart])
  // const handleAddToCart = (item)=>{
  //     const isPresent = cart.some((product)=> product._id === item._id)
  //     if(isPresent){
  //       const updatedCart = cart.map((product)=>{
  //         product._id === item._id ? {...product, quantity:product.quantity + 1}:product
  //       })
  //       setCart(updatedCart);
  //     }else{
  //       const newItem = {...item, quantity:1}
  //       setCart([...cart,newItem]);
  //       console.log([...cart,newItem]);
        
  //     }
      
  //   }
  // const [cart, setCart] = useState(cartItemsFromLocalStorage);
  // useEffect(()=>{
  //   localStorage.setItem('cart',JSON.stringify(cart))

  // },[cart])
  // console.log(cart);
  
  
  // let handleAddToCart = (product) => {
  //   const productSelected = cart.find(
  //     (singleCart) => singleCart._id === product._id
  //   );
  //   if (productSelected) {
  //     setCart(
  //       cart.map((oneItem) =>
  //         oneItem._id === product._id
  //           ? {
  //               ...productSelected,
  //               quantity: productSelected.quantity + 1,
  //             }
  //           : oneItem
  //       )
  //     );
  //   } else {
  //     setCart([...cart, { ...product, quantity: 1 }]);
  //   }    
  // };
  

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div className="flex justify-center items-center h-screen"> <LoadingRing/> </div>}>
        <Navbar/>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/product/:id" element={<Product/>}/>
            <Route path="/cart" element={<Cart/>}/>
          </Routes>
          <Footer/>
        </Suspense>
      </BrowserRouter>
      <Toaster />
      {/* <BrowserRouter>
        <Suspense fallback={<div className="flex justify-center items-center h-screen"> <LoadingRing/> </div>}>
        <Navbar cart={cart} setCart={setCart}/>
        <Navbar cart={cart} setCart={setCart}/>
          <Routes>
            <Route path="/" element={<Home  handleAddToCart = {handleAddToCart} />} />
            <Route path="product/:id" element={<Product/>}/>
            <Route path="cart" element={<Cart cart={cart} setCart={setCart}/>}/>
          </Routes>
          <Footer/>
        </Suspense>
      </BrowserRouter>
      <Toaster /> */}

    </>
  );
}

export default App;
