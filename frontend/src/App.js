import React, { useEffect } from 'react';
import './App.css';
import {BrowserRouter , Route, Routes} from 'react-router-dom';
import {
    LoginPage,
    SignUpPage,
    ActivationPage,
    HomePage,
    ProductPage,
    BestSellingPage,
    EventsPage,
    FAQPage,
    PaymentPage,
    OrderSuccessPage,
    CheckoutPage,
    ProductDetailsPage,
    ProfilePage,
    ShopCreatePage,
    SellerActivationPage,
    ShopLoginPage,
  } from "./routes/Routes.js";
  import {
    ShopDashboardPage,
    ShopCreateProduct,
    ShopAllProducts,
    ShopCreateEvents,
    ShopAllEvents,
    ShopAllCoupouns,
    ShopPreviewPage,
    ShopAllCoupon,
    // ShopAllOrders,
    // ShopOrderDetails,
    // ShopAllRefunds,
    // ShopSettingsPage,
    // ShopWithDrawMoneyPage,
    // ShopInboxPage,
  } from "./routes/ShopRoutes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Store from './redux/store';
import { loadUser } from './redux/actions/user';
import { loadSeller } from './redux/actions/user';
import ProtectedRoute from './routes/protectedRoute.js';
import SellerProtectedRoute from './routes/protectedRoute.js';
import {ShopHomePage} from './routes/ShopRoutes.js';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const App = ({}) => {
    const {loading , isAuthenticated } = useSelector((state) => state.user);
    const {isloading, isSeller} = useSelector((state) => state.seller);
    useEffect(() => {
        Store.dispatch(loadUser());
        Store.dispatch(loadSeller());

        if(isSeller === true){
            return <Navigate to="/shop"  replace />;
        }
    }, []);
    return (
        <>
        {loading || isloading ? null : (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />}/>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/sign-up" element={<SignUpPage />} />
                <Route
                    path="/seller/activation/:activation_token"
                    element={<SellerActivationPage />}
               />
                <Route path="/seller/activate/:activation_token" element={<SellerActivationPage />} />
                <Route path="/products" element={<ProductPage />} />
                <Route path = "/product/:name" element={<ProductDetailsPage />}/>
                <Route path="/best-selling" element={<BestSellingPage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/order-success" element={<OrderSuccessPage />} />
                <Route path="/checkout" 
                element={
                    <ProtectedRoute>
                        <CheckoutPage /> 
                    </ProtectedRoute>
                   } 
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                        <ProfilePage />
                        </ProtectedRoute>
                    }
                />
                  {/* shop Routes */}
              <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />
              <Route path="/shop-create" element={<ShopCreatePage />} />
              <Route path="/shop-login" element={<ShopLoginPage />} />
              <Route path="/shop/:id" 
              element={
                <SellerProtectedRoute>
                    <ShopHomePage />
                </SellerProtectedRoute>
               }
              />
              <Route path="/dashboard" 
              element={
                <SellerProtectedRoute>
                    <ShopDashboardPage />
                </SellerProtectedRoute>
               }
              />
             <Route path="/dashboard-create-product" 
              element={
                <SellerProtectedRoute>
                    <ShopCreateProduct />
                </SellerProtectedRoute>
               }
              />
              <Route path="/dashboard-products" 
              element={
                <SellerProtectedRoute>
                    <ShopAllProducts />
                </SellerProtectedRoute>
               }
              />
              <Route path="/dashboard-create-event" 
              element={
                <SellerProtectedRoute>
                    <ShopCreateEvents />
                </SellerProtectedRoute>
               }
              />
              <Route path="/dashboard-events" 
              element={
                <SellerProtectedRoute>
                    <ShopAllEvents />
                </SellerProtectedRoute>
               }
              />
              <Route path="/dashboard-coupouns" 
              element={
                <SellerProtectedRoute>
                    <ShopAllCoupon />
                </SellerProtectedRoute>
               }
              /> 
            </Routes>
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
      />
        </BrowserRouter>
    
    )}
    </>
    );
};

export default App;
