import React from "react";
import { connect } from "react-redux";
import {HashRouter as Router, Route, Link} from 'react-router-dom'

class BudgetApp extends React.Component {
  state = {};

  render() {
    return (
      <>
        <h1>BudgetApp View</h1>
        <Link to='/add'>Add</Link>
        <Link to='/edit'>Edit</Link>
      </>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth,
  };
};

export default connect(mapStateToProps)(BudgetApp);
