import React from "react";
import { connect } from "react-redux";
import { apiGetExpenses, apiDelExpense } from "../apis/index";
import {
  getExpenses,
  getExpenseToEdit,
  toggleEdit,
  deleteExpense,
  updateTotalCost,
} from "../actions/expenses";

class BudgetApp extends React.Component {
  state = {};

  componentDidMount() {
    apiGetExpenses(this.props.auth.user.id).then((expenses) => {
      this.props.dispatch(getExpenses(expenses));
      this.props.dispatch(updateTotalCost())
    });

    this.props.expenses.editing === true &&
      // this.props.dispatch(toggleEdit(false));
      this.props.dispatch(getExpenseToEdit("", false));
  }

  editExpense = (expenseData) => {
    this.props.dispatch(getExpenseToEdit(expenseData));
    this.props.dispatch(toggleEdit(true));
    this.props.history.push("/add");
  };

  delExpense = (expenseId) => {
    apiDelExpense(expenseId).then(() => {
      this.props.dispatch(deleteExpense(expenseId));
      this.props.dispatch(updateTotalCost())
    });
  };

  render() {
    let total = this.state.totalExpenditure
    this.props.expenses.allExpenses.map(expense => {
      total = total + expense.cost
      return total
    })
    return (
      <>
        <table className="table is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>Date</th>
              <th>Expense Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>Cost</th>
              <th className="has-text-centered">Edit</th>
              <th className="has-text-centered">Delete</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th>Totals</th>
              <th></th>
              <th></th>
              <th></th>
              <th>${this.props.expenses.totalExpenditure}</th>
              <th></th>
              <th></th>
            </tr>
          </tfoot>

          {this.props.expenses.allExpenses.map((expense, idx) => {
            return (
              <tbody key={idx}>
                <tr>
                  <th>{new Date(expense.date).toDateString()}</th>
                  <td>{expense.expense_name}</td>
                  <td>{expense.expense_description}</td>
                  <td>{expense.category}</td>
                  <td>${expense.cost}</td>
                  <td className="has-text-centered">
                    <i
                      className="fas fa-edit"
                      onClick={() => {
                        this.editExpense(expense);
                      }}
                    ></i>
                  </td>
                  <td className="has-text-centered">
                    <i
                      className="fas fa-trash-alt"
                      onClick={() => {
                        this.delExpense(expense.id);
                      }}
                    ></i>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </>
    );
  }
}

const mapStateToProps = ({ auth, expenses }) => {
  return {
    auth,
    expenses,
  };
};

export default connect(mapStateToProps)(BudgetApp);
