import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusic from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      nameAlbum: '',
      nameArtist: '',
      listMusics: [],
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const fetchMusic = await getMusic(match.params.id);
    const arr = fetchMusic.filter((music) => music.trackName);
    this.setState({
      nameAlbum: fetchMusic[0].collectionName,
      nameArtist: fetchMusic[0].artistName,
      listMusics: arr,
    });
  }

  render() {
    const { nameAlbum, nameArtist, listMusics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h3 className="h3Album">Álbum</h3>
        <h4
          data-testid="artist-name"
          className="h4Artist"
        >
          <strong>
            { `Artist Name:  ${nameArtist.toUpperCase()}` }
          </strong>
        </h4>

        <h4
          data-testid="album-name"
          className="h4Album"
        >
          {`Collection Name:  ${nameAlbum}`}
        </h4>

        <div className="listMusics">
          {listMusics.map((music) => (
            <MusicCard
              key={ music.trackId }
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
            />
          ))}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Album;
