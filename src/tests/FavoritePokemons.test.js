import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it('Teste se `No favorite pokemon found` caso não tiver pokémons favoritos.', () => {
    renderWithRouter(<FavoritePokemons />);

    const getFavorites = screen.queryByText(/average weight/i);
    expect(getFavorites).toBeNull();

    const msgNotFound = screen.queryByText(/no favorite/i);
    expect(msgNotFound).toBeInTheDocument();
  });

  // Fiz este requisito com a dica do Moisés na mentoria
  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const arrayPokemons = [
      {
        id: 25,
        name: 'Pikachu',
        type: 'Electric',
        averageWeight: {
          value: '6.0',
          measurementUnit: 'kg',
        },
        image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
        moreInfo:
          'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
        foundAt: [
          {
            location: 'Kanto Viridian Forest',
            map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
          },
          {
            location: 'Kanto Power Plant',
            map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
          },
        ],
      },
      {
        id: 4,
        name: 'Charmander',
        type: 'Fire',
        averageWeight: {
          value: '8.5',
          measurementUnit: 'kg',
        },
        image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
        moreInfo:
          'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
        foundAt: [
          {
            location: 'Alola Route 3',
            map: 'https://cdn2.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png',
          },
          {
            location: 'Kanto Route 3',
            map: 'https://cdn2.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png',
          },
          {
            location: 'Kanto Route 4',
            map: 'https://cdn2.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png',
          },
          {
            location: 'Kanto Rock Tunnel',
            map: 'https://cdn2.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png',
          },
        ],
      },
    ];

    renderWithRouter(<FavoritePokemons pokemons={ arrayPokemons } />);

    const title = screen.getByRole('heading', {
      level: 2,
      name: /favorite pokémons/i,
    });
    expect(title).toBeInTheDocument();

    arrayPokemons.forEach((card) => {
      const pokemonName = screen.getByText(card.name);
      expect(pokemonName).toBeInTheDocument();
    });
  });
});
