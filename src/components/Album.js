/* eslint-disable react/jsx-curly-spacing */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';

class Album extends Component {
  state = {
    artist: '',
    album: '',
    coverImg: '',
    trackList: [],
  };

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;

    this.fetchAlbum(id);
  }

  fetchAlbum = async (id) => {
    const selected = await getMusics(id);
    this.setState({
      artist: selected[0].artistName,
      album: selected[0].collectionName,
      coverImg: selected[0].artworkUrl100,
      trackList: selected.slice(1),
    });
  };

  render() {
    const { artist, album, coverImg, trackList } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <img src={ coverImg } alt={ album } />
        <h2 data-testid="album-name">{ album }</h2>
        <h3 data-testid="artist-name">{ artist }</h3>
        {trackList.map((track) => (
          <MusicCard
            key={ track.trackId }
            trackName={ track.trackName }
            previewUrl={ track.previewUrl }
            trackId={ track.trackId }
          />
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
export default Album;
