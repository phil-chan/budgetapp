const express = require("express");
const usersDb = require("../db/users");
const expensesDb = require("../db/expenses");
const router = express.Router();

router.get("/user/:id", (req, res) => {
  usersDb.getUserById(req.params.id).then((user) => res.json(user));
});

router.get("/", (req, res) => {
    expensesDb.getExpenses(1).then((expenses) => res.json(expenses));
  });

// router.get("/:id", (req, res) => {
//   expensesDb.getExpenses(req.params.id).then((expenses) => res.json(expenses));
// });

router.post("/", (req, res) => {
  expensesDb.addExpense(req.body).then((expense) => res.json(expense));
});

router.patch("/expense/:id", (req, res) => {
  expensesDb
    .updateExpense(req.params.id, req.body)
    .then((expense) => res.json(expense));
});

router.delete("/expense/:id", (req, res) => {
  const id = Number(req.params.id);
  console.log(id);
  expensesDb.deleteExpense(id).then((expense) => res.json(expense));
});

module.exports = router;
