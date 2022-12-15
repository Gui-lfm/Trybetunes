import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    loading: false,
    addFavorite: false,
    favorites: [],
  };

  componentDidMount() {
    this.fetchFavorites();
  }

  fetchFavorites = async () => {
    const favorites = await getFavoriteSongs();
    const { track } = this.props;
    const uniqueFavorites = [
      ...new Map(
        favorites.map((favorite) => [favorite.trackId, favorite]),
      ).values(),
    ];
    this.setState({ favorites: uniqueFavorites }, () => {
      if (this.verifyFavorites(track)) {
        this.setState({ addFavorite: true });
      }
    });
  };

  verifyFavorites = (track) => {
    const { favorites } = this.state;
    return favorites.some((favorite) => favorite.trackId === track.trackId);
  };

  handleFavoriteMusic = ({ target }) => {
    const { track } = this.props;
    const { checked } = target;
    if (checked) {
      this.setState({ loading: true }, async () => {
        await addSong(track);
        this.setState({ loading: false, addFavorite: checked });
      });
    } else {
      this.setState({ loading: true }, async () => {
        await removeSong(track);
        this.setState({ loading: false, addFavorite: false });
      });
    }
  };

  render() {
    const { track } = this.props;
    const { loading, addFavorite } = this.state;
    return loading ? (
      <Loading />
    ) : (
      <div>
        <p>{track.trackName}</p>
        <audio data-testid="audio-component" src={ track.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          {' '}
        </audio>
        <label htmlFor="favorite-checkbox">
          <input
            data-testid={ `checkbox-music-${track.trackId}` }
            checked={ addFavorite }
            id="favorite-checkbox"
            type="checkbox"
            onChange={ this.handleFavoriteMusic }
          />
          Favorita
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  track: PropTypes.shape({
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
    trackName: PropTypes.string,
  }).isRequired,
};

export default MusicCard;
