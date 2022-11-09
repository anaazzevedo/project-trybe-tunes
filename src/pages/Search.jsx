import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
// import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();
    this.enabledButton = this.enabledButton.bind(this);
    this.searchArtist = this.searchArtist.bind(this);
    this.state = {
      isButtonDisabled: true,
      inputValue: '',
      inputSave: '',
      // loading: false,
      arrAPI: [],
      notFound: false,
    };
  }

  enabledButton({ target }) {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
    if (value.length < 2) {
      this.setState({ isButtonDisabled: true });
    } else { this.setState({ isButtonDisabled: false }); }
    this.setState({ inputValue: value });
  }

  async searchArtist(event) {
    event.preventDefault();
    const { inputValue } = this.state;
    const fetch = await searchAlbumsAPI(inputValue);
    this.setState({
      inputValue: '',
      inputSave: inputValue,
      // loading: true,
      arrAPI: fetch,
      notFound: true,
    });
  }

  render() {
    const {
      isButtonDisabled,
      inputValue,
      inputSave,
      // loading,
      arrAPI,
      notFound } = this.state;

    return (
      <div data-testid="page-search">
        <div><Header /></div>
        <div>
          <form className="form-artist">
            <input
              className="input-artist"
              data-testid="search-artist-input"
              type="text"
              name="search"
              placeholder="Artista ou banda"
              onChange={ this.enabledButton }
              value={ inputValue }
            />
            <button
              className="button-artist"
              data-testid="search-artist-button"
              type="button"
              disabled={ isButtonDisabled }
              onClick={ this.searchArtist }
            >
              <strong>Pesquisar</strong>
            </button>
          </form>
          <div>
            {(notFound === true && arrAPI.length === 0)
            && <h2 className="h2notFound">Nenhum álbum foi encontrado</h2>}
          </div>
          {/* { loading ? (<Loading />
          ) : (
            <div>
              { arrAPI.map(({ collectionId, collectionName }) => (
                <div key={ collectionId }>
                  <h2>{`Resultado de álbuns de: ${inputSave}`}</h2>
                  <nav>
                    <Link
                      data-testid={ `link-to-album-${collectionId}` }
                      to={ `/album/${collectionId}` }
                    >
                      { collectionName }
                    </Link>
                  </nav>
                </div>
              ))}
            </div>
          )} */}
          <div>
            <h2 className="h2Albuns">{`Resultado de álbuns de: ${inputSave}`}</h2>
          </div>
          <div>
            <div className="mapAlbuns">
              { arrAPI.map(({ collectionId, collectionName, artworkUrl100 }) => (
                <li key={ collectionId } className="listAlbuns">
                  <Link
                    className="nameAlbuns"
                    data-testid={ `link-to-album-${collectionId}` }
                    to={ `/album/${collectionId}` }
                  >
                    <div className="nameTargetAlbuns">{ collectionName }</div>
                    <img
                      src={ artworkUrl100 }
                      alt={ collectionId }
                      className="imgAlbuns"
                    />
                  </Link>
                </li>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
