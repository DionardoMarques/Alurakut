// import '../styles/globals.css'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { AlurakutStyles } from '../src/lib/AlurakutCommons'


const GlobalStyle = createGlobalStyle`
  /*Reset CSS*/
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: sans-serif;
    background-color: #D9E6F6;
    //Capa de fundo com imagem responsiva
    background-image: url("/capa_fundo_alurakut.png");
    //o valor cover especifica que a imagem de fundo deve ser dimensionada de acordo com o recipiente, assegurando que ambas as dimensões (altura e largura) são são maiores ou iguais ao container
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
  }

  #__next {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  //reset imagens para deixar qualquer tag "<img>" responsiva
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  ${AlurakutStyles}
`

const theme = {
  colors: {
    primary: 'red',
  },
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}