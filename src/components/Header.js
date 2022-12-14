import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    getUser();
    this.setState({
      loading: false,
    });
  }

  render() {
    const { loading } = this.state;
    return (
      <header data-testid="header-component">

        <Link to="/search" data-testid="link-to-search">
          Search
        </Link>
        <Link to="/favorites" data-testid="link-to-favorites">
          Favorites
        </Link>
        <Link to="/profile" data-testid="link-to-profile">
          Profile
        </Link>
      </header>
    );
  }
}

export default Header;
