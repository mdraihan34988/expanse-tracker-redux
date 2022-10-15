import Layout from "./components/Layout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import TransactionList from "./pages/TransactionList";
import Report from "./pages/Report";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/transactions" element={<TransactionList />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
