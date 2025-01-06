import { useState, useEffect } from "react";
import style from "./DatePicker.module.css"; // Ensure you have appropriate styles for the calendar

const DatePicker = ({
  selectedDate,
  onChange,
  calendarVisible,
  toggleCalendar,
}) => {
  const today = new Date();
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState(today.getDate());

  useEffect(() => {
    const date = new Date();
    setSelectedYear(date.getFullYear());
    setSelectedMonth(date.getMonth());
    setSelectedDay(date.getDate());
  }, [selectedDate]);

  const toggleCalendarHandler = () => toggleCalendar(); // Toggle calendar visibility

  const dayNames = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getDaysInMonth = (year, month) =>
    new Date(year, month + 1, 0).getDate();

  const getAdjustFirstDay = (year, month) => {
    const firstDay = new Date(year, month, 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1; // Adjust the starting day for the calendar
  };

  const handleDateClick = (year, month, day) => {
    setSelectedYear(year);
    setSelectedMonth(month);
    setSelectedDay(day);
    const newSelectedDate = `${year}-${String(month + 1).padStart(
      2,
      "0"
    )}-${String(day).padStart(2, "0")}`;
    onChange(newSelectedDate); // Notify parent about the date change
    toggleCalendar(); // Close calendar after date selection
  };

  const generateCalendarDays = () => {
    const days = [];
    const daysInCurrentMonth = getDaysInMonth(selectedYear, selectedMonth);
    const firstDay = getAdjustFirstDay(selectedYear, selectedMonth);
    const daysInPrevMonth = getDaysInMonth(selectedYear, selectedMonth - 1);

    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push(
        <span
          key={`prev-${i}`}
          className={`${style.day} ${style.other_month}`}
          onClick={() =>
            handleDateClick(
              selectedMonth === 0 ? selectedYear - 1 : selectedYear,
              selectedMonth === 0 ? 11 : selectedMonth - 1,
              daysInPrevMonth - i
            )
          }
        >
          {String(daysInPrevMonth - i).padStart(2, "0")}
        </span>
      );
    }

    // Current month days
    for (let i = 1; i <= daysInCurrentMonth; i++) {
      const isSelected =
        i === selectedDay &&
        selectedYear === today.getFullYear() &&
        selectedMonth === today.getMonth();
      days.push(
        <span
          key={`current-${i}`}
          className={`${style.day} ${isSelected && style.selected}`}
          onClick={() => handleDateClick(selectedYear, selectedMonth, i)}
        >
          {String(i).padStart(2, "0")}
        </span>
      );
    }

    // Next month days
    const extraDays = (7 - ((firstDay + daysInCurrentMonth) % 7)) % 7;
    for (let i = 1; i <= extraDays; i++) {
      days.push(
        <span
          key={`next-${i}`}
          className={`${style.day} ${style.other_month}`}
          onClick={() =>
            handleDateClick(
              selectedMonth === 11 ? selectedYear + 1 : selectedYear,
              selectedMonth === 11 ? 0 : selectedMonth + 1,
              i
            )
          }
        >
          {String(i).padStart(2, "0")}
        </span>
      );
    }
    return days;
  };

  return (
    <div className={style.date_picker_container}>
      <input
        type="text"
        value={selectedDate}
        onClick={toggleCalendarHandler} // Toggle calendar on input click
        readOnly
        placeholder="Select Date"
        id={style.date_picker}
      />
      <div className={`${style.calendar} ${calendarVisible ? style.show : ""}`}>
        <div className={style.calendar_header}>
          <button
            className={style.prev}
            onClick={() => {
              const prevMonth = selectedMonth === 0 ? 11 : selectedMonth - 1;
              setSelectedMonth(prevMonth);
            }}
          >
            <svg
              viewBox="0 0 11 18"
              fill="#141414"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.78086 10.0239C6.53225 11.425 8.67672 13.5583 10.118 16.4411L7.88196 17.5591C6.65662 15.1083 4.80109 13.2417 3.21914 11.9761C2.4326 11.3469 1.72588 10.876 1.2199 10.5646C0.967264 10.4092 0.765708 10.2941 0.630553 10.2196C0.563006 10.1823 0.512143 10.1552 0.479887 10.1383L0.445736 10.1206L0.441012 10.1181L0.440417 10.1178C0.440445 10.1178 0.440473 10.1179 0.441012 10.1169L0.440984 7.88333C0.440446 7.88232 0.440417 7.88233 0.440389 7.88235L0.440984 7.88205L0.445709 7.87963L0.479861 7.8619C0.512117 7.84498 0.56298 7.81788 0.630528 7.78061C0.765684 7.70604 0.967241 7.59098 1.21988 7.43551C1.72586 7.12413 2.43258 6.65323 3.21912 6.02398C4.80108 4.7584 6.65661 2.89169 7.88196 0.440918L10.118 1.55893C8.67672 4.44165 6.53225 6.57502 4.78088 7.97614C4.28486 8.37296 3.81643 8.7142 3.39869 9.00006C3.81642 9.28591 4.28485 9.62713 4.78086 10.0239Z"
              />
            </svg>
          </button>
          <div className={style.year_month}>
            <div className={style.current_month}>
              <span className={style.txt}>{months[selectedMonth]}</span>
              <ul className={style.dropdown}></ul>
            </div>
            <div className={style.current_year}>
              <span className={style.txt}>{selectedYear}</span>
              <ul className={style.dropdown}></ul>
            </div>
          </div>
          <button
            className={style.next}
            onClick={() => {
              const nextMonth = selectedMonth === 11 ? 0 : selectedMonth + 1;
              setSelectedMonth(nextMonth);
            }}
          >
            <svg
              viewBox="0 0 11 18"
              fill="#141414"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.78086 10.0239C6.53225 11.425 8.67672 13.5583 10.118 16.4411L7.88196 17.5591C6.65662 15.1083 4.80109 13.2417 3.21914 11.9761C2.4326 11.3469 1.72588 10.876 1.2199 10.5646C0.967264 10.4092 0.765708 10.2941 0.630553 10.2196C0.563006 10.1823 0.512143 10.1552 0.479887 10.1383L0.445736 10.1206L0.441012 10.1181L0.440417 10.1178C0.440445 10.1178 0.440473 10.1179 0.441012 10.1169L0.440984 7.88333C0.440446 7.88232 0.440417 7.88233 0.440389 7.88235L0.440984 7.88205L0.445709 7.87963L0.479861 7.8619C0.512117 7.84498 0.56298 7.81788 0.630528 7.78061C0.765684 7.70604 0.967241 7.59098 1.21988 7.43551C1.72586 7.12413 2.43258 6.65323 3.21912 6.02398C4.80108 4.7584 6.65661 2.89169 7.88196 0.440918L10.118 1.55893C8.67672 4.44165 6.53225 6.57502 4.78088 7.97614C4.28486 8.37296 3.81643 8.7142 3.39869 9.00006C3.81642 9.28591 4.28485 9.62713 4.78086 10.0239Z"
              />
            </svg>
          </button>
        </div>
        <div className={style.days_header}>
          {dayNames.map((day, index) => (
            <span key={index} className={style.day_of_week}>
              {day}
            </span>
          ))}
        </div>
        <div className={style.days_container}>{generateCalendarDays()}</div>
      </div>
    </div>
  );
};

export default DatePicker;
