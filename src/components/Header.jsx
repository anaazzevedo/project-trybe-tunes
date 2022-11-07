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
      <header data-testid="header-component" className="header">
        { loading ? (<Loading />
        ) : (
          <div data-testid="header-user-name" className="name">
            { name }
          </div>
        )}
        <nav className="nav">
          <Link
            to="/search"
            data-testid="link-to-search"
            className="search nav"
          >
            Pesquisa
          </Link>

          <Link
            to="/favorites"
            data-testid="link-to-favorites"
            className="fav nav"
          >
            Músicas favoritas
          </Link>

          <Link
            to="/profile"
            data-testid="link-to-profile"
            className="profile nav"
          >
            Perfil
          </Link>
        </nav>
      </header>
    );
  }
}

export default Header;
