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
    default:
      return state;
  }
};

export default reducer;
