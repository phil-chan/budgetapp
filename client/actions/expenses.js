export function getExpenses(expenses) {
  return {
    type: "RECEIVE_EXPENSES",
    expenses
  }
}