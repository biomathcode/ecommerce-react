
import { Link } from "react-router";

import { BsBag, BsMoon, BsSun } from "react-icons/bs";
import { useSidebarContext } from "../../context/SidebarContext";
import { PiHandbagFill } from "react-icons/pi";
import { useDarkMode } from "../../hooks/usedarkmode";
import { RootState } from "../../app/store";
import { useAppSelector } from "../../app/hooks";

const Header = () => {
    // header state
    const { isOpen, setIsOpen } = useSidebarContext();
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    const { cartItems } = useAppSelector((state: RootState) => state.cart);

    return (
        <header
            className="bg-white dark:bg-neutral-900 py-2 fixed w-full z-10 lg:px-8 transition-all"
        >
            <div className="container mx-auto flex items-center justify-between h-full px-10 md:p-0">
                <Link to={"/"}>
                    <div className="w-[40px] flex flex-col items-center">
                        <PiHandbagFill color="#EF4444" size={40} />

                        <div className=" font-bold dark:text-white">
                            Bagwati
                        </div>


                    </div>
                </Link>


                {/* cart */}
                <div className="flex gap-10 items-center">


                    <div
                        data-testid="cart-icon"
                        onClick={() => setIsOpen(!isOpen)}
                        className="cursor-pointer flex relative"
                    >
                        <BsBag className="text-2xl dark:text-white" />
                        <div className="bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
                            {cartItems.length}
                        </div>
                    </div>

                    <button
                        className="p-2 rounded-md  transition-all duration-300 flex items-center"
                        onClick={toggleDarkMode}
                        data-testid="dark-mode-toggle"
                    >
                        {isDarkMode ? (
                            <BsSun className="text-yellow-400 text-lg" />
                        ) : (
                            <BsMoon className="text-gray-700 text-lg" />
                        )}
                    </button>


                </div>
            </div>
        </header>
    );
};

export default Header;