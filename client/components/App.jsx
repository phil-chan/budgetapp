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
    const confirmSuccess = () => { };
    this.props.dispatch(checkAuth(confirmSuccess));
  }

  render() {
    const { auth } = this.props;
    return (
      <Router>
        <div className="container has-text-centered">
          <div className="hero is-small is-link">
            <div className="hero-body has-text-centered">
              <div className="">
                {!auth.isAuthenticated ? (
                  <Link to="/">
                    <h1 className="title is-2">Budget App</h1>
                  </Link>
                ) : (
                    <>
                      <Link to="/budgetapp">
                        <h1 className="title is-2 column">Budget App</h1>
                      </Link>
                      <h1>
                        Welcome {auth.user.first_name} {auth.user.last_name}
                      </h1>
                    </>
                  )}
                <Route path="/" component={Nav} />
              </div>
            </div>
          </div>

          <div className="">
            {!auth.isAuthenticated ? (
              <>
                <Route exact path="/" component={Login} />
              </>
            ) : (
                <>
                  <Route exact path="/" component={BudgetApp} />
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
