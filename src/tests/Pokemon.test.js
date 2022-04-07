import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokemon.js />', () => {
  const POKEMON__PIKACHU = '/pokemons/25';

  it('É renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);

    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    expect(screen.getByTestId(/pokemon-name/i)).toHaveTextContent(/pikachu/i);

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Electric');

    expect(screen.getByText(/average weight: 6\.0 kg/i)).toBeInTheDocument();

    const pokemonImg = screen.getByAltText(/pikachu sprite/i);
    expect(pokemonImg).toBeInTheDocument();

    expect(pokemonImg).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    );
    expect(pokemonImg).toHaveAttribute('alt', 'Pikachu sprite');
  });

  it('O card do Pokémon contém um link para exibir +detalhes', () => {
    renderWithRouter(<App />);

    const pokemonDetails = screen.getByRole('link', { name: /more details/i });
    expect(pokemonDetails).toBeInTheDocument();
    expect(pokemonDetails).toHaveAttribute('href', POKEMON__PIKACHU);
  });

  it('Ao clicar no link, é feito o redirecionamento para a página de detalhes', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);

    const {
      location: { pathname },
    } = history;
    expect(pathname).toBe(POKEMON__PIKACHU);
  });

  it('Se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);

    history.push(POKEMON__PIKACHU);

    const checkbox = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    expect(checkbox).toBeInTheDocument();

    userEvent.click(checkbox);

    const pokemonFavorite = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(pokemonFavorite).toBeInTheDocument();

    expect(pokemonFavorite).toHaveAttribute('src', '/star-icon.svg');
    expect(pokemonFavorite).toHaveAttribute(
      'alt',
      'Pikachu is marked as favorite',
    );
  });
});
