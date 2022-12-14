import PropTypes from 'prop-types';
import React, { Component } from 'react';
import AlbumList from './AlbumList';
import Header from './Header';
import Loading from './Loading';

class Search extends Component {
  render() {
    const {
      search,
      onInputChange,
      disabledSearchBtn,
      searchArtist,
      loading,
      hasSearched,
      searchList,
      currentSearch,
    } = this.props;
    return (
      <div data-testid="page-search">
        <Header />
        {loading ? (
          <Loading />
        ) : (
          <div>
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
              onClick={ searchArtist }
            >
              Pesquisar
            </button>
            {hasSearched && <AlbumList artist={ currentSearch } albuns={ searchList } />}
          </div>
        )}
      </div>
    );
  }
}

Search.propTypes = {
  disabledSearchBtn: PropTypes.bool.isRequired,
  currentSearch: PropTypes.string.isRequired,
  hasSearched: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  searchArtist: PropTypes.func.isRequired,
  searchList: PropTypes.arrayOf(
    PropTypes.shape({
      artistId: PropTypes.number,
      artistName: PropTypes.string,
      artworkUrl100: PropTypes.string,
      collectionId: PropTypes.number,
      collectionName: PropTypes.string,
      collectionPrice: PropTypes.number,
      releaseDate: PropTypes.string,
      trackCount: PropTypes.number,
    }),
  ).isRequired,
};

export default Search;
