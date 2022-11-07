import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    name: '',
    loading: true,
  };

  async componentDidMount() {
    const result = await getUser();
    this.setState({
      name: result.name,
      loading: false,
    });
  }

  render() {
    const { name, loading } = this.state;
    return (
      <header data-testid="header-component">
        { loading ? (<Loading />
        ) : (
          <div data-testid="header-user-name">
            { name }
          </div>
        )}
        <nav>
          <Link to="/search" data-testid="link-to-search">Pesquisa</Link>

          <Link
            to="/favorites"
            data-testid="link-to-favorites"
          >
            Músicas favoritas
          </Link>

          <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        </nav>
      </header>
    );
  }
}

export default Header;
