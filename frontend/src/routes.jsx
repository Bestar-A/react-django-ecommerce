import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import App from "./App";

const routes = createBrowserRouter (
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route path="/" element={<HomeScreen />} exact />
            <Route path="/product/:id" element={<ProductScreen />} />
        </Route>
    )
)

export default routes