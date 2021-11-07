import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Requisito 6 - Teste o component Pokemon', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('a página contém os elementos do pokemon especifico', () => {
    const findPokemonName = screen.getByText('Pikachu');
    expect(findPokemonName).toBeInTheDocument();

    const findPokemonType = screen.getAllByText('Electric');
    expect(findPokemonType).toHaveLength(2);

    const findPokemonAverage = screen.getByText(/average weight:/i);
    expect(findPokemonAverage).toBeInTheDocument();
    expect(findPokemonAverage.innerHTML).toBe('Average weight: 6.0 kg');

    const findPokemonImg = screen.getAllByRole('img');
    expect(findPokemonImg[0]).toHaveAttribute('alt', 'Pikachu sprite');
    expect(findPokemonImg[0]).not.toHaveAttribute('src', '');
  });

  it('a pokedex leva para link com o id do pokemon', () => {
    const pokemonDetails = screen.getByRole('link', { name: /more details/i });
    expect(pokemonDetails).toBeInTheDocument();
    expect(pokemonDetails).toHaveAttribute('href', '/pokemons/25');
  });

  it('a página é redirecionada para a do pokemon', () => {
    const pokemonDetails = screen.getByRole('link', { name: /more details/i });
    expect(pokemonDetails).toBeInTheDocument();

    userEvent.click(pokemonDetails);

    const findTitle = screen.getByRole('heading', { name: 'Pikachu Details' });
    expect(findTitle).toBeInTheDocument();
  });

  it('o pokemon favoritado possui uma estrela', () => {
    const pokemonDetails = screen.getByRole('link', { name: /more details/i });
    expect(pokemonDetails).toBeInTheDocument();

    userEvent.click(pokemonDetails);

    const getFavoriteButton = screen.getByRole('checkbox');
    userEvent.click(getFavoriteButton);

    const findImgStar = screen.getAllByRole('img');
    expect(findImgStar[1]).toHaveAttribute('alt', 'Pikachu is marked as favorite');
    expect(findImgStar[1]).toHaveAttribute('src', '/star-icon.svg');
  });
});
