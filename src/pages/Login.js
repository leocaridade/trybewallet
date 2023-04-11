import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userLogin } from '../redux/actions';

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { history, dispatch } = this.props;
    const { email } = this.state;
    history.push('/carteira');
    dispatch(userLogin(email));
  };

  render() {
    const { email, password } = this.state;
    const minPasswordLength = 6;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email) && password.length >= minPasswordLength;

    return (
      <div>
        <form
          className="login-form"
          onSubmit={ this.handleSubmit }
        >
          <input
            type="email"
            data-testid="email-input"
            name="email"
            placeholder="Digite seu email"
            value={ email }
            onChange={ this.handleChange }
          />
          <input
            type="password"
            data-testid="password-input"
            name="password"
            placeholder="Digite sua senha"
            value={ password }
            onChange={ this.handleChange }
          />
          <button
            disabled={ !isValid }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
