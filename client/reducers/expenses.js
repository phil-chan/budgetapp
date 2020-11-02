let initialState = {
  allExpenses: [],
  currentExpense: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "RECEIVE_EXPENSES":
      return { ...state, allExpenses: action.expenses };
    case "RECIEVE_EXPENSE_TO_EDIT":
      return { ...state, currentExpense: action.expenseData };
    default:
      return state;
  }
};

export default reducer;
