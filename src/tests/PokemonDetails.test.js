import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';
import App from '../App';

describe('Teste o componente <PokemonDetails.js />', () => {
  let moreDetails;
  let pokemon;
  let pokemonName;

  beforeEach(() => {
    renderWithRouter(<App />);
    moreDetails = screen.getByText('More details');
    pokemon = screen.getByTestId('pokemon-name');
    pokemonName = pokemon.innerHTML;
  });

  it('Testa se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    userEvent.click(moreDetails);

    const heading = screen.getByRole('heading', { name: 'Summary' });
    const paragraph = screen.getByText(/This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat./i);
    const details = screen.getByText(`${pokemonName} Details`);

    expect(heading).toBeInTheDocument();
    expect(moreDetails).not.toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();
    expect(details).toBeInTheDocument();
  });

  it('Testa se existe na página uma seção com os mapas contendo as localizações do Pokémon:', () => {
    userEvent.click(moreDetails);

    const headingDois = screen.getByRole('heading', { level: 2, name: `Game Locations of ${pokemonName}` });
    expect(headingDois).toBeInTheDocument();

    const pokemonData = pokemonList.find((poke) => poke.name === pokemonName);
    const imagesPokemon = screen.getAllByRole('img');

    pokemonData.foundAt.forEach((local) => {
      const locationName = screen.getByText(local.location);
      const locationImage = imagesPokemon.find((image) => image.src === local.map);

      expect(locationName).toBeInTheDocument();
      expect(locationImage).toBeInTheDocument();
      expect(locationImage.alt).toBe(`${pokemonName} location`);
    });
  });

  it('Testa se o usuário pode favoritar um Pokémon através da página de detalhes', () => {
    userEvent.click(moreDetails);

    const isFavorite = screen.getByRole('checkbox', { name: /pokémon favoritado?/i });
    userEvent.click(isFavorite);

    const iconFavorite = screen.queryByAltText(`${pokemonName} is marked as favorite`);
    expect(iconFavorite).toBeInTheDocument();

    userEvent.click(isFavorite);
    expect(iconFavorite).not.toBeInTheDocument();
  });
});
