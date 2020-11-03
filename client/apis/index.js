import request from 'superagent'

// //get user by id MAY NOT NEED THIS SINCE USERINFO IS IN GLOBAL STATE
// export function apiGetUserById(userId) {
//   return request.get("api/v1/user/" + userId)
//     .then((res) => {
//       return res.body
//     })
// }

//get all expenses
export function apiGetExpenses(userId) {
  return request.get("api/v1/" + userId)
    .then((res) => {
      return res.body
    })
}

//add an expense
export function apiAddExpense(expense) {
  return request.post("api/v1/")
    .send(expense)
    .then(res => {
      return res.body
    })
}

//delete an expense
export function apiDelExpense(expenseId) {
  return request.delete("api/v1/delete/" + expenseId)
    .then(res => {
      return res.body
    })
}

//get update an expense
//update an expense
export function apiEditExpense(expense) {
  return request.patch("api/v1/update/" + expense.id)
  .send(expense)
  .then(res => res.body)
}
