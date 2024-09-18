import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css"; // Import default styles

function Calendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
const handleDayPickerSelect = (date: Date | undefined) => {
  if (!date) {
    setSelectedDate(undefined);
  } else {
    setSelectedDate(date);
  }
};



  return (
    <div className="w-full h-full ">
      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={handleDayPickerSelect}
        showOutsideDays
        captionLayout="dropdown"
        className={`custom-calendar w-full h-full font-medium bg-  rounded-lg shadow-[0px_0px_2px_1px_#00000024]`}
      />
    </div>
  );
}

export default Calendar;
