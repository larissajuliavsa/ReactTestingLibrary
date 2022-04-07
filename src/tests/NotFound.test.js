import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Teste o componente <NotFound.js />', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    history.push('/doesntexist');
  });

  it('Teste se página contém um heading h2 com o texto Page requested NotFound 😭', () => {
    const titleNotFound = screen.getByRole('heading', {
      level: 2,
      name: /page requested not found/i,
    });
    expect(titleNotFound).toBeInTheDocument();
  });

  it('Teste se página mostra a imagem', () => {
    const imgNotFound = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(imgNotFound).toHaveAttribute(
      'src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    );
    expect(imgNotFound).toBeInTheDocument();
  });
});
