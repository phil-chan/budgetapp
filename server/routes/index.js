const express = require("express");
const usersDb = require("../db/users");
const expensesDb = require("../db/expenses");
const router = express.Router();

router.get("/user/:id", (req, res) => {
  usersDb.getUserById(req.params.id).then((user) => res.json(user));
});

//need another user to test id
router.get("/:userId", (req, res) => {
  expensesDb.getExpenses(req.params.userId).then((expenses) => res.json(expenses));
  // expensesDb.getExpenses(req.body).then((expenses) => res.json(expenses));
});

router.post("/", (req, res) => {
  expensesDb.addExpense(req.body).then((expense) => res.json(expense));
});

router.patch("/update/:id", (req, res) => {
  expensesDb
    .updateExpense(req.params.id, req.body) //is it req.body that takes expnesedata?
    .then((expense) => res.json(expense));
});

router.delete("/delete/:id", (req, res) => {
  expensesDb.deleteExpense(Number(req.params.id)).then((expense) => res.json(expense));
});

module.exports = router;
