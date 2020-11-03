let initialState = {
  allExpenses: [],
  currentExpense: {},
  editing: false,
  totalExpenditure: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "RECEIVE_EXPENSES":
      return { ...state, allExpenses: action.expenses };
    case "RECIEVE_EXPENSE_TO_EDIT":
      return {
        ...state,
        currentExpense: action.expenseData,
        editing: true,
      };
    case "TOGGLE_EDIT":
      return {
        ...state,
        editing: action.editingStatus,
      };
    case "DELETE_EXPENSE":
      return {
        ...state,
        allExpenses: state.allExpenses.filter(
          (expense) => expense.id !== action.expenseId
        )
      }
    case "UPDATE_TOTAL_COST":
      let expenseCosts = state.allExpenses.map(expense => expense.cost)
      let totalCost = expenseCosts.reduce((total, num) => { return total + num })
      return { ...state, totalExpenditure: totalCost };
    default:
      return state;
  }
};

export default reducer;
