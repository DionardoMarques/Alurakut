//Importando a biblioteca do styled components
import styled from 'styled-components';

//Todo componente deve ser nomeado com a letra maiúscula, pois não é uma tag
//Os componentes criados através do comando "const" são novas tags do HTML que poderão ser usadas dentro do "return"
//A crase ` sempre indica o início do código CSS e consequentemente o fim dele

const MainGrid = styled.main`
  width: 100%;
  grid-gap: 10px;
  margin-left: auto;
  margin-right: auto;
  max-width: 500px;
  padding: 16px;
  .profileArea {
    display: none;
    @media(min-width: 860px) {
      display: block;
    }
  }
  @media(min-width: 860px) {
    max-width: 1110px;
    display: grid;
    grid-template-areas: "profileArea welcomeArea profileRelationsArea";
    grid-template-columns: 160px 1fr 312px;
  }
`;

//Exportando o componente "MainGrid" para importar em outros arquivos e poder utilizá-lo
export default MainGrid