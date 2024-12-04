import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import productService from "./productService";
import { toast } from "react-toastify";
import { Product } from "../../types/product";
import { STATUS } from "../../constants/status";
import Fuse from "fuse.js";

export interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  product: Product;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  status: string;
  searchQuery: string;
  categoryFilter: string | null;
  sortBy: "asc" | "desc" | null;
}

const initialState: ProductState = {
  products: [],
  filteredProducts: [],
  product: {
    category: "",
    description: "",
    id: 0,
    image: "",
    price: 0,
    title: "",
  },
  isError: false,
  isSuccess: false,
  isLoading: false,
  status: "",
  searchQuery: "",
  categoryFilter: null,
  sortBy: null,
};

export const getProducts = createAsyncThunk(
  "products/getAll",
  async (_, thunkAPI) => {
    try {
      return await productService.getProducts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const getSingleProduct = createAsyncThunk(
  "products/getProduct",
  async (id: number, thunkAPI) => {
    try {
      return await productService.getSingleProduct(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getCategory = createAsyncThunk(
  "products/getCategory",
  async (data: string, thunkAPI) => {
    try {
      return await productService.getCategory(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const filterAndSortProducts = (state: ProductState): Product[] => {
  let results = [...state.products];

  // Filter by category
  if (state.categoryFilter) {
    results = results.filter((product) => product.category === state.categoryFilter);

    // console.log('results', results)
  }

  // Fuse.js search
  if (state.searchQuery) {
    const fuse = new Fuse(results, { keys: ["title", "description"], threshold: 0.3 });
    results = fuse.search(state.searchQuery).map((result) => result.item);
    // console.log('results', results)
  }

  // Sort by price
  if (state.sortBy) {
    results.sort((a, b) =>
      state.sortBy === "asc" ? a.price - b.price : b.price - a.price
    );
    // console.log('results', results)
  }

  return results;
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
      state.filteredProducts = filterAndSortProducts(state);
    },
    setCategoryFilter(state, action: PayloadAction<string | null>) {
      state.categoryFilter = action.payload;
      state.filteredProducts = filterAndSortProducts(state);
    },
    setSortBy(state, action: PayloadAction<"asc" | "desc" | null>) {
      state.sortBy = action.payload;
      state.filteredProducts = filterAndSortProducts(state);
    },
    resetFilters(state) {
      state.searchQuery = "";
      state.categoryFilter = null;
      state.sortBy = null;
      state.filteredProducts = state.products;
    },
    productReset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
        state.status = STATUS.LOADING;
      })
      .addCase(
        getProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.products = action.payload;
          state.filteredProducts = action.payload; // Initially show all products
          state.status = STATUS.IDLE;
        }
      )
      .addCase(getProducts.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.status = STATUS.ERROR;
        toast.error(state.status);
      })
      .addCase(getSingleProduct.pending, (state) => {
        state.isLoading = true;
        state.status = STATUS.LOADING;
      })
      .addCase(
        getSingleProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.product = action.payload;
          state.status = STATUS.IDLE;
        }
      )
      .addCase(getSingleProduct.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.status = STATUS.ERROR;
        toast.error(state.status);
      });
      
  },
});

export const {
  setSearchQuery,
  setCategoryFilter,
  setSortBy,
  resetFilters,
  productReset,
} = productSlice.actions;
export default productSlice.reducer;






