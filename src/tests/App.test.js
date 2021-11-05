import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Requisito 1 - Teste o component App', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('primeiro link possui o texto home', () => {
    const getHome = screen.getByRole('link', { name: /home/i });
    expect(getHome).toBeInTheDocument();
  });

  it('segundo link possui o texto about', () => {
    const getAbout = screen.getByRole('link', { name: /about/i });
    expect(getAbout).toBeInTheDocument();
  });

  it('terceiro link possui o texto favorite pokemons', () => {
    const getFavoritePokemons = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(getFavoritePokemons).toBeInTheDocument();
  });

  it('clicar em home a página é redirecionada', () => {
    const getHome = screen.getByRole('link', { name: /home/i });
    userEvent.click(getHome);
    const { history } = renderWithRouter(<App />);
    const { location } = history;

    expect(location.pathname).toBe('/');
  });

  it('clicar em about a página é redirecionada', () => {
    const getAbout = screen.getByRole('link', { name: /about/i });
    userEvent.click(getAbout);

    const findTitlePage = screen.getByRole('heading', { name: 'About Pokédex' });
    expect(findTitlePage).toBeInTheDocument();
  });

  it('clicar em favorite pokemons a página é redirecionada', () => {
    const getFavoritePokemons = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(getFavoritePokemons);

    const findTitlePage = screen.getByRole('heading', { name: 'Favorite pokémons' });
    expect(findTitlePage).toBeInTheDocument();
  });

  it('redireciona para página not found em url desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/paginaqualquer');

    const findTitlePage = screen.getByRole('heading', { name: /not found/i });
    expect(findTitlePage).toBeInTheDocument();
  });
});
