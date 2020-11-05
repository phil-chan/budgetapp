let initialState = {
  allExpenses: [],
  currentExpense: {},
  currentCategory: "",
  filteredExpenses: [],
  editing: false,
  totalExpenditure: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "RECEIVE_EXPENSES":
      return {
        ...state,
        allExpenses: action.expenses,
        filteredExpenses: action.expenses,
      };
    case "RECIEVE_EXPENSE_TO_EDIT":
      return {
        ...state,
        currentExpense: action.expenseData,
        editing: action.status,
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
        ),
      };
    case "UPDATE_TOTAL_COST":
      console.log("updating total cost");
      let expenseCosts = state.filteredExpenses.map((expense) => expense.cost);
      let totalCost = expenseCosts.reduce((total, num) => {
        return total + num;
      });
      return { ...state, totalExpenditure: totalCost };
    case "UPDATE_CURRENT_CATEGORY":
      if (action.category === "Category")
        return {
          ...state,
          filteredExpenses: state.allExpenses,
        };

      return {
        ...state,
        filteredExpenses: state.allExpenses.filter(
          (expense) => expense.category === action.category
        ),
      };
    default:
      return state;
  }
};

export default reducer;
