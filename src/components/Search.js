import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from './Header';

class Search extends Component {
  render() {
    const { search, onInputChange, disabledSearchBtn } = this.props;
    return (
      <div data-testid="page-search">
        <Header />
        <input
          type="text"
          data-testid="search-artist-input"
          name="search"
          value={ search }
          onChange={ onInputChange }
        />
        <button
          disabled={ disabledSearchBtn }
          type="submit"
          data-testid="search-artist-button"
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

Search.propTypes = {
  search: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  disabledSearchBtn: PropTypes.bool.isRequired,
};

export default Search;
