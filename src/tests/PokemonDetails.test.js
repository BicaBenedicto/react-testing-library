import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Requisito 7 - Teste o component PokemonDetails', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('a página possui os detalhes do pokemon', () => {
    const pokemonDetails = screen.getByRole('link', { name: /more details/i });
    expect(pokemonDetails).toBeInTheDocument();

    userEvent.click(pokemonDetails);

    const findTitle = screen.getByRole('heading', { name: 'Pikachu Details' });
    expect(findTitle).toBeInTheDocument();
    expect(pokemonDetails).not.toBeInTheDocument();

    const findSummary = screen.getByRole('heading', {
      level: 2,
      name: /summary/i,
    });
    expect(findSummary).toBeInTheDocument();

    const findInfoPokemon = screen.getByText(/This intelligent Pokémon/i);
    expect(findInfoPokemon).toBeInTheDocument();
  });

  it('a existe uma seção com os mapas contendo as localizações do pokemon', () => {
    const pokemonDetails = screen.getByRole('link', { name: /more details/i });
    expect(pokemonDetails).toBeInTheDocument();

    userEvent.click(pokemonDetails);

    const findGameLocationsOfPokemon = screen.getByRole('heading', {
      level: 2,
      name: /game locations of pikachu/i,
    });
    expect(findGameLocationsOfPokemon).toBeInTheDocument();

    const findKantoViridian = screen.getByText('Kanto Viridian Forest');
    const findImgLocations = screen.getAllByRole('img');
    expect(findKantoViridian).toBeInTheDocument();
    expect(findImgLocations[1]).toHaveAttribute('alt', 'Pikachu location');
    expect(findImgLocations[1]).not.toHaveAttribute('src', '');

    const findKantoPower = screen.getByText('Kanto Power Plant');
    expect(findKantoPower).toBeInTheDocument();
    expect(findImgLocations[2]).toHaveAttribute('alt', 'Pikachu location');
    expect(findImgLocations[2]).not.toHaveAttribute('src', '');
  });

  it('o usuario pode favoritar o pokemon', () => {
    const pokemonDetails = screen.getByRole('link', { name: /more details/i });
    expect(pokemonDetails).toBeInTheDocument();

    userEvent.click(pokemonDetails);

    const findFavoriteCheckout = screen.getByRole('checkbox', {
      name: 'Pokémon favoritado?',
    });
    expect(findFavoriteCheckout).toBeInTheDocument();

    userEvent.click(findFavoriteCheckout);

    const findImgStar = screen.getAllByRole('img');
    expect(findImgStar[1]).toHaveAttribute('alt', 'Pikachu is marked as favorite');
    expect(findImgStar[1]).toHaveAttribute('src', '/star-icon.svg');

    userEvent.click(findFavoriteCheckout);

    expect(findImgStar[1]).not.toBeInTheDocument();
  });
});
