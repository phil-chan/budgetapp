export function getExpenses(expenses) {
  return {
    type: "RECEIVE_EXPENSES",
    expenses,
  };
}

export function getExpenseToEdit(expenseData) {
  return {
    type: "RECIEVE_EXPENSE_TO_EDIT",
    expenseData,
  };
}

export function toggleEdit(editingStatus){
    return{
        type: "TOGGLE_EDIT",
        editingStatus
    }
}