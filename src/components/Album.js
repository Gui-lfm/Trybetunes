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
    const tracks = selected.slice(1);
    this.setState({
      artist: selected[0].artistName,
      album: selected[0].collectionName,
      coverImg: selected[0].artworkUrl100,
      trackList: tracks,
    });
  };

  render() {
    const { artist, album, coverImg, trackList } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <img src={ coverImg } alt={ album } />
        <h2 data-testid="album-name">{album}</h2>
        <h3 data-testid="artist-name">{artist}</h3>
        {trackList.map((track) => (
          <MusicCard
            key={ track.trackId }
            track={ track }
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

// refatorar addSong p/ receber uma musica completa --ok
// levar a lógica de update favorites p/ dentro do musicCard --ok
// criar dentro do checked a hof some, que vai verificar se o trackId da musica existe no estado de musicas favoritadas
