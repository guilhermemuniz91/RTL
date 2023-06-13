import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
// import { Pokedex } from '../pages';
import App from '../App';
import pokemonList from '../data';

describe('Teste o componente <Pokedex.js />', () => {
  let nextButton;
  let resetFilterBtn;

  beforeEach(() => {
    renderWithRouter(<App />);
    nextButton = screen.getByRole('button', { name: 'Próximo Pokémon' });
    resetFilterBtn = screen.getByRole('button', { name: 'All' });
  });

  test('Teste se a página contém um heading h2 com o texto "Encountered Pokémon"', () => {
    const headingDois = screen.getByRole('heading', { level: 2, name: 'Encountered Pokémon' });

    expect(headingDois).toBeInTheDocument();
  });

  test('Teste se é exibido o próximo Pokémon ao clicar no botão "Próximo pokémon"', () => {
    pokemonList.map((pokemon) => {
      const pokemonName = screen.getByText(pokemon.name);
      expect(pokemonName).toBeInTheDocument();
      userEvent.click(nextButton);
      return pokemon.name;
    });
  });

  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    const pokemonName = screen.getAllByAltText(/pikachu/i);
    expect(pokemonName.length).toBe(1);
  });

  test('Teste se a Pokédex tem os botões de filtro', () => {
    const allButtons = screen.getAllByTestId('pokemon-type-button');
    expect(allButtons.length).toBe(7);
    const buttonTypes = allButtons.map((button) => button.textContent);
    expect(buttonTypes).toEqual(['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon']);

    expect(resetFilterBtn).toBeInTheDocument();

    const buttonNormal = screen.getByRole('button', { name: 'Normal' });
    userEvent.click(buttonNormal);
    const pokemonElement = screen.getByTestId('pokemon-type');
    expect(pokemonElement).toHaveTextContent(buttonNormal.textContent);

    expect(nextButton).toBeDisabled();
    expect(resetFilterBtn).toBeInTheDocument();
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    expect(resetFilterBtn).toHaveTextContent('All');
    const buttonNormal = screen.getByRole('button', { name: /normal/i });
    userEvent.click(buttonNormal);
    expect(nextButton).toBeDisabled();
    userEvent.click(resetFilterBtn);
    expect(nextButton).not.toBeDisabled();
  });
});
