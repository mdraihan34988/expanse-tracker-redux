import { Link } from "react-router-dom";
import { useMatch } from "react-router-dom";

export default function Layout({ children }) {

  return (
    <div className="App">
      <nav className="bg-slate-100 shadow-md">
        <div className="max-w-7xl mx-auto px-5 lg:px-0 flex justify-between py-3">
          <Link to="/">
            Expense Tracker
          </Link>
          <div className=" flex items-center h-10 px-5 rounded-lg text-lg gap-3">
            <Link to="/" className={`font-bold ${useMatch('/') ? "text-red-600 hover:text-blue-500" : "text-blue-600 hover:text-red-500"}`}>
                Home
            </Link>
            <Link to="/transactions" className={`font-bold ${useMatch('/transactions') ? "text-red-600 hover:text-blue-500" : "text-blue-600 hover:text-red-500"}`}>
                Transactions
            </Link>
            <Link to="/report" className={`font-bold ${useMatch('/report') ? "text-red-600 hover:text-blue-500" : "text-blue-600 hover:text-red-500"}`}>
                Report
            </Link>
          </div>
        </div>
      </nav>

      <div className="main">
        <div className="container">{children}</div>
      </div>

      <div className="footer">&copy;2022 Learn with Sumit</div>
    </div>
  );
}
