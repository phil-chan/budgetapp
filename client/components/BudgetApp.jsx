import React from "react";
import { connect } from "react-redux";
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import { apiGetExpenses } from '../apis/index'
import { getExpenses } from "../actions/expenses"

class BudgetApp extends React.Component {
  state = {};

  componentDidMount() {
    apiGetExpenses(this.props.auth.user.id)
      .then(expenses => {
        this.props.dispatch(getExpenses(expenses))
      })
  }

  render() {
    return (
      <>
        <h1>BudgetApp</h1>
        <table className="table">
          <thead>
            <th>Date</th>
            <th>Expense Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Cost</th>
          </thead>
          <tfoot>
            <tr>
              <th>Footer</th>
            </tr>
          </tfoot>

          {this.props.expenses.map((expense, idx) => {
            return (
              <tbody>
                <tr>
                  <th>{new Date(expense.date).toDateString()}</th>
                  <td>{expense.expense_name}</td>
                  <td>{expense.expense_description}</td>
                  <td>{expense.category}</td>
                  <td>{expense.cost}</td>
                </tr>
              </tbody>
            )
          })}

        </table>
      </>
    );
  }
}

const mapStateToProps = ({ auth, expenses }) => {
  return {
    auth,
    expenses
  };
};

export default connect(mapStateToProps)(BudgetApp);