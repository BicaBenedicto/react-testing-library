import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Requisito 3 - Teste o component favorite pokemons', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('a página contém o texto de não tem pokemon favoritado', () => {
    const favoritePokemons = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoritePokemons);
    const findTitlePage = screen.getByText(/no favorite pokemon found/i);
    expect(findTitlePage).toBeInTheDocument();
  });

  it('mostra os pokemons ao favoritas', () => {
    const getPokemon = screen.getAllByText(/more details/i);
    userEvent.click(getPokemon[0]);
    const getFavoriteButton = screen.getByRole('checkbox');
    userEvent.click(getFavoriteButton);

    const favoritePokemons = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoritePokemons);

    expect(getPokemon).toHaveLength(1);
  });
});
