import React from "react";
import { connect } from "react-redux";
import { HashRouter as Router, Route, Link } from 'react-router-dom'

class Edit extends React.Component {
  state = {};

  render() {
    return (
      <>
        <h1>Edit</h1>
      </>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth,
  };
};

export default connect(mapStateToProps)(Edit);
