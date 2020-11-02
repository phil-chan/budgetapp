let initialState = {
  allExpenses: [],
  currentExpense: {},
  editing: false,
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
      let updatedExpenseList = state.allExpenses.filter(
        (expense) => expense.id !== action.expenseId
      );
      return {
        ...state,
        allExpenses: updatedExpenseList,
      };
    default:
      return state;
  }
};

export default reducer;
