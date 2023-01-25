import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

test('Testa se os inputs estão presentes na aplicação', () => {
  render(<App />);
  const searchInput = screen.getByRole('textbox');
  const paramSelect1 = screen.getByRole('combobox', {  name: /param 1:/i}); 
  const paramSelect2 = screen.getByRole('combobox', {  name: /param 2:/i});
  const paramSelect3 = screen.getByRole('spinbutton', {  name: /param 3:/i});
  expect(searchInput).toBeInTheDocument();
  expect(paramSelect1).toBeInTheDocument();
  expect(paramSelect2).toBeInTheDocument();
  expect(paramSelect3).toBeInTheDocument();
});

test('Testa se o input possibilita a escrita', () => {
  render(<App />);
    const searchInput = screen.getByRole('textbox');
    userEvent.type(searchInput, 'ta');
    userEvent.type(searchInput, '');
});

test('Testa os selects', () => {
  render(<App />);
    const btnFilter = screen.getByRole('button', {  name: /filtrar/i});
    const selectOptions = screen.getAllByRole('option');
    const param2 = screen.getByTestId('comparison-filter');
    const param1 = screen.getByTestId('column-filter');
    const deleteFilterBtn = 

    userEvent.selectOptions(param2, selectOptions[7]);

    setTimeout(() => userEvent.click(btnFilter), 5000);

    userEvent.selectOptions(param2, selectOptions[6]);

    setTimeout(() => userEvent.click(btnFilter), 5000);

    userEvent.selectOptions(param1, selectOptions[2]);

    setTimeout(() => userEvent.click(btnFilter), 5000);

    // setTimeout(() => userEvent.click(deleteFilterBtn), 5000)
});

test('Testa o botão de deletar perfil', async () => {
  render(<App />);
    const filterBtn = screen.getByRole('button', {  name: /filtrar/i})
    expect(filterBtn).toBeInTheDocument();
    userEvent.click(filterBtn);
    const deleteFilterBtn = screen.getByRole('button', {  name: /x/i})
    userEvent.click(deleteFilterBtn)
});
