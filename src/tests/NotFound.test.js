import { screen } from '@testing-library/react';
import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('Requisito 4 - Teste o component NotFound', () => {
  beforeEach(() => {
    renderWithRouter(<NotFound />);
  });

  it('a página contém a mensagem de page request not found', () => {
    const findTitlePage = screen.getByRole('heading', {
      name: /Page requested not found/i,
    });
    expect(findTitlePage).toBeInTheDocument();
  });

  it('a página contém uma imagem especifica', () => {
    const findImg = screen.getAllByRole('img');

    expect(findImg[1]).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
