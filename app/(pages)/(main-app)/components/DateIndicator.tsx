"use client"
import moment from "moment";

interface DateIndicatorProp {
    date: string;
}
const DateIndicator = ({ date }: DateIndicatorProp) => {
    const formatDate = (dateString: string): string => {
        const date = moment(dateString);
        const today = moment();
        const diff = today.diff(date, "days");

        if (diff > 1) {
            return date.format("MMMM Do YYYY");
        } else {
            switch (diff) {
                case 0:
                    return "Today";
                default:
                    return "Yesterday";
            }
        }
    }

    return (  
        <h4 className="sm:text-sm text-light-100 font-bold mb-[15px]">{formatDate(date)}</h4>
    );
}
 
export default DateIndicator;