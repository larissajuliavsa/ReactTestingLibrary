import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Teste o componente <PokemonDetails.js />', () => {
  const altImg = 'Pikachu location';
  const POKEMON__PIKACHU = '/pokemons/25';

  /*
    Para sempre renderizar no caminho '/pokemons/25', utilizei o history.push(POKEMON__PIKACHU) em cada teste
  */

  it('As informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });

    userEvent.click(moreDetails);
    history.push(POKEMON__PIKACHU);

    expect(
      screen.getByRole('heading', { name: /pikachu details/i }),
    ).toBeInTheDocument();
    expect(moreDetails).not.toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /summary/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /this intelligent Pokémon roasts hard berries with electricity/i,
      ),
    ).toBeInTheDocument();
  });

  it('Se existe na página as localizações do pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push(POKEMON__PIKACHU);

    expect(
      screen.getByRole('heading', { name: 'Game Locations of Pikachu' }),
    ).toBeInTheDocument();

    const pokemonLocation = screen.getAllByAltText(altImg);
    expect(pokemonLocation).toHaveLength(2);
    /*
      percebi que utilizando o getByRole('img') retornava todas as imagens da páginas, não só as de localização;
      como pokemonLocation retorna um array, pensei em utilizar os indexs para ser mais preciso.
    */

    expect(pokemonLocation[0]).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    );
    expect(pokemonLocation[0]).toHaveAttribute('alt', altImg);
    expect(pokemonLocation[0]).toBeInTheDocument();
    expect(screen.getByText(/kanto viridian forest/i)).toBeInTheDocument();

    expect(pokemonLocation[1]).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    );
    expect(pokemonLocation[1]).toHaveAttribute('alt', altImg);
    expect(pokemonLocation[1]).toBeInTheDocument();
    expect(screen.getByText(/kanto power plant/i)).toBeInTheDocument();
  });

  it('Se o usuário pode favoritar um pokémon através da página de detalhes.', () => {
    const { history } = renderWithRouter(<App />);
    history.push(POKEMON__PIKACHU);

    const checkbox = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });

    userEvent.click(checkbox);
    const pikachuStar = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(pikachuStar).toBeInTheDocument();

    userEvent.click(checkbox);
    expect(pikachuStar).not.toBeInTheDocument();

    expect(screen.getByLabelText('Pokémon favoritado?')).toBeInTheDocument();
  });
});
