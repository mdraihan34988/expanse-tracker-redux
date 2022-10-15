import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { fetchExpense } from '../features/expense/expenseSlice';

ChartJS.register(ArcElement, Tooltip, Legend);

function ReportView() {
    const dispatch = useDispatch();
    const { transactions } = useSelector((state) => state.expense);

    useEffect(() => {
        dispatch(fetchExpense());
    }, [dispatch]);

    const Income = transactions?.reduce((acc, transaction) => transaction.type === "income"? acc + transaction.amount : acc,0);
    const Expense = transactions?.reduce((acc, transaction) => transaction.type === "expense"? acc + transaction.amount : acc,0);
    const Savings = Income - Expense;

    const data = {
        labels:  ["Income","Expense","Savings"],
        datasets: [
          {
            label: transactions?.map((t) => {return t.name}),
            data: [Income,Expense,Savings],
            backgroundColor: ["blue","red","green"],
            borderColor: transactions?.map((t) => {return "black"}),
            borderWidth: 1,
          },
        ],
      };
console.log(transactions.map((t) => {return t.name}))
  return (
    <div className="col-span-12">
        <Pie
            data={data}
        />
    </div>
  )
}

export default ReportView