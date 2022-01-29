import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Teste o componente `<Pokedex.js />', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Teste se página contém um heading `h2` com o texto `Encountered pokémons`', () => {
    const titlePokedex = screen.getByRole('heading', {
      level: 2,
      name: /encountered pokémons/i,
    });
    expect(titlePokedex).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo quando o botão Próximo pokémon é clicado', () => {
    const arrayPokemons = [
      {
        id: 23,
        name: 'Ekans',
        type: 'Poison',
        averageWeight: {
          value: '6.9',
          measurementUnit: 'kg',
        },
        image: 'https://cdn2.bulbagarden.net/upload/1/18/Spr_5b_023.png',
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
      },
      {
        id: 10,
        name: 'Caterpie',
        type: 'Bug',
        averageWeight: {
          value: '2.9',
          measurementUnit: 'kg',
        },
        image: 'https://cdn2.bulbagarden.net/upload/8/83/Spr_5b_010.png',
      },
    ];

    const btnNextPokemon = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(btnNextPokemon).toBeInTheDocument();

    arrayPokemons.forEach(() => {
      userEvent.click(btnNextPokemon);
    });

    const pokemonEkans = screen.getByText(/Ekans/i);
    expect(pokemonEkans).toBeInTheDocument();
  });

  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    const pokemonId = screen.getAllByTestId('pokemon-name');
    expect(pokemonId).toHaveLength(1);
  });

  it('Teste se a Pokédex tem os botões de filtro.', () => {
    const arrayTypes = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];

    const btnAll = screen.getByRole('button', { name: /all/i });
    expect(btnAll).toBeInTheDocument();

    const QNTD = arrayTypes.length;
    expect(screen.getAllByTestId(/pokemon-type-button/i)).toHaveLength(QNTD);
  });

  it('O texto do botão deve corresponder ao Psychic, por exemplo', () => {
    const pokemonTypes = [
      {
        id: 10,
        name: 'Caterpie',
        type: 'Bug',
      },
      {
        id: 23,
        name: 'Ekans',
        type: 'Poison',
      },
      {
        id: 65,
        name: 'Alakazam',
        type: 'Psychic',
      },
      {
        id: 151,
        name: 'Mew',
        type: 'Psychic',
      },
    ];

    const btnPsychic = screen.getByRole('button', { name: /psychic/i });
    userEvent.click(btnPsychic);
    pokemonTypes.filter((pokemon) => pokemon.type === 'Psychic');
    pokemonTypes.forEach(() => {
      expect(screen.getByTestId(/pokemon-weight/i)).toHaveTextContent(
        /average weight/i,
      );
      userEvent.click(btnPsychic);
    });
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const btnAll = screen.getByRole('button', { name: /all/i });
    expect(btnAll).toBeInTheDocument();
    userEvent.click(btnAll);

    const pokemons = [
      {
        name: 'Pikachu',
        type: 'Electric',
      },
      {
        name: 'Charmander',
        type: 'Fire',
      },
      {
        name: 'Caterpie',
        type: 'Bug',
      },
      {
        name: 'Ekans',
        type: 'Poison',
      },
      {
        name: 'Alakazam',
        type: 'Psychic',
      },
      {
        name: 'Mew',
        type: 'Psychic',
      },
      {
        name: 'Rapidash',
        type: 'Fire',
      },
      {
        name: 'Snorlax',
        type: 'Normal',
      },
      {
        name: 'Dragonair',
        type: 'Dragon',
      },
    ];

    pokemons.forEach(() => {
      expect(screen.getByTestId(/pokemon-weight/i)).toHaveTextContent(
        /average weight/i,
      );
      userEvent.click(btnAll);
    });
  });
});
