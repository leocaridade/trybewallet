import { fetchCurrencies, fetchCurrenciesInput } from '../../services/currencyAPI';

export const USER_LOGIN = 'USER_LOGIN';
export const FETCH_REQUEST = 'FETCH_REQUEST';
export const FETCH_CURRENCIES_SUCCESS = 'FETCH_CURRENCIES_SUCCESS';
export const FETCH_FAILURE = 'FETCH_FAILURE';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';

export const userLogin = (email) => ({
  type: USER_LOGIN,
  payload: {
    email,
  },
});

const fetchRequest = () => ({
  type: FETCH_REQUEST,
});

const fetchCurrenciesSuccess = (currencies) => ({
  type: FETCH_CURRENCIES_SUCCESS,
  payload: {
    currencies,
  },
});

const fetchFailure = (errorMessage) => ({
  type: FETCH_FAILURE,
  payload: {
    errorMessage,
  },
});

export const fetchCurrenciesThunk = () => async (dispatch) => {
  try {
    dispatch(fetchRequest());
    const currencies = await fetchCurrenciesInput();
    dispatch(fetchCurrenciesSuccess(currencies));
  } catch (error) {
    dispatch(fetchFailure('Algo deu errado!'));
  }
};

const fetchSuccess = (expenses) => ({
  type: FETCH_SUCCESS,
  payload: expenses,
});

export const fetchThunk = (state) => async (dispatch) => {
  try {
    dispatch(fetchRequest());
    const currencies = await fetchCurrencies();
    const expenses = { ...state, exchangeRates: currencies };
    dispatch(fetchSuccess(expenses));
  } catch (error) {
    dispatch(fetchFailure('Algo deu errado!'));
  }
};

export const removeExpense = (id) => ({
  type: REMOVE_EXPENSE,
  payload: {
    id,
  },
});
