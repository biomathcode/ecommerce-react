import React, { useCallback } from "react";
import { Link } from "react-router"; // Updated import to match usage
import { BsPlus, BsEyeFill } from "react-icons/bs";
import type { Product } from "../../types/product";
import Rating from "../starRatings";
import { addToCart } from "../../features/cart/cartSlice";

import { useAppDispatch } from "../../app/hooks";

const Product = React.memo(({ product }: { product: Product }) => {
    const dispatch = useAppDispatch()
    const { id, image, category, title, price, rating } = product;

    const handleAddToCart = useCallback(() => {
        dispatch(addToCart({ product, quantity: 1 }));
    }, [dispatch, product]);

    return (
        <div className="bg-white shadow-md relative dark:bg-neutral-800">
            <div className="border-b border-[#e4e4e4] h-[300px] mb-[120px] relative overflow-hidden group transition">
                <div className="w-full h-full flex justify-center items-center">
                    <div className="w-[120px] md:w-[200px] mx-auto flex justify-center items-center">
                        <img
                            className="max-h-[160px] group-hover:scale-110 transition duration-300"
                            src={image}
                            alt={title}
                        />
                    </div>
                </div>
                <div className="absolute top-6 md:-right-11 right-5 group-hover:right-5 p-2 flex flex-col justify-center items-center gap-y-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button onClick={handleAddToCart}>
                        <div className="flex justify-center items-center text-white w-12 h-12 bg-blue-500">
                            <BsPlus className="text-3xl" />
                        </div>
                    </button>
                    <Link
                        viewTransition
                        to={`/product/${id}`}
                        className="w-12 h-12 bg-white dark:bg-neutral-700 flex justify-center items-center text-primary drop-shadow-xl"
                    >
                        <BsEyeFill />
                    </Link>
                </div>
            </div>
            <Link to={`/product/${id}`}>
                <div className="p-4 absolute bottom-0 w-full">
                    <div className="text-sm capitalize text-gray-500 mb-1">{category}</div>
                    <Rating
                        rating={rating?.rate as number}
                        totalCount={rating?.count as number}
                    />
                    <h2 className="font-semibold mb-1 line-clamp-1">{title}</h2>
                    <div className="flex justify-between w-full items-center">
                        <h2 className="font-semibold text-base">$ {price}</h2>
                    </div>
                </div>
            </Link>
        </div>
    );
});

export default Product;
