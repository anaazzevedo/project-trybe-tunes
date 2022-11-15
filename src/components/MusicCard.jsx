import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  state = {
    checkFav: false,
    loading: false,
    favoritesMusics: [],
  };

  async componentDidMount() {
    const fav = await getFavoriteSongs();
    this.setState({
      favoritesMusics: fav,
    });
  }

  async favorites({ target }, musics) {
    this.setState({
      loading: true,
    }, () => {});
    if (!target.checked) {
      await removeSong(musics);
      this.setState({
        checkFav: false,
        loading: false,
      });
    } else {
      await addSong(musics);
      this.setState({
        checkFav: true,
        loading: false,
      });
    }
  }

  render() {
    const { checkFav, loading, favoritesMusics } = this.state;
    const { trackName, previewUrl, trackId, musics } = this.props;
    return (
      <div className="targetAudio">
        <h3 className="nameAlbum">{ trackName }</h3>
        <audio
          data-testid="audio-component"
          src={ previewUrl }
          className="audio"
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
        </audio>
        <label htmlFor="fav">
          Favorita
          { loading ? <Loading /> : null }
          <input
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            name="fav"
            onChange={ (e) => this.favorites(e, musics) }
            checked={ !checkFav
              ? favoritesMusics.some((song) => song.trackId === trackId) : checkFav }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string,
  trackName: PropTypes.string,
}.isRequired;

export default MusicCard;
