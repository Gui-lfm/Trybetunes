import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    loading: false,
    addFavorite: false,
  };

  handleFavoriteMusic = ({ target }) => {
    const { trackId } = this.props;
    const { checked } = target;

    this.setState({ loading: true }, async () => {
      await addSong(trackId);
      this.setState({ loading: false, addFavorite: checked });
    });
  };

  render() {
    const { previewUrl, trackName, trackId } = this.props;
    const { loading, addFavorite } = this.state;
    return loading ? (
      <Loading />
    ) : (
      <div>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          {' '}
        </audio>
        <label
          htmlFor="favorite-checkbox"
        >
          <input
            data-testid={ `checkbox-music-${trackId}` }
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
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};

export default MusicCard;
