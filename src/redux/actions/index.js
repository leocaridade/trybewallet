import { fetchCurrencies } from '../../services/currencyAPI';

export const USER_LOGIN = 'USER_LOGIN';
export const FETCH_CURRENCIES_SUCCESS = 'FETCH_CURRENCIES_SUCCESS';
export const FETCH_CURRENCIES_FAILURE = 'FETCH_CURRENCIES_FAILURE';

export const userLogin = (email) => ({
  type: USER_LOGIN,
  payload: {
    email,
  },
});

const fetchCurrenciesSuccess = (currencies) => ({
  type: FETCH_CURRENCIES_SUCCESS,
  payload: {
    currencies,
  },
});

const fetchCurrenciesFailure = (errorMessage) => ({
  type: FETCH_CURRENCIES_FAILURE,
  payload: {
    errorMessage,
  },
});

export const fetchCurrenciesThunk = () => async (dispatch) => {
  try {
    const currencies = await fetchCurrencies();
    dispatch(fetchCurrenciesSuccess(currencies));
  } catch (error) {
    dispatch(fetchCurrenciesFailure('Algo deu errado!'));
  }
};
