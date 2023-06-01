import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemon } from '../pages';

describe('Teste o componente <FavoritePokemon.js />', () => {
  test('Teste se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos;', () => {
    renderWithRouter(<FavoritePokemon />);

    const titleFavorite = screen.getByRole('heading', { level: 2, name: 'Favorite Pokémon' });
    const noFavoritesMessage = screen.getByText('No favorite Pokémon found');

    expect(titleFavorite).toBeInTheDocument();
    expect(noFavoritesMessage).toBeInTheDocument();
  });

  test('Teste se apenas são exibidos os Pokémon favoritados.', () => {
    // const { history } = renderWithRouter(<FavoritePokemon />);
  });
});
