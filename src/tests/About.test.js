import { screen } from '@testing-library/react';
import React from 'react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Requisito 2 - Teste o component about', () => {
  beforeEach(() => {
    renderWithRouter(<About />);
  });

  it('a página contém um titulo com About Pokedex', () => {
    const findTitlePage = screen.getByRole('heading', { name: 'About Pokédex' });
    expect(findTitlePage).toBeInTheDocument();
  });

  it('a página contem dois paragrados sobre a pokedex', () => {
    const findParagraph = screen.getAllByText(/pokémons/i);

    expect(findParagraph).toHaveLength(2);
  });

  it('a página contém a seguinte imagem de uma Pokédex', () => {
    const findImg = screen.getByRole('img');

    expect(findImg.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
