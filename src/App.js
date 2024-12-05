import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
  ScrollRestoration,
} from "react-router-dom"
import PrivateRoute from "./components/PrivateRoute"
import Footer from "./components/home/Footer/Footer"
import FooterBottom from "./components/home/Footer/FooterBottom"
import Header from "./components/home/Header/Header"
import HeaderBottom from "./components/home/Header/HeaderBottom"
import SpecialCase from "./components/SpecialCase/SpecialCase"
import About from "./pages/About/About"
import SignIn from "./pages/Account/SignIn"
import SignUp from "./pages/Account/SignUp"
import Cart from "./pages/Cart/Cart"
import Contact from "./pages/Contact/Contact"
import Home from "./pages/Home/Home"
import Journal from "./pages/Journal/Journal"
import Offer from "./pages/Offer/Offer"
import Payment from "./pages/payment/Payment"
import ProductDetails from "./pages/ProductDetails/ProductDetails"
import Shop from "./pages/Shop/Shop"
import Profile from "./pages/Profile/Profile"

const Layout = () => {
  return (
    <div>
      <Header />
      <HeaderBottom />
      <SpecialCase />
      <ScrollRestoration />
      <Outlet />
      <Footer />
      <FooterBottom />
    </div>
  )
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* Public routes */}
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Root layout with nested routes */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        {/* Public home page */}

        {/* Protected routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/offer" element={<Offer />} />
          <Route path="/product/:_id" element={<ProductDetails />} />
          <Route path="/paymentgateway" element={<Payment />} />
        </Route>
      </Route>
    </Route>
  )
)

function App() {
  return (
    <div className="font-bodyFont">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
