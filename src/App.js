import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Search from './components/Search';
import Album from './components/Album';
import Favorites from './components/Favorites';
import Profile from './components/Profile';
import ProfileEdit from './components/ProfileEdit';
import NotFound from './components/NotFound';

class App extends React.Component {
  state = {
    disabledUserBtn: true,
    disabledSearchBtn: true,
    username: '',
    search: '',
  };

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value }, this.inputValidations);
  };

  inputValidations = () => {
    const validation = { usernameLength: 3, searchLength: 2 };

    const { username, search } = this.state;

    // verifica se nome do usuário possui tamanho mínimo:
    const minUserLength = username.length < validation.usernameLength;

    // verifica se a pesquisa possui tamanho mínimo:
    const minSearchLength = search.length < validation.searchLength;

    this.setState({
      disabledUserBtn: minUserLength,
      disabledSearchBtn: minSearchLength,
    });
  };

  render() {
    const { disabledSearchBtn, search, username, disabledUserBtn } = this.state;

    return (
      <BrowserRouter>
        <Switch>
          <Route path="/album/:id" render={ (props) => <Album { ...props } /> } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="/profile" component={ Profile } />
          <Route path="/favorites" component={ Favorites } />
          <Route
            path="/search"
            render={ (props) => (
              <Search
                { ...props }
                search={ search }
                disabledSearchBtn={ disabledSearchBtn }
                onInputChange={ this.onInputChange }
              />
            ) }
          />
          <Route
            exact
            path="/"
            render={ (props) => (
              <Login
                { ...props }
                username={ username }
                disabledUserBtn={ disabledUserBtn }
                onInputChange={ this.onInputChange }
              />
            ) }
          />
          <Route path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
