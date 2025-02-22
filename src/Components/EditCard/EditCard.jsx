import { useState } from "react";
import style from "./EditCard.module.css";
import { DatePicker } from "../index"; // Ensure DatePicker component is imported

const EditCard = ({ transaction, onSave, onCancel }) => {
  const [editedTransaction, setEditedTransaction] = useState({
    ...transaction,
  });
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState({
    label: transaction.category && "Select Category",
    value: transaction.category,
  });
  const [isActive, setIsActive] = useState(false);

  const statuses = [
    { label: "Groceries", value: "Groceries" },
    {
      label: "Transportation",
      value: "Transportation",
    },
    { label: "Entertainment", value: "Entertainment" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTransaction((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedTransaction);
  };

  const toggleCalendar = () => {
    setCalendarVisible((prev) => !prev);
  };

  const handleSelectClick = () => {
    setIsActive((prev) => !prev);
  };

  const handleStatusClick = (status) => {
    setSelectedStatus(status);
    setEditedTransaction((prev) => ({
      ...prev,
      type: status.value,
    }));
    setIsActive(false);
  };

  return (
    <>
      <span className={`${style.overlay}`} onClick={onCancel}></span>
      <div className={`${style.card} ${style.show}`}>
        <h3 className={style.title}>Edit Transaction</h3>
        <form onSubmit={handleSubmit} className={style.form}>
          <div className={style.input}>
            <input
              type="text"
              name="name"
              placeholder="Transaction Name"
              value={editedTransaction.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className={style.input}>
            <input
              type="number"
              min={0}
              name="amount"
              placeholder="Amount"
              value={editedTransaction.amount}
              onChange={handleChange}
              required
            />
          </div>
          <DatePicker
            selectedDate={editedTransaction.date}
            onChange={(date) =>
              setEditedTransaction({ ...editedTransaction, date: date })
            }
            calendarVisible={calendarVisible}
            toggleCalendar={toggleCalendar}
          />
          <div className={style.group}>
            <div
              className={`${style.selected} ${isActive ? style.active : ""}`}
              onClick={handleSelectClick}
            >
              <span className={style.txt}>{selectedStatus.label}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="25"
                height="25"
                fill="rgba(13,110,253,1)"
              >
                <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path>
              </svg>
            </div>
            <ul
              className={`${style["select_list"]} ${
                isActive ? style.active : ""
              }`}
            >
              {statuses.map((status, index) => (
                <li
                  key={index}
                  className={status.value}
                  onClick={() => handleStatusClick(status)}
                >
                  {status.label}
                </li>
              ))}
            </ul>
          </div>
          <div className={style.radio_inputs}>
            <label>
              <input
                className={style.radio_input}
                type="radio"
                name="type"
                value="income"
                checked={editedTransaction.type === "income"}
                onChange={handleChange}
              />
              <span className={style.radio_tile}>
                <span className={style.radio_icon}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path fill="none" d="M0 0h24v24H0V0z"></path>
                    <path d="M16.85 17.15l1.44-1.44-4.88-4.88-3.29 3.29c-.39.39-1.02.39-1.41 0l-6-6.01c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L9.41 12l3.29-3.29c.39-.39 1.02-.39 1.41 0l5.59 5.58 1.44-1.44c.31-.31.85-.09.85.35v4.29c0 .28-.22.5-.5.5H17.2c-.44.01-.66-.53-.35-.84z"></path>
                  </svg>
                </span>
                <span className={style.radio_label}>Income</span>
              </span>
            </label>
            <label>
              <input
                className={style.radio_input}
                type="radio"
                name="type"
                value="expense"
                checked={editedTransaction.type === "expense"}
                onChange={handleChange}
              />
              <span className={style.radio_tile}>
                <span className={style.radio_icon}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path fill="none" d="M0 0h24v24H0V0z"></path>
                    <path d="M16.85 17.15l1.44-1.44-4.88-4.88-3.29 3.29c-.39.39-1.02.39-1.41 0l-6-6.01c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L9.41 12l3.29-3.29c.39-.39 1.02-.39 1.41 0l5.59 5.58 1.44-1.44c.31-.31.85-.09.85.35v4.29c0 .28-.22.5-.5.5H17.2c-.44.01-.66-.53-.35-.84z"></path>
                  </svg>
                </span>
                <span className={style.radio_label}>Expenses</span>
              </span>
            </label>
          </div>
          <div className={style.input}>
            <button type="submit">Save</button>
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditCard;
