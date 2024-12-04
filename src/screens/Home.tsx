import React, { useEffect, useMemo, useCallback } from "react";
import Product from '../components/card';
import { useNavigate, useSearchParams } from "react-router";
import {
    setSearchQuery,
    setCategoryFilter,
    setSortBy,
    resetFilters,
} from "../features/product/productSlice";
import { RootState } from "../app/store";
import { BsSearch } from "react-icons/bs";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../app/hooks";

const Home = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    // Get filtered products and loading status from Redux
    const { filteredProducts, } = useAppSelector(
        (state: RootState) => state.product,
        (prev, next) =>
            prev.filteredProducts === next.filteredProducts &&
            prev.isLoading === next.isLoading
    );

    // Memoized URL update function to prevent unnecessary re-renders
    const updateURL = useCallback((filters: {
        search?: string;
        category?: string | null;
        sort?: string | null
    }) => {
        const params: Record<string, string> = {};

        if (filters.search) params.search = filters.search;
        if (filters.category) params.category = filters.category;
        if (filters.sort) params.sort = filters.sort;

        console.log(params)

        setSearchParams(params);
    }, [setSearchParams]);

    // Sync Redux state with URL search params (memoized to prevent unnecessary re-renders)
    useEffect(() => {
        const searchQuery = searchParams.get("search") || "";
        const categoryFilter = searchParams.get("category") || null;
        const sortBy = searchParams.get("sort") as "asc" | "desc" | null;

        // Dispatch only if values have changed
        if (searchQuery) dispatch(setSearchQuery(searchQuery));
        if (categoryFilter) dispatch(setCategoryFilter(categoryFilter));
        if (sortBy) dispatch(setSortBy(sortBy));
    }, [searchParams, dispatch]);

    // Memoized event handlers to prevent unnecessary re-renders
    const handleSearchChange = useCallback((searchterm: string) => {

        dispatch(setSearchQuery(searchterm));
        const categoryFilter = searchParams.get("category") || null;
        const sortBy = searchParams.get("sort") as "asc" | "desc" | null;


        updateURL({ search: searchterm, category: categoryFilter, sort: sortBy });
    }, [dispatch, searchParams, updateURL]);

    const handleCategoryChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        const category = e.target.value || null;
        dispatch(setCategoryFilter(category));
        const searchQuery = searchParams.get("search") || "";
        const sortBy = searchParams.get("sort") as "asc" | "desc" | null;


        updateURL({ category, sort: sortBy, search: searchQuery });
    }, [dispatch, updateURL, searchParams]);

    const handleSortChange = useCallback((sortOrder: "asc" | "desc") => {
        dispatch(setSortBy(sortOrder));

        const searchQuery = searchParams.get("search") || "";
        const categoryFilter = searchParams.get("category") || null;

        updateURL({ sort: sortOrder, search: searchQuery, category: categoryFilter });
    }, [dispatch, updateURL, searchParams]);

    const handleResetFilters = useCallback(() => {
        dispatch(resetFilters());
        navigate("/");

        const searchInput = document.getElementById('search') as HTMLInputElement;

        searchInput.value = '';
    }, [dispatch, navigate]);

    // Memoize products rendering to prevent unnecessary re-renders
    const productList = useMemo(() =>
        filteredProducts?.map((product) => (
            <Product product={product} key={product.id} />
        )),
        [filteredProducts]
    );

    return (
        <div>
            <section className="py-20 ">
                <div className="container mx-auto">
                    <div className="flex items-center  ">


                        <div className="mt-10 flex flex-col md:flex-row gap-4  w-full items-center mb-10 justify-between px-10">
                            <form className="flex gap-3 min-w-72 " onSubmit={(e) => {
                                e.preventDefault();

                                const formData = new FormData(e.currentTarget);

                                const data = Object.fromEntries(formData);


                                handleSearchChange(data.search as string)

                            }} >


                                <input
                                    id='search'
                                    type="text"
                                    name="search"
                                    placeholder="Search..."
                                    className="p-2 border border-gray-300 rounded-md w-full max-w-md dark:text-black"

                                    defaultValue={searchParams.get("search") || ""}
                                />
                                <button className="flex gap-1 items-center w-fit px-4 py-2 bg-blue-500 text-white rounded-md" type="submit">
                                    <BsSearch fontSize={14} />
                                </button>
                            </form>
                            <div className="flex gap-4 items-center ">
                                <select
                                    className="p-2 border border-gray-300 rounded-md w-full max-w-md dark:text-black"
                                    onChange={handleCategoryChange}
                                    value={searchParams.get("category") || ""}
                                >
                                    <option value="">All Categories</option>
                                    <option value="electronics">Electronics</option>
                                    <option value="jewelery">Jewelery</option>
                                    <option value="men's clothing">Men's Clothing</option>
                                    <option value="women's clothing">Women's Clothing</option>
                                </select>
                                <div className="flex gap-4 items-center content-center min-w-fit">
                                    {
                                        searchParams.get('sort') !== 'desc' ?
                                            <button
                                                type="button"
                                                className="px-4 py-2 bg-blue-500 text-white  rounded-md"
                                                onClick={() => handleSortChange("desc")}
                                            >
                                                <FaSortAmountUp />
                                            </button> :
                                            <button
                                                type="button"
                                                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                                                onClick={() => handleSortChange("asc")}
                                            >
                                                <FaSortAmountDown />


                                            </button>

                                    }


                                    <button
                                        type="button"
                                        className="px-4 py-2 bg-neutral-600 text-white rounded-md min-w-fit"
                                        onClick={handleResetFilters}
                                    >
                                        ╳
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:mx-8 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
                        {productList}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;