import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

import query from '../queries/CurrentUser';
import mutation from '../mutations/Logout';

class Header extends Component {
  onLogoutClick() {
    this.props.mutate({
      refetchQueries: [{ query }]
    });
  }

  renderButtons() {
    const { loading, user } = this.props.data;

    if(loading) { return <div />; }

    if(user) {
      return (
        // Using Anchor tag here because we don't want to navigate the user anywhere
        // but use the same styling as the Link below.
        <li>
          <a onClick={this.onLogoutClick.bind(this)}>
            Logout
          </a>
        </li>
      );
    } else {
      return (
        <div>
          <li>
            <Link to="/signup">
              Signup!
            </Link>
          </li>
          <li>
            <Link to="/login">
              Login
            </Link>
          </li>
        </div>
      );
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo left">
            Home
          </Link>
          <ul className="right">
            {this.renderButtons()}
          </ul>
        </div>
      </nav>
    );
  }
}

export default graphql(mutation)(
  graphql(query)(Header)
);
