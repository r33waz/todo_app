function TimeConverter(time: string)   {
  if (!time) return "00:00"; // Default to midnight if no time is provided

  const [timePart, modifier] = time.split(" ");
  const [hourStr, minuteStr] = timePart.split(":");

  let hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);

  // Convert 12-hour format to 24-hour format based on AM/PM
  if (modifier === "PM" && hour < 12) {
    hour += 12; // Convert PM to 24-hour format
  }
  if (modifier === "AM" && hour === 12) {
    hour = 0; // Handle midnight (12 AM)
  }

  const formattedHour = hour.toString().padStart(2, "0");
  const formattedMinute = minute.toString().padStart(2, "0");

  return `${formattedHour}:${formattedMinute}`; // Return in 24-hour format
}




function TimeConverter24to12(time: string) {
  if (!time) return ""; // Handle undefined or empty time

  const [hourStr, minuteStr] = time.split(":");
  const hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);

  const isPM = hour >= 12;
  const adjustedHour = hour % 12 || 12; // Convert '00' to '12' for midnight

  // Ensure minute is two digits
  const formattedMinute = minute.toString().padStart(2, "0");

  return `${adjustedHour}:${formattedMinute} ${isPM ? "PM" : "AM"}`; // Return in 12-hour format with AM/PM
}

export {TimeConverter,TimeConverter24to12}