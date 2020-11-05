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
      this.props.dispatch(updateTotalCost());
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
      this.props.dispatch(updateTotalCost());
    });
  };

  render() {
    let total = this.state.totalExpenditure;
    this.props.expenses.allExpenses.map((expense) => {
      total = total + expense.cost;
      return total;
    });
    return (
      <div className="table-container">
        <table className="table is-narrow is-hoverable is-fullwidth">
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
              <th>
                ${Number(this.props.expenses.totalExpenditure).toFixed(2)}
              </th>
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
                  <td>${Number(expense.cost).toFixed(2)}</td>

                  <td
                    className="has-text-centered is-vcentered"
                    id="edit-icon"
                    onClick={() => {
                      this.editExpense(expense);
                    }}
                  >
                    <i className="fas fa-edit"></i>
                  </td>

                  <td
                    className="has-text-centered is-vcentered" 
                    id="trash-icon"
                    onClick={() => {
                      this.delExpense(expense.id);
                    }}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </td>

                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
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
