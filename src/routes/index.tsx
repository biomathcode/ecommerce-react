import { createBrowserRouter } from "react-router";

import Home from "../screens/Home";
import ProductPage from "../screens/ProductPage";
import App from "../App";
import { store } from '../app/store'
import { getProducts, getSingleProduct } from "../features/product/productSlice";

// import { Cart, Catalog, Home, Product } from "../pages";
// import LoginPage from "../pages/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
        loader: async () => {
          // Dispatch action to fetch products
          await store.dispatch(getProducts());
          // Return the data from Redux state
          return store.getState().product.products;

        },
      },
      {
        path: '/product/:id',
        element: <ProductPage />,
        loader: async ({ params }) => {

          const { id } = params;
          if (!id) throw new Error("Product ID is required");

          // Dispatch action to fetch a single product
          await store.dispatch(getSingleProduct(Number(id)));
          // Return the data from Redux state
          return store.getState().product.product;

        },

      }
    ]

  },

]);