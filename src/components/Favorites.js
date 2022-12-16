import React, { Component } from 'react';
import Header from './Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import MusicCard from './MusicCard';

class Favorites extends Component {
  state = {
    favorites: [],
    loading: false,
  };

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      const result = await getFavoriteSongs();
      const uniqueFavorites = [
        ...new Map(
          result.map((song) => [song.trackId, song]),
        ).values(),
      ];
      this.setState({ favorites: uniqueFavorites, loading: false });
    });
  }

  removeFavorite = (track) => {
    this.setState({ loading: true }, async () => {
      await removeSong(track);
      const newList = await getFavoriteSongs();
      const uniqueList = [
        ...new Map(
          newList.map((song) => [song.trackId, song]),
        ).values(),
      ];
      this.setState({ favorites: uniqueList, loading: false });
    });
  };

  render() {
    const { favorites, loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {loading ? (
          <Loading />
        ) : (
          favorites.map((favorite) => (
            <div key={ favorite.trackId }>
              <img src={ favorite.artworkUrl60 } alt={ favorite.trackName } />
              <MusicCard track={ favorite } removeFavorite={ this.removeFavorite } />
            </div>
          ))
        )}
      </div>
    );
  }
}

export default Favorites;
