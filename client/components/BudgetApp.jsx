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
  state = {
    category: "",
  };

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

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
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
              <th className="is-vcentered">Date</th>
              <th className="is-vcentered">Expense Name</th>
              <th className="is-vcentered">Description</th>
              <th className="is-vcentered">
                <div className="field">
                  <div className="control">
                    <div className="select is-info">
                      <select
                        required
                        name="category"
                        onChange={this.handleChange}
                        className="has-text-weight-bold"
                      >
                        <option value="Category">Category</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Food">Food</option>
                        <option value="Charity">Charity</option>
                        <option value="Travel">Travel</option>
                        <option value="Work">Work</option>
                        <option value="Subscriptions">Subscriptions</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              </th>
              <th className="is-vcentered">Cost</th>
              <th className="has-text-centered is-vcentered">Edit</th>
              <th className="has-text-centered is-vcentered">Delete</th>
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
