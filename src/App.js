import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Search from './components/Search';
import Album from './components/Album';
import Favorites from './components/Favorites';
import Profile from './components/Profile';
import ProfileEdit from './components/ProfileEdit';
import NotFound from './components/NotFound';
import searchAlbumsAPI from './services/searchAlbumsAPI';

class App extends React.Component {
  state = {
    disabledUserBtn: true,
    disabledSearchBtn: true,
    username: '',
    search: '',
    currentSearch: '',
    loading: false,
    searchList: [],
    hasSearched: false,
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

  searchArtist = async () => {
    const { search } = this.state;
    this.setState({ loading: true }, async () => {
      const result = await searchAlbumsAPI(search);
      this.setState({
        currentSearch: search,
        search: '',
        loading: false,
        hasSearched: true,
        searchList: result,
      });
    });
  };

  render() {
    const {
      disabledSearchBtn,
      search,
      username,
      disabledUserBtn,
      loading,
      hasSearched,
      searchList,
      currentSearch,
    } = this.state;

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
                loading={ loading }
                disabledSearchBtn={ disabledSearchBtn }
                onInputChange={ this.onInputChange }
                searchArtist={ this.searchArtist }
                hasSearched={ hasSearched }
                searchList={ searchList }
                currentSearch={ currentSearch }
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
