# Expense Tracker
This is a React component that provides a form and table for tracking expenses. The component allows users to add, edit, and delete expenses, as well as search and sort the expense table.

### Pre-requisites

- Node.js
- npm

### Steps to run the application
You need to install the required dependencies, make sure you have Node.js and npm installed on your machine. Then, follow these steps:

**Step 1:** Install dependencies
### `npm install`

**Step 2:** Start the app
### `npm start`

**Step 3:** Go to the link
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

**Note:** The page will reload when you make changes.\

--------------------------------------------------------

### Build app for production
### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

--------------------------------------------------------

### Testing for the application

### `npm test`

Launches the test runner in the interactive watch mode.

### FormTable Test Cases
This repository contains test cases for the FormTable component. The test cases are implemented using the @testing-library/react library.

### Prerequisites
To run the test cases, make sure you have the following dependencies installed (This will be installed with the npm install):

React
@testing-library/react

The test runner will launch and execute the test cases defined in the FormTable.test.js file.

### Test Cases
The following test cases are implemented:

**Test Case 1:** adds an expense to data
This test case verifies if the expense is successfully added to the table when the "Add Expense" button is clicked. It fills in the form inputs with test values, triggers form submission, and checks if the expense details are displayed correctly in the table.

**Test Case 2:** updates expense on edit
This test case checks if the expense details are updated correctly when the "Edit" button is clicked. It fills in the form inputs with initial values, adds an expense, triggers the edit mode, modifies the expense details, and verifies if the updated details are reflected in the table.

**Test Case 3:** deletes expense
This test case ensures that the expense is deleted from the table when the "Delete" button is clicked. It adds an expense to the table, mocks the confirmation dialog to always return true, triggers the delete action, and verifies if the expense is no longer present in the table.

--------------------------------------------------------

### Usage
The FormTable component provides a form for adding or updating expenses and a table for displaying and managing expenses.

### Form
The form includes the following fields:

Category: Select a category for the expense from the available options.
Date: Choose a date for the expense using a date picker.
Quantity: Enter the quantity of the item.
Amount: Enter the amount for each item.
Total: The total amount is automatically calculated based on the quantity and amount.
Notes: Add any additional notes or comments.
You can add or update an expense by filling out the form fields and clicking the "Add Expense" or "Update Expense" button, respectively. Validation is performed on the form fields to ensure that required fields are filled and that the values entered are valid.

### Table
The expense table displays the list of expenses in a tabular format. The table includes the following columns:

Category: Displays the category of the expense.
Date: Displays the date of the expense.
Quantity: Displays the quantity of the item.
Amount: Displays the amount for each item.
Total: Displays the total amount for the expense.
Notes: Displays any additional notes or comments.
Actions: Provides options to edit or delete the expense.
The expense table supports sorting and searching. You can click on the column headers to sort the table by that column in ascending or descending order. Additionally, you can enter a search term in the search input field to filter the table based on the expense category.

### Pagination
The table supports pagination, displaying a specified number of items per page. The number of items per page can be configured by modifying the itemsPerPage constant. Pagination controls are provided at the bottom of the table to navigate between pages.

### Dependencies
This component relies on the following external dependencies (These dependencies will be installed with the npm install):

React: A JavaScript library for building user interfaces.
react-datepicker: A datepicker component for React.
yup: A JavaScript schema builder for value parsing and validation.
date-fns: A JavaScript date utility library.
Make sure to install these dependencies before using the FormTable component.

