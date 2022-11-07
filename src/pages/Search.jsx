import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();
    this.enabledButton = this.enabledButton.bind(this);
    this.state = {
      isButtonDisabled: true,
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
  }

  render() {
    const { isButtonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <div><Header /></div>
        <form>
          <input
            data-testid="search-artist-input"
            type="text"
            placeholder="Digite o nome de um artista"
            onChange={ this.enabledButton }
          />
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ isButtonDisabled }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
