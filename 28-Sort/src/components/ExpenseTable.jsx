import { useFilter } from "../hooks/useFilter";
import { useState } from "react";
import ContextMenu from "./ContextMenu";

const ExpenseTable = ({
  expenses,
  setExpenses,
  setExpense,
  setEditingRowId,
}) => {
  const [filteredData, setQuery] = useFilter(expenses, (data) => data.category);
  const [menuPosition, setMenuPosition] = useState({});
  const [rowId, setRowId] = useState("");
  const [sortCallback, setSortCallback] = useState(() => () => {});

  const totalAmount = filteredData.reduce(
    (sum, expense) => sum + parseInt(expense.amount),
    0
  );

  return (
    <>
      <ContextMenu
        menuPosition={menuPosition}
        setMenuPosition={setMenuPosition}
        setExpenses={setExpenses}
        setExpense={setExpense}
        expenses={expenses}
        rowId={rowId}
        setEditingRowId={setEditingRowId}
      />
      {/* <table className="expense-table" onClick={() => setMenuPosition({})}> */}
      <table
        className="expense-table"
        onClick={() => {
          if (menuPosition.left) {
            setMenuPosition({});
          }
        }}
      >
        <thead>
          <tr>
            <th className="amount-column">
              <div>
                <span>Title</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  viewBox="0 0 384 512"
                  className="arrow up-arrow"
                  // onClick={() => {
                  //   setExpenses((prevState) => [
                  //     ...prevState.sort((a, b) => a.amount - b.amount),
                  //   ]);
                  // }}
                  onClick={() => {
                    setSortCallback(
                      () => (a, b) => b.title.localeCompare(a.title)
                    );
                  }}
                >
                  <title>Ascending</title>
                  <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  viewBox="0 0 384 512"
                  className="arrow down-arrow"
                  // onClick={() => {
                  //   setExpenses((prevState) => [
                  //     ...prevState.sort((a, b) => b.amount - a.amount),
                  //   ]);
                  // }}
                  onClick={() => {
                    setSortCallback(
                      () => (a, b) => a.title.localeCompare(b.title)
                    );
                  }}
                >
                  <title>Descending</title>
                  <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                </svg>
              </div>
            </th>
            <th>
              <select onChange={(e) => setQuery(e.target.value)}>
                <option value="">All</option>
                <option value="grocery">Grocery</option>
                <option value="clothes">Clothes</option>
                <option value="bills">Bills</option>
                <option value="education">Education</option>
                <option value="medicine">Medicine</option>
              </select>
            </th>
            <th className="amount-column">
              <div>
                <span>Amount</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  viewBox="0 0 384 512"
                  className="arrow up-arrow"
                  // onClick={() => {
                  //   setExpenses((prevState) => [
                  //     ...prevState.sort((a, b) => a.amount - b.amount),
                  //   ]);
                  // }}
                  onClick={() => {
                    setSortCallback(() => (a, b) => b.amount - a.amount);
                  }}
                >
                  <title>Ascending</title>
                  <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  viewBox="0 0 384 512"
                  className="arrow down-arrow"
                  // onClick={() => {
                  //   setExpenses((prevState) => [
                  //     ...prevState.sort((a, b) => b.amount - a.amount),
                  //   ]);
                  // }}
                  onClick={() => {
                    setSortCallback(() => (a, b) => a.amount - b.amount);
                  }}
                >
                  <title>Descending</title>
                  <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                </svg>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {/* {filteredData.map(({ id, title, category, amount }) => ( */}
          {filteredData
            .sort(sortCallback)
            .map(({ id, title, category, amount }) => (
              <tr
                key={id}
                onContextMenu={(e) => {
                  e.preventDefault();
                  console.log(e.clientX, e.clientY);
                  setMenuPosition({
                    top: e.clientY + window.scrollY,
                    left: e.clientX + window.scrollX,
                  });
                  setRowId(id);
                }}
              >
                <td>{title}</td>
                <td>{category}</td>
                <td>{amount}</td>
              </tr>
            ))}
          <tr>
            <th>Total</th>
            <th
              className="clear-sort"
              onClick={() => {
                setSortCallback(() => () => {});
              }}
            >
              Clear Sort
            </th>
            <th>₹ {totalAmount}</th>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ExpenseTable;
