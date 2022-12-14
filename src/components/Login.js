import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { createUser } from '../services/userAPI';

class Login extends Component {
  loginUser = async (username) => {
    await createUser({ name: username });
  };

  render() {
    const { disabledUserBtn, onInputChange, username } = this.props;

    return (
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
          onClick={ () => this.loginUser(username) }
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
  onInputChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};

export default Login;
