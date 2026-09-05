import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, useState, useEffect } from "react";
import { Home, Navbar } from "./routes/routes";
import Footer from "./layouts/Footer";
import LoadingRing from "./utils/Loader";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import { Toaster as SonnerToaster } from "sonner";
import ScrollToTop from "./utils/ScrollToTop";
import LocationModal from "./components/modals/LocationModal";
import ResetPwd from "./auth/ResetPwd";
import ForgotPwd from "./auth/ForgotPwd";
import ErrorPage from "./pages/ErrorPage";
import CheckOut from "./pages/CheckOut";
import DashBoard from "./pages/DashBoard";
import Orders from "./pages/Orders";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import DeliveredPage from "./pages/DeliveredPage.jsx";
import CancelledPage from "./pages/CancelledPage.jsx";
import RoleBasedRoutes from "./routes/RoleBasedRoutes.jsx";
import OrderDetails from "./pages/OrderDetails.jsx";
import AdminDashBoard from "./pages/AdminDashBoard.jsx";
import Customer from "./pages/Customer.jsx";
import AllOrders from "./pages/AllOrders.jsx";
import AdminOrderDetails from "./pages/AdminOrderDetails.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

function App() {
  const [location, setLocation] = useState("");

  useEffect(() => {
    const savedLocation = localStorage.getItem("userLocation");
    if (savedLocation) {
      setLocation(savedLocation);
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-screen">
              {" "}
              <LoadingRing />{" "}
            </div>
          }
        >
          <ScrollToTop />
          <LocationModal onLocationSelect={setLocation} />
          <ErrorBoundary>
          <Routes>
            <Route
              element={
                <>
                  <Navbar /> <Footer />
                </>
              }
            >
              <Route path="/" element={<Home />} />
              <Route path="/product/:productId" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/check-out" element={<CheckOut />} />
              <Route  path="/orders/delivered/:orderId"  element={<PrivateRoute>
                <OrderDetails/>
              </PrivateRoute>} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <RoleBasedRoutes requiredRole={["admin"]}>
                    {<AdminDashBoard/>}
                    </RoleBasedRoutes>
                  </PrivateRoute>
                }
              >
                <Route index element={<DashBoard/>}/>
                <Route path="all-orders" element={<AllOrders/>} />
                <Route path="all-orders/:orderId" element={<AdminOrderDetails/>} />
                 <Route path="customer" element={<Customer/>}/>
               </Route>
              <Route path="/orders" element={ <PrivateRoute>
                    <Orders />
                  </PrivateRoute>}>
                <Route index element={<Navigate to="delivered" />} />
                <Route path="delivered" element={<DeliveredPage />} />
                <Route path="cancelled" element={<CancelledPage />} />
              </Route>
            </Route>
            <Route path="/reset-password" element={<ResetPwd />} />
            <Route path="/forgot-password" element={<ForgotPwd />} />
            <Route path="/reset-password/:resetToken" element={<ResetPwd />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          </ErrorBoundary>
        </Suspense>
      </BrowserRouter>
      <SonnerToaster />
    </>
  );
}

export default App;
