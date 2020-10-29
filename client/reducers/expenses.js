const reducer = (state = [], action) => {
  switch (action.type) {
    case "RECEIVE_EXPENSES":
      return action.expenses;
    default:
      return state
  }
}

export default reducer