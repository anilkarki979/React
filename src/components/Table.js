/*
Table Component

Author : Anil Karki
Date : 6/25/2023

*/

import React from 'react';

const Table = ({
  searchTerm,
  setSearchTerm,
  sortConfig,
  handleSort,
  setSortConfig,
  currentItems,
  handleEditExpense,
  handleDeleteExpense,
  currentPage,
  totalPages,
  handlePageChange,
}) => {
  return (
    <div className="mt-4 rounded-lg p-4 shadow-lg rounded-md p-4 bg-white">
      {/* Expense Table */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <label htmlFor="search" className="mr-2">
            Search:
          </label>
          <input
            id="search"
            type="text"
            className="p-2 border border-gray-300 rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by category"
          />
        </div>
        <div>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setSortConfig({ field: '', direction: '' })}
          >
            Clear Sort
          </button>
        </div>
      </div>

      <table className="w-full border-gray-300">
        <thead>
          <tr>
            <th
              className={`px-4 py-2 border text-center cursor-pointer ${
                sortConfig.field === 'category' ? 'bg-gray-200' : ''
              }font-bold`}
              onClick={() => handleSort('category')}
            >
              Category
            </th>
            <th
              className={`px-4 py-2 border text-center cursor-pointer ${
                sortConfig.field === 'date' ? 'bg-gray-200' : ''
              }`}
              onClick={() => handleSort('date')}
            >
              Date
            </th>
            <th
              className={`px-4 py-2 border text-center cursor-pointer ${
                sortConfig.field === 'quantity' ? 'bg-gray-200' : ''
              }`}
              onClick={() => handleSort('quantity')}
            >
              Quantity
            </th>
            <th
              className={`px-4 py-2 border text-center cursor-pointer ${
                sortConfig.field === 'amount' ? 'bg-gray-200' : ''
              }`}
              onClick={() => handleSort('amount')}
            >
              Amount
            </th>
            <th
              className={`px-4 py-2 border text-center cursor-pointer ${
                sortConfig.field === 'total' ? 'bg-gray-200' : ''
              }`}
              onClick={() => handleSort('total')}
            >
              Total
            </th>
            <th
              className={`px-4 py-2 border text-center cursor-pointer ${
                sortConfig.field === 'notes' ? 'bg-gray-200' : ''
              }`}
              onClick={() => handleSort('notes')}
            >
              Notes
            </th>
            <th className="px-4 py-2 border text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((expense, index) => (
            <tr key={index}>
              <td className="px-4 py-2 border text-center">{expense.category}</td>
              <td className="px-4 py-2 border text-center">{expense.date.toDateString()}</td>
              <td className="px-4 py-2 border text-center">{expense.quantity}</td>
              <td className="px-4 py-2 border text-center">{expense.amount}</td>
              <td className="px-4 py-2 border text-center">{expense.total}</td>
              <td className="px-4 py-2 border text-center">{expense.notes}</td>
              <td className="px-4 py-2 border text-center">
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2"
                  onClick={() => handleEditExpense(index)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  onClick={() => handleDeleteExpense(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          className="bg-yellow-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="bg-purple-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Display current page and total number of pages */}
      <div className="flex justify-center mt-4">
        <p>
          Page {currentPage} of {totalPages}
        </p>
      </div>
    </div>
  );
};

export default Table;