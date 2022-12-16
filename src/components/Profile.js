import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Profile extends Component {
  state = {
    loading: false,
    currentUser: '',
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
        this.setState({ loading: false, currentUser: result });
      },
    );
  };

  render() {
    const { loading, currentUser } = this.state;

    return (
      <div data-testid="page-profile">
        {console.log(currentUser)}
        <Header />
        {loading ? (
          <Loading />
        ) : (
          <>
            <img
              data-testid="profile-image"
              src={ currentUser.image }
              alt={ currentUser.name }
            />
            <label htmlFor="user-name">
              Nome:
              <h3 id="user-name">{currentUser.name}</h3>
            </label>
            <label htmlFor="user-email">
              E-mail:
              <h4 id="user-email">{currentUser.email}</h4>
            </label>
            <label htmlFor="user-description">
              Descrição:
              <p id="user-description">{currentUser.description}</p>
            </label>
            <Link to="/profile/edit">Editar perfil</Link>
          </>
        )}
      </div>
    );
  }
}

export default Profile;
