import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrenciesThunk } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrenciesThunk());
  }

  render() {
    const { currencies } = this.props;

    return (
      <div>
        <form>
          <label>
            Valor:
            <input
              type="number"
              data-testid="value-input"
            />
          </label>
          <label>
            Moeda:
            <select
              data-testid="currency-input"
            >
              {
                currencies
                  .map((currency, index) => <option key={ index }>{currency}</option>)
              }
            </select>
          </label>
          <label>
            Método de pagamento:
            <select
              data-testid="method-input"
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label>
            Tag:
            <select
              data-testid="tag-input"
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <label>
            Descrição:
            <input
              type="text"
              data-testid="description-input"
            />
          </label>
          <button>Adicionar despesa</button>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
