import React from "react";
import { connect } from "react-redux";
import { HashRouter as Router, Route, Link } from 'react-router-dom'

import { apiAddExpense } from '../apis/index'

class Add extends React.Component {
  state = {
    date: Date.now(),
    category: '',
    expense_name: '',
    expense_description: '',
    cost: '',
    user_id: this.props.auth.user.id
  };

  handleSubmit = (e) => {
    e.preventDefault()
    apiAddExpense(this.state)
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <>
        <h1>Add</h1>
        <form onSubmit={this.handleSubmit}>
          <input required className="input" placeholder="Expense Name" value={this.state.expense_name} name="expense_name" onChange={this.handleChange} />
          <input required className="input" placeholder="Category" value={this.state.category} name="category" onChange={this.handleChange} />
          <input required className="input" placeholder="Description" value={this.state.expense_description} name="expense_description" onChange={this.handleChange} />
          <input required className="input" placeholder="Cost" value={this.state.cost} name="cost" onChange={this.handleChange} />
          <button onClick={() => this.handleSubmit}>Submit</button>
        </form>
      </>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth,
  };
};

export default connect(mapStateToProps)(Add);
