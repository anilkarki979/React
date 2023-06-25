/*
Total Expense Component

Author : Anil Karki
Date : 6/25/2023

*/

import React from 'react';

const Total = ({ expenses, totalAmount }) => {
  return (
    <div className="mt-4 rounded-lg p-4 shadow-lg rounded-md p-4 bg-white">
      {/* Total Quantity, Total Data, and Total Amount */}
      <p className="mb-2"><strong>Total Quantity :</strong> {expenses.reduce((sum, expense) => sum + parseInt(expense.quantity), 0)}</p> 
      <p className="mb-2"><strong>Total Expenses :</strong> {expenses.length}</p> 
      <p className="mb-2"><strong>Grand Total :</strong> {totalAmount.toFixed(2)}</p>
    </div>
  );
}

export default Total;