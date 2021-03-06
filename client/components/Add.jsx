import React from "react";
import { connect } from "react-redux";
import { apiAddExpense, apiEditExpense } from "../apis/index";
import { getExpenseToEdit, toggleEdit } from "../actions/expenses";

class Add extends React.Component {
  state = {
    date: new Date(),
    category: "",
    expense_name: "",
    expense_description: "",
    cost: 0,
    user_id: this.props.auth.user.id,
  };

  componentDidMount() {
    if (this.props.expenses.currentExpense === "") {
      this.props.dispatch(getExpenseToEdit("", false))
    } else {
      this.setState(this.props.expenses.currentExpense)
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if(this.props.expenses.editing){
      apiEditExpense(this.state)
    }else{
      apiAddExpense(this.state);
    }
    this.props.history.push("/budgetapp");
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <>
        <form className="form box" onSubmit={this.handleSubmit}>
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                required
                maxLength="50"
                className="input"
                placeholder="i.e. McDonald's Cheese Burger"
                value={this.state.expense_name}
                name="expense_name"
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Category</label>
            <div className="control">
              <div className="select is-info">
                <select required name="category" onChange={this.handleChange}>
                  <option></option>
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

          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <textarea
                required
                maxLength="75"
                className="input"
                placeholder="i.e. Lunch with friends"
                value={this.state.expense_description}
                name="expense_description"
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Cost</label>
            <div className="control columns column is-one-quarter">
              <input
                required
                className="input"
                value={Number(this.state.cost)}
                name="cost"
                type="number"
                pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"
                onChange={this.handleChange}
              />
            </div>
          </div>

          <button className="button is-info" onClick={() => this.handleSubmit}>
            Submit
          </button>
        </form>
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

export default connect(mapStateToProps)(Add);
