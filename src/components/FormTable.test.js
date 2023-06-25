/*
For test

Author : Anil Karki
Date : 6/25/2023

*/

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FormTable from './FormTable';

// test case to check for adding the expense
test('adds an expense to data', () => {
  render(<FormTable />);

  // Fill in the form inputs
  const categorySelect = screen.getByLabelText('Category:');
  const dateInput = screen.getByLabelText('Date:');
  const quantityInput = screen.getByLabelText('Quantity:');
  const amountInput = screen.getByLabelText('Amount:');
  const totalInput = screen.getByLabelText('Total:');
  const notesInput = screen.getByLabelText('Notes:');

  fireEvent.change(categorySelect, { target: { value: 'Groceries' } });
  fireEvent.change(dateInput, { target: { value: '2023-06-24' } });
  fireEvent.change(quantityInput, { target: { value: '5' } });
  fireEvent.change(amountInput, { target: { value: '10' } });
  fireEvent.change(totalInput, { target: { value: '50' } });
  fireEvent.change(notesInput, { target: { value: 'Test expense' } });

  // Submit the form
  const addButton = screen.getByText('Add Expense');
  fireEvent.click(addButton);

  // Check if the expense is added to the table
  const expenseCategories = screen.getAllByText('Groceries');
  expect(expenseCategories.length).toBeGreaterThan(0);

  const expenseDate = screen.getByRole('textbox', { name: /date/i });
  expect(expenseDate).toBeInTheDocument();

  const expenseQuantity = screen.getAllByText('5');
  expect(expenseQuantity.length).toBe(2);

  const expenseAmount = screen.getByText('10');
  expect(expenseAmount).toBeInTheDocument();

  const expenseTotal = screen.getAllByText(/50/)[0];
  expect(expenseTotal).toBeInTheDocument();

  const expenseNotes = screen.getByText('Test expense');
  expect(expenseNotes).toBeInTheDocument();
});

// test case for updating the expense
test('updates expense on edit', () => {
    render(<FormTable />);

    // Fill in the form inputs
  const categorySelect = screen.getByLabelText('Category:');
  const dateInput = screen.getByLabelText('Date:');
  const quantityInput = screen.getByLabelText('Quantity:');
  const amountInput = screen.getByLabelText('Amount:');
  const totalInput = screen.getByLabelText('Total:');
  const notesInput = screen.getByLabelText('Notes:');

  fireEvent.change(categorySelect, { target: { value: 'Groceries' } });
  fireEvent.change(dateInput, { target: { value: '2023-06-24' } });
  fireEvent.change(quantityInput, { target: { value: '2' } });
  fireEvent.change(amountInput, { target: { value: '10' } });
  fireEvent.change(totalInput, { target: { value: '20' } });
  fireEvent.change(notesInput, { target: { value: 'Test expense' } });

  // Submit the form
  const addButton = screen.getByText('Add Expense');
  fireEvent.click(addButton);
  
    // Edit the expense
    fireEvent.click(screen.getByText('Edit'));
  
    fireEvent.change(screen.getByLabelText('Category:'), { target: { value: 'Medicine' } });
    fireEvent.change(screen.getByLabelText('Quantity:'), { target: { value: '3' } });
    fireEvent.change(screen.getByLabelText('Amount:'), { target: { value: '15' } });
    fireEvent.click(screen.getByText('Update Expense'));
  
    // Verify the updated expense details
    const updatedElements = screen.getAllByText('Medicine');
    expect(updatedElements.length).toBe(2);
    expect(screen.getAllByText('3').length).toBe(2);
    expect(screen.getByText('15')).toBeInTheDocument();
});

// test case for deleting the expense
test('deletes expense', () => {
    render(<FormTable />);
  
    // Fill in the form inputs
  const categorySelect = screen.getByLabelText('Category:');
  const dateInput = screen.getByLabelText('Date:');
  const quantityInput = screen.getByLabelText('Quantity:');
  const amountInput = screen.getByLabelText('Amount:');
  const totalInput = screen.getByLabelText('Total:');
  const notesInput = screen.getByLabelText('Notes:');

  fireEvent.change(categorySelect, { target: { value: 'Groceries' } });
  fireEvent.change(dateInput, { target: { value: '2023-06-24' } });
  fireEvent.change(quantityInput, { target: { value: '2' } });
  fireEvent.change(amountInput, { target: { value: '10' } });
  fireEvent.change(totalInput, { target: { value: '20' } });
  fireEvent.change(notesInput, { target: { value: 'Test expense' } });

  // Submit the form
  const addButton = screen.getByText('Add Expense');
  fireEvent.click(addButton);

  // Mock window.confirm to always return true
  window.confirm = jest.fn(() => true);
  
  // Delete the expense
  fireEvent.click(screen.getByText('Delete'));

   // Verify that the expense is no longer in the table
    const expenseRow = screen.queryByText('Groceries 2 10');
    expect(expenseRow).toBeNull();

    // Restore the original window.confirm method
  window.confirm.mockRestore();
});
