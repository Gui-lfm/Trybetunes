import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends Component {
  state = {
    loading: false,
  };

  handleLogin = (username) => {
    const { history } = this.props;

    this.setState({ loading: true }, async () => {
      await createUser({ name: username });
      this.setState({ loading: false });
      history.push('/search');
    });
  };

  render() {
    const { disabledUserBtn, onInputChange, username } = this.props;
    const { loading } = this.state;
    return loading ? (
      <Loading />
    ) : (
      <div data-testid="page-login">
        <input
          type="text"
          name="username"
          value={ username }
          data-testid="login-name-input"
          onChange={ onInputChange }
        />
        <button
          disabled={ disabledUserBtn }
          type="submit"
          onClick={ () => this.handleLogin(username) }
          data-testid="login-submit-button"
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  disabledUserBtn: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  onInputChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};

export default Login;
