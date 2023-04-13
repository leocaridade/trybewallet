import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editExpense, fetchCurrenciesThunk, fetchThunk } from '../redux/actions';

const initialState = {
  value: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  description: '',
};

class WalletForm extends Component {
  state = {
    id: 0,
    value: 0,
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    description: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrenciesThunk());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleAddClick = (event) => {
    event.preventDefault();
    const { dispatch } = this.props;
    this.setState((prevState) => ({
      id: prevState.id + 1,
    }));
    const estado = this.state;
    dispatch(fetchThunk(estado));

    this.setState(initialState);
  };

  handleEditClick = (event) => {
    event.preventDefault();
    const { dispatch, idToEdit } = this.props;
    const editedExpense = { ...this.state, id: idToEdit };
    dispatch(editExpense(editedExpense));
    this.setState(initialState);
  };

  render() {
    const { currencies, isLoading, editor } = this.props;
    const { value, currency, method,
      tag, description } = this.state;

    return (
      <div>
        <form>
          <label>
            Valor:
            <input
              type="number"
              data-testid="value-input"
              name="value"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label>
            Moeda:
            <select
              data-testid="currency-input"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              {
                currencies
                  .map((curr, index) => <option key={ index }>{curr}</option>)
              }
            </select>
          </label>
          <label>
            Método de pagamento:
            <select
              data-testid="method-input"
              name="method"
              value={ method }
              onChange={ this.handleChange }
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
              name="tag"
              value={ tag }
              onChange={ this.handleChange }
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
              name="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          {
            !editor ? (
              <button
                onClick={ this.handleAddClick }
              >
                Adicionar despesa
              </button>)
              : (
                <button
                  onClick={ this.handleEditClick }
                >
                  Editar despesa
                </button>
              )
          }
        </form>
        <div>
          { isLoading && <h2>Loading...</h2>}
        </div>
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  isLoading: PropTypes.bool.isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  isLoading: state.wallet.isLoading,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

export default connect(mapStateToProps)(WalletForm);
