import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addtype, resetFilter } from "../features/filter/filterSlice";

export default function Type() {
  const dispatch = useDispatch();
  const { type : typeFilter , search } = useSelector((state) => state.filter);

  const [type, setType] = useState(typeFilter);

  const handleTypeFilter = (e) => {
    setType(e.target.value);
    dispatch(addtype(e.target.value));
  }

  const resetHandler = () => {
    setType("");
    dispatch(resetFilter());
  }

  return (
    <div className="form">
      <label className="font-bold">Filter Transaction By : </label>
      <div className="form-group font-bold">
        <div className="radio_group">
          <input
            id="incomeType"
            required
            type="radio"
            value="income"
            name="type"
            checked={type === "income"}
            // onChange={(e) => setType("income")}
            onChange={handleTypeFilter}
          />
          <label htmlFor="incomeType">Income</label>
        </div>
        <div className="radio_group">
          <input
            id="expenseType"
            type="radio"
            value="expense"
            name="type"
            placeholder="Expense"
            checked={type === "expense"}
            // onChange={(e) => setType("expense")}
            onChange={handleTypeFilter}
          />
          <label htmlFor="expenseType">Expense</label>
        </div>
      </div>
      {(typeFilter || search) && <div className="">
          {search && <span className="font-bold">Searched Text : {search}</span>}
            <button type="button" className="btn cancel_edit" onClick={resetHandler}>
              Rset Filter
            </button>
      </div>}
    </div>
  );
}
