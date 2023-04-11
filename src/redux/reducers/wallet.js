import { FETCH_CURRENCIES_SUCCESS, FETCH_CURRENCIES_FAILURE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  errorMessage: null,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_CURRENCIES_SUCCESS: {
    return {
      ...state,
      currencies: action.payload.currencies,
    };
  }
  case FETCH_CURRENCIES_FAILURE: {
    return {
      ...state,
      errorMessage: action.payload.errorMessage,
    };
  }
  default: return state;
  }
};

export default wallet;
