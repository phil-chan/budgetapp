import React from "react";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { connect } from "react-redux";

import Login from "./Login";
import Register from "./Register";
import Nav from "./Nav";
import BudgetApp from "./BudgetApp";
import Edit from "./Edit";
import Add from "./Add";
import { checkAuth } from "../actions/auth";

export class App extends React.Component {
  componentDidMount() {
    const confirmSuccess = () => {};
    this.props.dispatch(checkAuth(confirmSuccess));
  }

  render() {
    const { auth } = this.props;
    return (
      <Router>
        <div className="container has-text-centered">
          <div className="hero is-small is-primary">
            <div className="hero-body has-text-centered">
              <Link to="/" className="">
                <h1 className="title is-1">Budget App</h1>
              </Link>
              <Route path="/" component={Nav} />
            </div>
          </div>

          <div className="">
            {!auth.isAuthenticated ? (
              <>
                <Route exact path="/" component={Login} />
              </>
            ) : (
              <>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/add" component={Add} />
                <Route exact path="/budgetapp" component={BudgetApp} />
                <Route exact path="/edit" component={Edit} />
              </>
            )}
          </div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth,
  };
};

export default connect(mapStateToProps)(App);
