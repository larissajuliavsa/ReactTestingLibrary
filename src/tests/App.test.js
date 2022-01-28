import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Teste o componente <App.js />', () => {
  it('O primeiro link deve possuir o texto Home', () => {
    const { history } = renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: /home/i });
    expect(linkHome).toBeInTheDocument();

    userEvent.click(linkHome);

    const {
      location: { pathname },
    } = history;
    expect(pathname).toBe('/');

    const titleHome = screen.getByRole('heading', {
      level: 2,
      name: /encountered/i,
    });
    expect(titleHome).toBeInTheDocument();
  });

  it('O segundo link deve possuir o texto About', () => {
    const { history } = renderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', { name: /about/i });
    expect(linkAbout).toBeInTheDocument();

    userEvent.click(linkAbout);

    const {
      location: { pathname },
    } = history;
    expect(pathname).toBe('/about');

    const titleAbout = screen.getByRole('heading', {
      level: 2,
      name: /about pokédex/i,
    });
    expect(titleAbout).toBeInTheDocument();
  });

  it('O terceiro link deve possuir o texto Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);

    const linkFavorites = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(linkFavorites).toBeInTheDocument();

    userEvent.click(linkFavorites);

    const {
      location: { pathname },
    } = history;
    expect(pathname).toBe('/favorites');

    const titleFavorites = screen.getByRole('heading', {
      level: 2,
      name: /favorite pokémons/i,
    });
    expect(titleFavorites).toBeInTheDocument();
  });
});
