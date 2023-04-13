import {
  FETCH_REQUEST,
  FETCH_CURRENCIES_SUCCESS,
  FETCH_FAILURE,
  FETCH_SUCCESS,
  REMOVE_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  errorMessage: null,
  isLoading: false,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_REQUEST: {
    return {
      ...state,
      isLoading: true,
    };
  }
  case FETCH_CURRENCIES_SUCCESS: {
    return {
      ...state,
      isLoading: false,
      currencies: action.payload.currencies,
    };
  }
  case FETCH_FAILURE: {
    return {
      ...state,
      isLoading: false,
      errorMessage: action.payload.errorMessage,
    };
  }
  case FETCH_SUCCESS: {
    return {
      ...state,
      isLoading: false,
      expenses: [...state.expenses, action.payload],
    };
  }
  case REMOVE_EXPENSE: {
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload.id),
    };
  }
  default: return state;
  }
};

export default wallet;
