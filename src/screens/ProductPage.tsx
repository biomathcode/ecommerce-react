
import { useLoaderData } from "react-router";
import type { Product as ProductType } from "../types/product";
import Rating from "../components/starRatings";
import { addToCart } from "../features/cart/cartSlice";


const ProductPage = () => {
    // get the product id from url
    const product = useLoaderData() as ProductType; // Loader provides the single product object



    console.log('details page', product)
    // if product is not found
    if (!product) {
        return (
            <section className="h-screen flex justify-center items-center">
                Loading...
            </section>
        );
    }

    // destructure product
    const { title, price, description, image, rating } = product;
    return (
        <section className="pt-[450px] md:pt-32 pb-[400px] md:pb-12 lg:py-32 h-screen flex items-center">
            <div className="container mx-auto ">
                {/* image and text wrapper */}
                <div className="flex flex-col lg:flex-row items-center">
                    {/* image */}
                    <div className="flex flex-1 justify-center items-center mb-8 lg:mb-0">
                        <img className="max-w-[200px] lg:max-w-xs" src={image} alt="" />
                    </div>
                    {/* text */}
                    <div className="flex-1 text-center lg:text-left gap-3">
                        <h1 className="text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0">{title}</h1>
                        <Rating rating={rating?.rate as number} totalCount={rating?.count as number} />

                        <p className="mb-8 mt-4 text-left">{description}</p>

                        <div className="text-2xl text-red-500 font-medium mb-6">$ {price}</div>


                        <button
                            onClick={() => addToCart({ product, quantity: 1 })}

                            className='bg-black py-4 px-8 text-white'>Add to cart</button>


                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductPage;