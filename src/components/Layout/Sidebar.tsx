
import { Link } from "react-router";

import { IoMdArrowForward } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";

import { useSidebarContext } from "../../context/SidebarContext";
import CartItem from "../CartItem";
import type { CartItem as CartItemType } from "../../types/cart";
import { RootState } from "../../app/store";
import { cartReset } from "../../features/cart/cartSlice";
import useClickAway from "../../hooks/useclickaway";
import { useAppDispatch, useAppSelector } from "../../app/hooks";


const Sidebar = () => {
    const { isOpen, handleClose } = useSidebarContext()
    const dispatch = useAppDispatch();

    // Fetching cart data from the Redux store
    const { cartItems, totalItems } = useAppSelector(
        (state: RootState) => state.cart
    );


    console.log('cartitems', cartItems, totalItems)

    // Handler to clear the cart
    const clearCart = () => {
        dispatch(cartReset());
    };

    const sidebarRef = useClickAway(handleClose);


    return (
        <div
            ref={sidebarRef}
            className={`${isOpen ? "right-0 " : "-right-full invisible"
                } "w-full bg-white dark:bg-neutral-800 fixed top-0 h-full shadow-2xl md:w-[35vw] lg:w-[40vw] xl:max-w-[30vw] transition-all duration-300 z-20 px-4 lg:px-[35px]"`}
        >
            <div className="flex items-center justify-between py-6 border-b">
                <div className="uppercase text-sm font-semibold">Shopping Bag ({totalItems})</div>
                <div
                    onClick={handleClose}
                    className="cursor-poniter w-8 h-8 flex justify-center items-center"
                >
                    <IoMdArrowForward className="text-2xl" />
                </div>
            </div>
            <div className="flex flex-col gap-y-2 h-[360px] md:h-[480px] lg:h-[420px] overflow-y-auto overflow-x-hidden border-b">
                {cartItems.length > 0 ? (
                    cartItems.map((item: CartItemType) => <CartItem item={item.product} key={item.product.id} />)
                ) : (
                    <div className="text-center text-gray-500">Your cart is empty</div>
                )}
            </div>
            <div className="flex flex-col gap-y-3  mt-4">
                <div className="flex w-full justify-between items-center">
                    {/* total */}
                    <div className="font-semibold">
                        <span className="mr-2">Subtotal:</span> ${" "}
                        {cartItems
                            .reduce(
                                (total: number, item: CartItemType) =>
                                    total + item.product.price * item.quantity,
                                0
                            )
                            .toFixed(2)}
                    </div>
                    {/* clear cart icon */}
                    <button
                        onClick={clearCart}
                        className="cursor-pointer py-4 bg-red-500 text-white w-12 h-12 flex justify-center items-center text-xl"
                    >
                        <FiTrash2 />
                    </button>
                </div>
                <Link
                    to={"/"}
                    className="bg-gray-200 dark:bg-neutral-600 flex p-3 justify-center items-center text-primary w-full font-medium"
                >
                    View Cart
                </Link>
                <Link
                    to={"/"}
                    className="bg-primary flex p-3 justify-center items-center text-white w-full font-medium"
                >
                    Checkout
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;