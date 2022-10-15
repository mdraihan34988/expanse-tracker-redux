import React from "react";
import Transactions from "../components/Transactions/Transactions";
import Form from "../components/Form";
import Search from "../components/Search";
import Pagination from "../components/Pagination";
import Type from "../components/Type";
import ViewAll from "../components/ViewAll";

function TransactionList() {
  return (
    <>
      <Search />
      <Type />
      <Form status="hide"/>
      <Transactions />
      <Pagination/>
      <ViewAll text={"Back To Homepage"} goTO={"/"}/>
    </>
  );
}

export default TransactionList;
