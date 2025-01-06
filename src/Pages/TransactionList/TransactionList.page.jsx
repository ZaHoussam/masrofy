import style from "./TransactionList.module.css";
import { useState } from "react";
import remove from "../../assets/delete.svg";
import edit from "../../assets/edit.svg";
import { NotFoundData, EditCard } from "../../Components/index";

const TransactionList = ({
  transactions,
  deleteTransaction,
  editTransaction,
}) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditingTransaction(transactions[index]);
  };

  const saveEdit = (updatedTransaction) => {
    editTransaction(editingIndex, updatedTransaction);
    setEditingIndex(null);
    setEditingTransaction(null);
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditingTransaction(null);
  };

  return (
    <section className={style.transaction}>
      <div className="container">
        {transactions.length !== 0 ? (
          <>
            <h1 className={style.title}>transaction list</h1>
            <div className={style.table_container}>
              <div className={style.table}>
                <div className={style.table_header}>
                  <h3>name</h3>
                  <h3>category</h3>
                  <h3>price</h3>
                  <h3>type</h3>
                  <h3>date</h3>
                  <h3>action</h3>
                </div>
                <div className={style.table_body}>
                  {transactions.map((transaction, index) => (
                    <div className={style.row} key={index}>
                      <div className={`${style.col} ${style.col_1}`}>
                        {transaction.name}
                      </div>
                      <div className={`${style.col} ${style.col_2}`}>
                        {transaction.category}
                      </div>
                      <div
                        className={`${style.col} ${style.col_3}
                  }`}
                      >
                        {transaction.amount}
                      </div>
                      <div className={`${style.col} ${style.col_4}`}>
                        {transaction.type}
                      </div>
                      <div className={`${style.col} ${style.col_5}`}>
                        {transaction.date}
                      </div>
                      <div className={style.action}>
                        <button onClick={() => startEditing(index)}>
                          <img src={edit} alt="edit" />
                        </button>
                        <button onClick={() => deleteTransaction(index)}>
                          <img src={remove} alt="remove" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <NotFoundData />
        )}
        {editingTransaction && (
          <EditCard
            transaction={editingTransaction}
            onSave={saveEdit}
            onCancel={cancelEdit}
          />
        )}
      </div>
    </section>
  );
};

export default TransactionList;
