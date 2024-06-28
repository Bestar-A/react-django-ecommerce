import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import App from "./App";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";

const routes = createBrowserRouter (
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route path="/" element={<HomeScreen />} exact />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/login" element={<LoginScreen />} />
        </Route>
    )
)

export default routes