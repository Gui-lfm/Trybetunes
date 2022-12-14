import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AlbumList extends Component {
  render() {
    const { artist, albuns } = this.props;
    return (
      <section>
        {!albuns.length ? (
          <p>Nenhum álbum foi encontrado</p>
        ) : (
          <div>
            <h2>{`Resultado de álbuns de: ${artist}`}</h2>
            {albuns.map((album) => (
              <Link
                key={ album.collectionId }
                data-testid={ `link-to-album-${album.collectionId}` }
                to={ `/album/${album.collectionId}` }
              >
                <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                <h3>{album.collectionName}</h3>
                <h4>{album.artistName}</h4>
              </Link>
            ))}
          </div>
        )}
      </section>
    );
  }
}

AlbumList.propTypes = {
  albuns: PropTypes.arrayOf(
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
  artist: PropTypes.string.isRequired,
};

export default AlbumList;
