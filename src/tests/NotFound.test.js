import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../pages';

describe('Teste o componente <NotFound.js />', () => {
  test('Teste se a página contém um heading h2 com o texto "Page requested not found"', () => {
    renderWithRouter(<NotFound />);

    const headingDois = screen.getByRole('heading', { level: 2, name: 'Page requested not found' });

    expect(headingDois).toBeInTheDocument();
  });

  test('Teste se a página mostra determinada imagem', () => {
    renderWithRouter(<NotFound />);

    const imageNotFound = screen.getByRole('img');
    const imageSource = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(imageNotFound).toBeInTheDocument();
    expect(imageNotFound.src).toBe(imageSource);
  });
});
