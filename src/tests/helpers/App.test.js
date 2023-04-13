import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { renderWithRouterAndRedux } from './renderWith';

describe('Testa o comportamento da página "Login"', () => {
  it('Verifica se existe um campo para digitar o email', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByRole('textbox');
    expect(emailInput).toBeInTheDocument();
  });

  it('Verifica se existe um campo para digitar a senha', () => {
    renderWithRouterAndRedux(<App />);
    const senhaInput = screen.getByPlaceholderText(/digite sua senha/i);
    expect(senhaInput).toBeInTheDocument();
  });

  it('Verifica se existe um botão com o texto "Entrar", e se ele está inicialmente desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    const button = screen.getByRole('button', { name: 'Entrar' });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it('Verifica a validação dos campos', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByRole('textbox');
    const senhaInput = screen.getByPlaceholderText(/digite sua senha/i);
    const button = screen.getByRole('button', { name: 'Entrar' });
    expect(button).toBeDisabled();
    userEvent.type(emailInput, 'email@email.com');
    expect(button).toBeDisabled();
    userEvent.type(senhaInput, '123123');
    expect(button).not.toBeDisabled();
  });
});

describe('Testa o comportamento da página "Wallet"', () => {
  it('Verifica se existe um elemento com o email digitado na página "Login"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByRole('textbox');
    const senhaInput = screen.getByPlaceholderText(/digite sua senha/i);
    const button = screen.getByRole('button', { name: 'Entrar' });
    userEvent.type(emailInput, 'email@teste.com');
    userEvent.type(senhaInput, '123123');
    userEvent.click(button);
    const email = screen.getByText(/email: email@teste.com/i);
    expect(email).toBeInTheDocument();
    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });

  it('Verifica se os elementos estão na tela', () => {
    const initialEntries = ['/carteira'];
    const initialState = { user: { email: 'email@teste.com' } };
    renderWithRouterAndRedux(<App />, { initialState, initialEntries });

    const email = screen.getByText(/email: email@teste.com/i);
    expect(email).toBeInTheDocument();
    expect(screen.getByText(/despesa total: r\$/i)).toBeInTheDocument();
    const valueInput = screen.getByRole('spinbutton', { name: 'Valor:' });
    const currencyInput = screen.getByRole('combobox', { name: 'Moeda:' });
    const methodInput = screen.getByRole('combobox', { name: /método de pagamento:/i });
    const tagInput = screen.getByRole('combobox', { name: /tag:/i });
    const descriptionInput = screen.getByRole('textbox', { name: /descrição:/i });
    const button = screen.getByRole('button', { name: /adicionar despesa/i });

    expect(valueInput).toBeInTheDocument();
    expect(currencyInput).toBeInTheDocument();
    expect(methodInput).toBeInTheDocument();
    expect(methodInput).toHaveDisplayValue('Dinheiro');
    expect(tagInput).toBeInTheDocument();
    expect(tagInput).toHaveDisplayValue('Alimentação');
    expect(descriptionInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('Verifica se ao adicionar uma despesa, altera o valor total no "Header"', () => {
    const initialState = {
      wallet: {
        currencies: ['USD'],
        expenses: [{
          value: '10',
          currency: 'USD',
          exchangeRates: {
            USD: {
              ask: '4.909',
            },
          },
        }],
        isLoading: false,
      },
    };
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });
    const totalField = screen.getByTestId('total-field');
    expect(totalField).toBeInTheDocument();
    expect(totalField).toHaveTextContent('49.09');
  });
});
