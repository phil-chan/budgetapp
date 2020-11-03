export function getExpenses(expenses) {
  return {
    type: "RECEIVE_EXPENSES",
    expenses,
  };
}

export function getExpenseToEdit(expenseData, status) {
  return {
    type: "RECIEVE_EXPENSE_TO_EDIT",
    expenseData,
    status
  };
}

export function toggleEdit(editingStatus){
    return{
        type: "TOGGLE_EDIT",
        editingStatus
    }
}

export function deleteExpense(expenseId){
    return{
        type: "DELETE_EXPENSE",
        expenseId
    }
}

export function updateTotalCost(){
  return{
    type: "UPDATE_TOTAL_COST"
  }
}