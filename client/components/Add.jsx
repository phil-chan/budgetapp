import React from "react";
import { connect } from "react-redux";
import { HashRouter as Router, Route, Link } from 'react-router-dom'

class Add extends React.Component {
  state = {
    category: '',
    expense_name: '',
    description: '',
    cost: '',
  };

  handleSubmit = (e) => {
    e.preventDefault()
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
          <input required className="input" placeholder="Expense name" value={this.state.expense_name} name="expense_name" onChange={this.handleChange} />
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
