import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as yup from 'yup';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import en from 'date-fns/locale/en-US';

function FormTable() {
  registerLocale('en-US', en); // Register 'en-US' locale with react-datepicker
  setDefaultLocale('en-US'); // Set 'en-US' as the default locale for react-datepicker

  // Define the initial state values
  const today = new Date();
  const [expenses, setExpenses] = useState([]);
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(today);
  const [quantity, setQuantity] = useState('');
  const [isQuantityTouched, setIsQuantityTouched] = useState(false);
  const [amount, setAmount] = useState('');
  const [total, setTotal] = useState('');
  const [notes, setNotes] = useState('');
  const [editingIndex, setEditingIndex] = useState(-1);
  const [totalAmount, setTotalAmount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Set the number of items per page

  const categoryOptions = [
    { label: "Select Category", value: ""},
    { label: "Groceries", value: "Groceries" },
    { label: "Medicine", value: "Medicine" },
    { label: "Bills", value: "Bills" },
    { label: "Utilities", value: "Utilities" },
    { label: "Rent", value: "Rent" },
    // Add more options as needed
  ];

  // Define the validation schema for form fields
  const schema = yup.object().shape({
    category: yup.string().required('Category is required').oneOf(categoryOptions.map(option => option.value), 'Invalid category'),
    date: yup.date().required('Date is required'),
    quantity: yup.number().required('Quantity is required').positive('Quantity must be a positive number'),
    amount: yup.number().required('Amount is required').positive('Amount must be a positive number'),
    total: yup.number().required('Total is required').positive('Total must be a positive number'),
    notes: yup.string(),
  });

  // Function to handle adding or updating an expense
  const handleAddExpense = (e) => {
    e.preventDefault();
    try {
      schema.validate({
        category,
        date,
        quantity,
        amount,
        total,
        notes,
      });

      if (editingIndex !== -1) {
        const editedExpense = {
          category,
          date,
          quantity,
          amount,
          total,
          notes,
        };
        const updatedExpenses = [...expenses];
        updatedExpenses[editingIndex] = editedExpense;
        setExpenses(updatedExpenses);
        setEditingIndex(-1);
      } else {
        const newExpense = {
          category,
          date,
          quantity,
          amount,
          total,
          notes,
        };
        setExpenses([...expenses, newExpense]);
      }

      resetForm();
    } catch (error) {
      console.log(error);
      // Handle validation errors
    }
  };

  // Function to handle editing an expense
  const handleEditExpense = (index) => {
    const expense = expenses[index];
    setCategory(expense.category);
    setDate(expense.date);
    setQuantity(expense.quantity);
    setAmount(expense.amount);
    setTotal(expense.total);
    setNotes(expense.notes);
    setEditingIndex(index);
  };

  // Function to handle deleting an expense
  const handleDeleteExpense = (index) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this expense?');
    if (shouldDelete) {
      const updatedExpenses = [...expenses];
      updatedExpenses.splice(index, 1);
      setExpenses(updatedExpenses);
    }
  };

  // Function to reset the form fields
  const resetForm = () => {
    setCategory('');
    setDate(null);
    setQuantity('');
    setAmount('');
    setTotal('');
    setNotes('');
    setEditingIndex(-1);
    setIsQuantityTouched(false);
  };

  useEffect(() => {
    const newTotalAmount = expenses.reduce(
      (sum, expense) => sum + parseFloat(expense.amount) * parseFloat(expense.quantity),
      0
    );
    setTotalAmount(newTotalAmount);
  }, [expenses]);

  // Sorting and Filtering
  const [sortConfig, setSortConfig] = useState({ field: '', direction: '' });
  const [filteredExpenses, setFilteredExpenses] = useState(expenses);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const searchExpenses = () => {
      const filtered = expenses.filter((expense) =>
        expense.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredExpenses(filtered);
    };

    searchExpenses();
  }, [expenses, searchTerm]);

  const handleSort = (field) => {
    let direction = 'ascending';
    if (sortConfig.field === field && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ field, direction });
  };

  useEffect(() => {
    if (sortConfig.field !== '') {
      const sortedExpenses = [...filteredExpenses].sort((a, b) => {
        if (a[sortConfig.field] < b[sortConfig.field]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.field] > b[sortConfig.field]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
      setFilteredExpenses(sortedExpenses);
    }
  }, [sortConfig, filteredExpenses]);

  // Function to handle page changes
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);

  // Calculate the index range of items to be displayed
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredExpenses.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Expense Tracker</h1>

      <form onSubmit={handleAddExpense} className="mb-4">
        {/* Category */}
        <div className="flex flex-wrap mb-2">
          <label className="w-full sm:w-1/4" htmlFor="category">
            Category:
          </label>
          <select
            id="category"
            className="w-full sm:w-3/4 p-2 border border-gray-300 rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            {categoryOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div className="flex flex-wrap mb-2">
          <label className="w-full sm:w-1/4" htmlFor="date">
            Date:
          </label>
          <div className="w-full sm:w-3/4 p-2">
            <DatePicker
              id="date"
              selected={date}
              onChange={(date) => setDate(date)}
              className="border border-gray-300 rounded p-2"
              placeholderText="Enter Date"
              required
              maxDate={today}
            />
          </div>
        </div>

        {/* Quantity */}
        <div className="flex flex-wrap mb-2">
          <label className="w-full sm:w-1/4" htmlFor="quantity">
            Quantity:
          </label>
          <input
            id="quantity"
            type="number"
            className="w-full sm:w-3/4 p-2 border border-gray-300 rounded"
            value={editingIndex !== -1 || isQuantityTouched ? quantity : ''}
            // value={editingIndex !== -1 ? expenses[editingIndex].quantity : quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
              setIsQuantityTouched(true);
              setTotal(e.target.value * amount);
            }}
            required
            placeholder="Enter quantity"
          />
        </div>

        {/* Amount */}
        <div className="flex flex-wrap mb-2">
          <label className="w-full sm:w-1/4" htmlFor="amount">
            Amount:
          </label>
          <input
            id="amount"
            type="number"
            className="w-full sm:w-3/4 p-2 border border-gray-300 rounded"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              setTotal(e.target.value * quantity);
            }}
            required
            placeholder="Enter amount"
          />
        </div>

        {/* Total */}
        <div className="flex flex-wrap mb-2">
          <label className="w-full sm:w-1/4" htmlFor="total">
            Total:
          </label>
          <input
            id="total"
            type="number"
            className="w-full sm:w-3/4 p-2 border border-gray-300 rounded"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            required
            placeholder="Enter total"
          />
        </div>

        {/* Notes */}
        <div className="flex flex-wrap mb-2">
          <label className="w-full sm:w-1/4" htmlFor="notes">
            Notes:
          </label>
          <textarea
            id="notes"
            className="w-full sm:w-3/4 p-2 border border-gray-300 rounded"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Enter notes"
          ></textarea>
        </div>

        {/* Form Actions */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          {editingIndex !== -1 ? 'Update Expense' : 'Add Expense'}
        </button>
        <button
          type="button"
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          onClick={resetForm}
        >
          Cancel
        </button>
      </form>

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

      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th
              className={`px-4 py-2 border text-center cursor-pointer ${
                sortConfig.field === 'category' ? 'bg-gray-200' : ''
              }`}
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
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Display current page and total number of pages */}
      <div className="flex justify-center mt-4">
        <p>Page {currentPage} of {totalPages}</p>
      </div>

      <div className="mt-4">
        {/* Total Quantity, Total Data and Total Amount */}
        <p><strong>Total Quantity :</strong> {expenses.reduce((sum, expense) => sum + parseInt(expense.quantity), 0)}</p> 
        <p><strong>Total Expenses :</strong> {expenses.length}</p> 
        <p><strong>Grand Total :</strong> {totalAmount.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default FormTable;