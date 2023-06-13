import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemon } from '../pages';
import App from '../App';

describe('Teste o componente <FavoritePokemon.js />', () => {
  test('Teste se é exibida na tela a mensagem "No favorite pokemon found", caso a pessoa não tenha Pokémon favoritos', () => {
    renderWithRouter(<FavoritePokemon />);

    const titleFavorite = screen.getByRole('heading', { level: 2, name: 'Favorite Pokémon' });
    const noFavoritesMessage = screen.getByText('No favorite Pokémon found');

    expect(titleFavorite).toBeInTheDocument();
    expect(noFavoritesMessage).toBeInTheDocument();
  });

  test('Teste se apenas são exibidos os Pokémon favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /more details/i });

    expect(detailsLink).toBeInTheDocument();

    userEvent.click(detailsLink);
    const isFavorite = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });

    userEvent.click(isFavorite);
    act(() => {
      history.push('/favorites');
    });

    const headingDois = screen.getByRole('heading', { level: 2, name: 'Favorite Pokémon' });
    const text = screen.queryByText('No favorite Pokémon found');
    const pikachu = screen.getByText(/pikachu/i);

    expect(headingDois).toBeInTheDocument();
    expect(text).not.toBeInTheDocument();
    expect(pikachu).toBeInTheDocument();
  });
});
