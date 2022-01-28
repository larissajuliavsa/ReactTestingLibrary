import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import About from '../components/About';

// realizei este requisito acompanhando a mentoria de revisão do Rod (summer)

describe('Teste o componente <About.js />', () => {
  // para cada teste it('', () => {}) renderizar o componente <About /> antes dos testes.
  beforeEach(() => {
    renderWithRouter(<About />);
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const titleAbout = screen.getByRole('heading', {
      level: 2,
      name: /about pokédex/i,
    });
    expect(titleAbout).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const paragraph = screen.getAllByText(/Pokémons/i);
    expect(paragraph).toHaveLength(2);

    // por toHaveLength() ser um array, devo fazer o teste utilizando forEach.
    paragraph.forEach((para) => {
      expect(para).toBeInTheDocument();
    });
  });

  it(' Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    const imgAbout = screen.getByAltText(/pokédex/i);
    expect(imgAbout).toBeInTheDocument();

    expect(imgAbout).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
    expect(imgAbout).toHaveAttribute('alt', 'Pokédex');
  });
});
