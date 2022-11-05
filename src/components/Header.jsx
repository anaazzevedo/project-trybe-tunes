import React, { Component } from 'react';
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
        Header
        { loading ? (<Loading />
        ) : (
          <div data-testid="header-user-name">
            { name }
          </div>
        )}
      </header>
    );
  }
}

export default Header;
