import React from "react";
import Balance from "../components/Balance";
import Form from "../components/Form";
import Transactions from "../components/Transactions/Transactions";
import ViewAll from "../components/ViewAll";

function Home() {
  return (
    <>
      <Balance />
      <Form />
      <Transactions />
      <ViewAll text={"View All Transactions"} goTO={"/transactions"}/>
    </>
  );
}

export default Home;
