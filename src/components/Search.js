import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searched } from "../features/filter/filterSlice";

export default function Search() {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => state.filter);

  useEffect(() => {
      document.getElementById("search").value = search;
  },[search])

  const debounce = (fn,delay) => {
    let timer;
    return (...args) => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        fn(...args);
      },delay)
    }
  }

  const handleInputChange = debounce((value) => dispatch(searched(value)),500)

  return (
    <div className="top_card">
      <input
      id="search"
        className="outline-none searchBar border-none"
        type="search"
        name="search"
        placeholder="Search"
        onChange={(e) => handleInputChange(e.target.value)}
      />
    </div>
  );
}
