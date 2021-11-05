import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Requisito 5 - Teste o component Pokedex', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('contém heading com o texto Encountered pokemons', () => {
    const findTitlePage = screen.getByRole('heading', {
      level: 2,
      name: /encountered pokémons/i,
    });
    expect(findTitlePage).toBeInTheDocument();
  });

  it('ao clicar em proximo pokemon, e exibido o mesmo', () => {
    const filterFireButton = screen.getByRole('button', { name: /fire/i });
    userEvent.click(filterFireButton);

    const nextPokemonButton = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(nextPokemonButton).toBeInTheDocument();

    const charmander = screen.getByText(/charmander/i);
    expect(charmander).toBeInTheDocument();

    userEvent.click(nextPokemonButton);
    const rapidash = screen.getByText(/rapidash/i);
    expect(rapidash).toBeInTheDocument();

    userEvent.click(nextPokemonButton);
    expect(charmander).toBeInTheDocument();
  });

  it('mostra apenas um pokemon por vez', () => {
    const getPokemon = screen.getAllByText(/more details/i);
    expect(getPokemon).toHaveLength(1);
  });

  it('pokédex possui botões de filtro', () => {
    const buttonAll = screen.getByRole('button', { name: /all/i });
    const filterFireButton = screen.getByRole('button', { name: /fire/i });
    userEvent.click(filterFireButton);

    const nextPokemonButton = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(nextPokemonButton).toBeInTheDocument();
    expect(buttonAll).toBeInTheDocument();

    const charmander = screen.getByText(/charmander/i);
    const fire = screen.getAllByText(/fire/i);
    expect(charmander).toBeInTheDocument();
    expect(fire).toHaveLength(2);
    expect(buttonAll).toBeInTheDocument();

    userEvent.click(nextPokemonButton);
    const rapidash = screen.getByText(/rapidash/i);
    expect(rapidash).toBeInTheDocument();
    expect(fire).toHaveLength(2);
    expect(buttonAll).toBeInTheDocument();

    userEvent.click(nextPokemonButton);
    expect(charmander).toBeInTheDocument();
    expect(buttonAll).toBeInTheDocument();
  });

  it('há botões de filtro', () => {
    const typesButton = screen.getAllByTestId('pokemon-type-button');
    const TYPES = ['All',
      'Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const filterButtons = screen.getAllByRole('button')
      .filter((buttonElement) => buttonElement.classList.contains('filter-button'));

    expect(typesButton[0]).toBeInTheDocument();
    expect(typesButton[1]).toBeInTheDocument();
    expect(typesButton[2]).toBeInTheDocument();
    expect(typesButton[3]).toBeInTheDocument();
    expect(typesButton[4]).toBeInTheDocument();
    expect(typesButton[5]).toBeInTheDocument();
    expect(typesButton[6]).toBeInTheDocument();
    expect(filterButtons[1].innerHTML).toBe(TYPES[1]);
    expect(filterButtons[2].innerHTML).toBe(TYPES[2]);
    expect(filterButtons[3].innerHTML).toBe(TYPES[3]);
    expect(filterButtons[4].innerHTML).toBe(TYPES[4]);
    expect(filterButtons[5].innerHTML).toBe(TYPES[5]);
    expect(filterButtons[6].innerHTML).toBe(TYPES[6]);
    expect(filterButtons[7].innerHTML).toBe(TYPES[7]);
  });

  it('pokédex contém um botão para resetar o filtro', () => {
    const buttonAll = screen.getByRole('button', { name: 'All' });
    expect(buttonAll).toBeInTheDocument();

    userEvent.click(buttonAll);
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();

    const nextPokemonButton = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(nextPokemonButton);

    const charmander = screen.getByText(/charmander/i);
    expect(charmander).toBeInTheDocument();

    renderWithRouter(<App />);
    expect(pikachu).toBeInTheDocument();

    userEvent.click(nextPokemonButton);

    expect(charmander).toBeInTheDocument();
  });
});
