import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../actions/auth'

class Nav extends React.Component {
  state = {
    showBurger: false
  }

  toggleBurger = () => {
    this.setState({
      showBurger: !this.state.showBurger
    })
  }

  render() {
    const { auth, logout } = this.props
    const { showBurger } = this.state
    return <nav className="navbar">
      <div className="container">
        <div className="navbar-brand">
        <h1 className="navbar-item is-size-4">
          Welcome {auth.user.first_name} {auth.user.last_name}
        </h1>
          <span onClick={this.toggleBurger} className={`navbar-burger burger ${showBurger ? 'is-active' : ''}`} data-target="navbarMenuHeroA">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
        <div id="navbarMenuHeroA" className={`navbar-menu ${showBurger ? "is-active" : ''}`}>
          <div className="navbar-end">
            {auth.isAuthenticated
              ?
              <>
                <Link to="/budgetapp" className="navbar-item is-large">My Spendings</Link>
                <Link to="/add" className="navbar-item is-large">Add</Link>
                <Link to="/edit" className="navbar-item is-large">Edit</Link>
                <Link to='/' className="navbar-item is-large" onClick={() => logout()}>Logout</Link>
              </>
              : (
                <>
                  <Link onClick={this.toggleBurger} className="navbar-item is-large" to='/login'>Login</Link>
                  <Link onClick={this.toggleBurger} className="navbar-item" to='/register'>Register</Link>
                </>
              )
            }
          </div>
        </div>
      </div>
    </nav>
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logout: () => {
      const confirmSuccess = () => ownProps.history.push('/')
      dispatch(logoutUser(confirmSuccess))
    }
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
