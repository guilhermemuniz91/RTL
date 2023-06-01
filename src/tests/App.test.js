import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <App.js />', () => {
//   const linkHome = screen.getByRole('link', { name: 'Home' });
//   const linkAbout = screen.getByRole('link', { name: 'About' });
//   const linkFavorite = screen.getByRole('link', { name: 'Favorite Pokémon' });
  test('Testa se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: 'Home' });
    const linkAbout = screen.getByRole('link', { name: 'About' });
    const linkFavorite = screen.getByRole('link', { name: 'Favorite Pokémon' });

    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavorite).toBeInTheDocument();
  });

  test('Teste se a aplicação é redirecionada para a página inicial, na URL "/", ao clicar no link Home da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;

    const linkHome = screen.getByRole('link', { name: 'Home' });
    userEvent.click(linkHome);
    expect(pathname).toBe('/');
  });

  test('Teste se a aplicação é redirecionada para a página de About, na URL "/about", ao clicar no link About da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: 'About' });
    userEvent.click(linkAbout);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Teste se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL "/favorites", ao clicar no link Favorite Pokémon da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const linkFavorite = screen.getByRole('link', { name: 'Favorite Pokémon' });
    userEvent.click(linkFavorite);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    act(() => { history.push('algo que nao existe'); });
    const pageNotFound = screen.getByText('Page requested not found');
    expect(pageNotFound).toBeInTheDocument();
  });
});
