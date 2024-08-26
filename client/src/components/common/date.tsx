import { useEffect, useState } from "react";

function TodayDate() {
  const [time, setTime] = useState(getTimeInAmPm());
  const [date, setDate] = useState({
    dayString: "",
    fullDate: "",
  });

  // Function to get the time in AM/PM format
  function getTimeInAmPm() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const minutesStr = minutes < 10 ? `0${minutes}` : minutes; // Add leading zero if minutes < 10

    return `${hours}:${minutesStr} ${ampm}`;
  }

  // Update the time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeInAmPm());
    }, 60000); // Update time every minute

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  // Set the date when the component mounts
  useEffect(() => {
    const now = new Date();
    const days = now.getDay();
    const day = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    let dayString = "";

    // Get day of the week
    switch (days) {
      case 0:
        dayString = "Sunday";
        break;
      case 1:
        dayString = "Monday";
        break;
      case 2:
        dayString = "Tuesday";
        break;
      case 3:
        dayString = "Wednesday";
        break;
      case 4:
        dayString = "Thursday";
        break;
      case 5:
        dayString = "Friday";
        break;
      case 6:
        dayString = "Saturday";
        break;
      default:
        break;
    }

    const fullDate = `${year}/${month}/${day}`;
    setDate({ dayString, fullDate });
  }, []);

  return (
    <div className="text-sm flex flex-col w-full">
      <div className="flex flex-col">
        <p className="text-sm mt-1 flex w-full justify-between">
          Day: {date.dayString}
          <span className="">Time: {time}</span>
        </p>
        <p className="text-sm tracking-wider">Date: {date.fullDate}</p>
      </div>
    </div>
  );
}

export default TodayDate;
