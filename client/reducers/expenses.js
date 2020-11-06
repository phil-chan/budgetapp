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
      //two filters.. maybe I don't need all expenese at all?
      return {
        ...state,
        allExpenses: state.allExpenses.filter(
          (expense) => expense.id !== action.expenseId
        ),
        filteredExpenses: state.filteredExpenses.filter(
          (expense) => expense.id !== action.expenseId
        ),
      };
    case "UPDATE_TOTAL_COST":
      let expenseCosts = state.filteredExpenses.map((expense) => expense.cost);
      let totalCost = expenseCosts.reduce((total, num) => {
        return total + num;
      }, []);
      return { ...state, totalExpenditure: totalCost };
    case "UPDATE_CURRENT_CATEGORY":
      let result = [];
      result = state.allExpenses.filter(
        (expense) => expense.category === action.category
      );

      if (action.category === "Category") result = state.allExpenses;

      return {
        ...state,
        filteredExpenses: result,
      };
    default:
      return state;
  }
};

export default reducer;
