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
    const findTitlePage = screen.getByRole('heading', { name: /encountered pokémons/i });
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
    const TYPES = ['All',
      'Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const filterButtons = screen.getAllByRole('button')
      .filter((buttonElement) => buttonElement.classList.contains('filter-button'));
    expect(filterButtons).toHaveLength(TYPES.length);
    expect(buttonAll).toBeInTheDocument();

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

    const filterButtonsValue = filterButtons
      .map((buttonElement) => buttonElement.innerHTML);
    expect(filterButtonsValue).toEqual(TYPES);
    expect(buttonAll).toBeInTheDocument();
  });

  it('o filtro do elemento psychic funciona', () => {
    const buttonAll = screen.getByRole('button', { name: /all/i });
    const filterPsychicButton = screen.getByRole('button', { name: /psychic/i });
    userEvent.click(filterPsychicButton);

    const nextPokemonButton = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(nextPokemonButton).toBeInTheDocument();
    expect(buttonAll).toBeInTheDocument();

    const alakazam = screen.getByText(/alakazam/i);
    const psychic = screen.getAllByText(/psychic/i);
    expect(alakazam).toBeInTheDocument();
    expect(psychic).toHaveLength(2);
    expect(buttonAll).toBeInTheDocument();

    userEvent.click(nextPokemonButton);
    const mew = screen.getByText(/mew/i);
    expect(mew).toBeInTheDocument();
    expect(psychic).toHaveLength(2);
    expect(buttonAll).toBeInTheDocument();

    userEvent.click(nextPokemonButton);
    expect(alakazam).toBeInTheDocument();
    expect(buttonAll).toBeInTheDocument();
  });

  it('o filtro do elemento bug funciona', () => {
    const buttonAll = screen.getByRole('button', { name: /all/i });
    const filterBugButton = screen.getByRole('button', { name: /bug/i });
    userEvent.click(filterBugButton);

    const nextPokemonButton = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(nextPokemonButton).toBeInTheDocument();
    expect(buttonAll).toBeInTheDocument();

    const caterpie = screen.getByText(/caterpie/i);
    const bug = screen.getAllByText(/bug/i);
    expect(caterpie).toBeInTheDocument();
    expect(bug).toHaveLength(2);
    expect(buttonAll).toBeInTheDocument();

    expect(nextPokemonButton.disabled).toEqual(true);
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
