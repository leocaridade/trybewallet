import {
  FETCH_REQUEST,
  FETCH_CURRENCIES_SUCCESS,
  FETCH_FAILURE,
  FETCH_SUCCESS,
  REMOVE_EXPENSE,
  SELECT_EXPENSE_TO_EDIT,
  EDIT_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  errorMessage: null,
  isLoading: false,
};

const updateExpenses = (expenses, idToEdit, updatedExpense) => expenses.map((expense) => {
  if (expense.id === idToEdit) {
    return {
      ...expense,
      ...updatedExpense,
    };
  }
  return expense;
});

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_REQUEST: {
    return { ...state, isLoading: true };
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
  case SELECT_EXPENSE_TO_EDIT: {
    return { ...state, editor: true, idToEdit: Number(action.payload.id),
    };
  }
  case EDIT_EXPENSE: {
    const updatedExpenses = updateExpenses(
      state.expenses,
      state.idToEdit,
      action.payload.expense,
    );
    return {
      ...state,
      editor: false,
      expenses: updatedExpenses,
    };
  }
  default: return state;
  }
};

export default wallet;
