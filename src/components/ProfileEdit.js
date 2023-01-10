import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from './Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

class ProfileEdit extends Component {
  state = {
    loading: false,
    name: '',
    email: '',
    description: '',
    image: '',
    isSubmitDisabled: true,
  };

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = () => {
    this.setState(
      {
        loading: true,
      },
      async () => {
        const result = await getUser();
        this.setState({
          loading: false,
          name: result.name,
          email: result.email,
          description: result.description,
          image: result.image,
        });
      },
    );
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.validateSubmitBtn);
  };

  validateSubmitBtn = () => {
    const { name, email, description, image } = this.state;

    const isEmpty = name.length !== 0
      && email.length !== 0
      && description.length !== 0
      && image.length !== 0;

    this.setState({ isSubmitDisabled: !isEmpty });
  };

  onSubmitEdit = (event) => {
    event.preventDefault();
    const { history } = this.props;
    const { name, email, description, image } = this.state;
    const profileEdited = { name, email, image, description };
    this.setState({ loading: true }, async () => {
      await updateUser(profileEdited);
      history.push('/profile');
    });
  };

  render() {
    const { loading, name, email, description, image, isSubmitDisabled } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading ? (
          <Loading />
        ) : (
          <form>
            <label htmlFor="edit-name">
              Anterar nome:
              <input
                id="edit-name"
                name="name"
                onChange={ this.handleChange }
                value={ name }
                type="text"
                data-testid="edit-input-name"
              />
            </label>
            <label htmlFor="edit-email">
              Alterar E-mail:
              <input
                id="edit-email"
                name="email"
                onChange={ this.handleChange }
                value={ email }
                type="text"
                data-testid="edit-input-email"
              />
            </label>
            <label htmlFor="edit-description">
              Alterar descrição:
              <input
                id="edit-description"
                name="description"
                onChange={ this.handleChange }
                value={ description }
                type="text"
                data-testid="edit-input-description"
              />
            </label>
            <label htmlFor="edit-image">
              Alterar imagem:
              <input
                id="edit-image"
                name="image"
                onChange={ this.handleChange }
                value={ image }
                type="text"
                data-testid="edit-input-image"
              />
            </label>
            <button
              disabled={ isSubmitDisabled }
              data-testid="edit-button-save"
              type="submit"
              onClick={ this.onSubmitEdit }
            >
              Editar perfil
            </button>
          </form>
        )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ProfileEdit;
