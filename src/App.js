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
    disabledBtn: true,
    username: '',
    loading: true,
  };

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value }, this.validateLoginButton);
  };

  validateLoginButton = () => {
    const validation = { inputlength: 3 };

    const { username } = this.state;
    const minLength = username.length < validation.inputlength;

    this.setState({
      disabledBtn: minLength,
    });
  };

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/album/:id" render={ (props) => <Album { ...props } /> } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="/profile" component={ Profile } />
          <Route path="/favorites" component={ Favorites } />
          <Route path="/search" component={ Search } />
          <Route
            exact
            path="/"
            render={ (props) => (
              <Login
                { ...props }
                { ...this.state }
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
