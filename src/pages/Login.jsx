import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() {
    super();
    this.enabledButton = this.enabledButton.bind(this);
    this.saveLogin = this.saveLogin.bind(this);
    this.state = {
      isButtonDisabled: true,
      nameInput: '',
      loading: false,
      login: false,
    };
  }

  enabledButton({ target }) {
    const { value } = target;
    const num = 3;

    this.setState({
      nameInput: value,
      isButtonDisabled: value.length < num,
    });
  }

  async saveLogin(event) {
    event.preventDefault();
    const { nameInput } = this.state;
    this.setState({
      loading: true,
      login: true,
    });
    await createUser(nameInput);
    this.setState({
      loading: false,
      login: true,
    });
  }

  render() {
    const { isButtonDisabled, loading, login } = this.state;
    return (
      <div data-testid="page-login">
        { loading ? (<Loading />
        ) : (

          <form>

            <label htmlFor="login-name-input">
              <input
                data-testid="login-name-input"
                id="login-name-input"
                name="login-name-input"
                placeholder="Digite seu nome"
                nameinput="name"
                onChange={ this.enabledButton }
              />
              <button
                type="button"
                id="login-submit-button"
                data-testid="login-submit-button"
                disabled={ isButtonDisabled }
                onClick={ this.saveLogin }
              >
                Entrar
              </button>
            </label>
          </form>
        )}
        {login && <Redirect to="/search" />}
      </div>
    );
  }
}

export default Login;
