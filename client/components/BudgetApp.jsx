import React from "react";
import Reactable from "reactable-copy";
import { connect } from "react-redux";
import { apiGetExpenses, apiDelExpense } from "../apis/index";
import {
  getExpenses,
  getExpenseToEdit,
  toggleEdit,
  deleteExpense,
  updateTotalCost,
  updateCurrentCategory,
} from "../actions/expenses";

const Table = Reactable.Table,
  Tr = Reactable.Tr,
  Td = Reactable.Td,
  Th = Reactable.Th,
  Thead = Reactable.Thead,
  Tfoot = Reactable.Tfoot;

class BudgetApp extends React.Component {
  state = {};

  componentDidMount() {
    apiGetExpenses(this.props.auth.user.id).then((expenses) => {
      this.props.dispatch(getExpenses(expenses));
      this.props.dispatch(updateTotalCost());
    });

    this.props.expenses.editing === true &&
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
    this.props.dispatch(updateCurrentCategory(e.target.value));
    this.props.dispatch(updateTotalCost());
  };

  render() {
    return (
      <div className="table-container">
        <Table className="table" id="table" sortable={true}>
          <Thead id="thead-container">
            <Th column="date" className="is-vcentered">
              <strong className="date-header is-vcentered">Date</strong>
            </Th>
            <Th column="expense" className="is-vcentered">
              <strong className="expense-header">Expense</strong>
            </Th>
            <Th column="description" className="is-vcentered">
              <strong className="description-header">Description</strong>
            </Th>
            <Th column="category" className="is-vcentered">
              <strong className="category-header">
              <div
                className="select is-info"
                id="category-header"
                onClick={(e) => e.stopPropagation()}
              >
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
              </strong>
            </Th>
            <Th column="cost" className="is-vcentered">
              <strong className="cost-header">Cost</strong>
            </Th>
            <Th column="edit" className="is-vcentered" id="edit-header">
              <strong className="edit-header">Edit</strong>
            </Th>
            <Th column="delete" className="is-vcentered" id="delete-header">
              <strong className="delete-header">Delete</strong>
            </Th>
          </Thead>

          {this.props.expenses.filteredExpenses.map((expense, idx) => {
            return (
              <Tr key={idx}>
                <Th column="date" value={expense.date}>
                  {new Date(expense.date).toDateString()}
                </Th>
                <Td column="expense" value={expense.expense_name}>
                  {expense.expense_name}
                </Td>
                <Td column="description" value={expense.expense_description}>
                  {expense.expense_description}
                </Td>
                <Td column="category" value={expense.category}>
                  {expense.category}
                </Td>
                <Td column="cost" value={Number(expense.cost)}>
                  {`$${Number(expense.cost).toFixed(2)}`}
                </Td>
                <Td
                  column="edit"
                  className="has-text-centered is-vcentered"
                  id="edit-icon"
                  onClick={() => {
                    this.editExpense(expense);
                  }}
                >
                  <i className="fas fa-edit"></i>
                </Td>

                <Td
                  column="delete"
                  className="has-text-centered is-vcentered"
                  id="trash-icon"
                  onClick={() => {
                    this.delExpense(expense.id);
                  }}
                >
                  <i className="fas fa-trash-alt"></i>
                </Td>
              </Tr>
            );
          })}
          <Tfoot>
            <Td>
              <strong className="totalsLabel-footer">Totals</strong>
            </Td>
            <Td></Td>
            <Td></Td>
            <Td></Td>
            <Td>
              <strong className="totalCosts-footer">
                ${Number(this.props.expenses.totalExpenditure).toFixed(2)}
              </strong>
            </Td>
          </Tfoot>
        </Table>
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
