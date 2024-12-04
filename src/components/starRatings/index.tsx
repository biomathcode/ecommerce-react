import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Rating = ({ rating, totalCount }: { rating: number, totalCount: number }) => {
    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= Math.floor(rating)) {
                stars.push(<FaStar key={i} className="text-yellow-500" />);
            } else if (i - rating < 1) {
                stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
            } else {
                stars.push(<FaRegStar key={i} className="text-gray-400" />);
            }
        }
        return stars;
    };

    return (
        <div className="flex items-center gap-2">
            <div className="flex">{renderStars()}</div>
            <span className="text-sm font-medium text-gray-700 dark:text-neutral-300">
                {rating.toFixed(1)} ({totalCount}) reviews
            </span>
        </div>
    );
};

export default Rating;
