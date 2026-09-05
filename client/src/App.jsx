import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense, useState, useEffect } from "react";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import LoadingRing from "./utils/Loader";
import { Toaster as SonnerToaster } from "sonner";
import ScrollToTop from "./utils/ScrollToTop";
import LocationModal from "./components/modals/LocationModal";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import RoleBasedRoutes from "./routes/RoleBasedRoutes.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

const Home = lazy(() => import("./pages/Home"));
const Product = lazy(() => import("./pages/Product"));
const Cart = lazy(() => import("./pages/Cart"));
const CheckOut = lazy(() => import("./pages/CheckOut"));
const OrderDetails = lazy(() => import("./pages/OrderDetails"));
const Orders = lazy(() => import("./pages/Orders"));
const DeliveredPage = lazy(() => import("./pages/DeliveredPage"));
const CancelledPage = lazy(() => import("./pages/CancelledPage"));
const AdminDashBoard = lazy(() => import("./pages/AdminDashBoard"));
const DashBoard = lazy(() => import("./pages/DashBoard"));
const AllOrders = lazy(() => import("./pages/AllOrders"));
const AdminOrderDetails = lazy(() => import("./pages/AdminOrderDetails"));
const Customer = lazy(() => import("./pages/Customer"));
const ResetPwd = lazy(() => import("./auth/ResetPwd"));
const ForgotPwd = lazy(() => import("./auth/ForgotPwd"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));

const PageFallback = () => (
  <div className="flex justify-center items-center h-screen">
    <LoadingRing />
  </div>
);

function App() {
  const [, setLocation] = useState("");

  useEffect(() => {
    const savedLocation = localStorage.getItem("userLocation");
    if (savedLocation) {
      setLocation(savedLocation);
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <LocationModal onLocationSelect={setLocation} />
        <ErrorBoundary>
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route
                element={
                  <>
                    <Navbar />
                    <Footer />
                  </>
                }
              >
                <Route path="/" element={<Home />} />
                <Route path="/product/:productId" element={<Product />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/check-out" element={<CheckOut />} />
                <Route
                  path="/orders/delivered/:orderId"
                  element={
                    <PrivateRoute>
                      <OrderDetails />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <RoleBasedRoutes requiredRole={["admin"]}>
                        <AdminDashBoard />
                      </RoleBasedRoutes>
                    </PrivateRoute>
                  }
                >
                  <Route index element={<DashBoard />} />
                  <Route path="all-orders" element={<AllOrders />} />
                  <Route path="all-orders/:orderId" element={<AdminOrderDetails />} />
                  <Route path="customer" element={<Customer />} />
                </Route>
                <Route
                  path="/orders"
                  element={
                    <PrivateRoute>
                      <Orders />
                    </PrivateRoute>
                  }
                >
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
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
      <SonnerToaster />
    </>
  );
}

export default App;
