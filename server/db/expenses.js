const connection = require('./connection')

function getExpenses(user_id, db = connection) {
  return db('expenses')
    .where('user_id', user_id)
    .select()
}

function addExpense(expense, db = connection) {
  return db('expenses')
    .insert(expense)
}

function updateExpense(id, newExpenseData, db = connection) {
  return db('expenses')
    .where('id', id)
    .update(newExpenseData)
}

function deleteExpense(id, db = connection) {
  return db('expenses')
    .where('id', id)
    .del()
}

module.exports = {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense
}