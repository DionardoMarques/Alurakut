//Importando toda biblioteca do React
import React from 'react';
//Importando o componente "MainGrid"
import MainGrid from '../src/components/MainGrid'
//Importando o componente "Box"
import Box from '../src/components/Box'
//Para voltar uma pasta utilizar o comando ../ e para prosseguir ./
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';


//Criando uma função apenas para a foto de perfil da barra lateral
//As propriedades que estão sendo passadas como parâmetro no componente "ProfileSidebar" foram puxadas do componente "githubUser". 
function ProfileSidebar(propriedades) {
  //console.log(propriedades) utilizado para visualizar na tela o comando;
  return (
    <Box as="aside">
      {/* As chaves {} são a parte do React, já as aspas `` são JavaScript */ }
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
          @{propriedades.githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsBox(propriedades) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {/*O seguidores.length faz a contagem do número de pessoas e mostra na tela*/}
        {propriedades.title} ({propriedades.items.length})
      </h2>
      <ul>
        {/*O ".map entrará em cada item do array do componente "pessoasFavoritas" e vai modificar ele de alguma forma retornando um valor diferente*/}
        {/* {seguidores.slice(0,6).map((itemAtual) => {
          return (
          <li key={itemAtual}>
            <a href={`https://github.com/${itemAtual.png}`}>
              <img src={itemAtual.image} />
              <span>{itemAtual.title}</span>
            </a>
          </li>
          )
        })} */}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

//Criando a página inicial
export default function Home() {
//Criando o componente para o usuário do github, dono do perfil. Mas pode ser reutilizado para outros perfis dentro da rede social.
const githubUser = 'dionardomarques';
//Hook que inteceptará o momento em que o react ta atuando na página
const [comunidades, setComunidades] = React.useState([{
  id: '1231321241241414124214214412412',
  title: 'Eu odeio acordar cedo',
  image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
}]);
// const comunidades = comunidades[0];
// const alteradorDeComunidades/setComunidades = comunidades[1];
//Criando o componente de comunidades com um array
// const comunidades = ['Alurakut'];
//Criando o componente de pessoas favoritas da comunidade com um array
const pessoasFavoritas = [
  'omariosouto',
  'juunegreiros',
  'peas',
  'kristoferhub',
  'rafael99costa',
  'filipedeschamps',
]


const [seguidores, setSeguidores] = React.useState([]);
//Pegar o array de dados do GitHub
React.useEffect(function() {
  fetch('https://api.github.com/users/DionardoMarques/followers')
  .then(function(respostaDoServidor) {
    return respostaDoServidor.json();
  })
  .then(function(respostaCompleta) {
    setSeguidores(respostaCompleta);
  })
}, [])

  console.log('seguidores antes do return', seguidores);
//Criar um box que vai ter um map, baseado nos items do array que pegamos do GitHub

  
  return (
  //Os fragments <> são espaços que englobam as tags HTML sem nenhum valor semântico. Ele não coloca no HTML final
  <>
    <AlurakutMenu githubUser={githubUser} />
    <MainGrid>
      {/* <Box style="grid-area: profileArea;"> */ }
      <div className="profileArea" style={{ gridArea: 'profileArea' }}>
        {/* Esse componente "ProfileSidebar recebe a propriedade "githubUser que recebe o valor "{githubUser}"*/}
        <ProfileSidebar githubUser={githubUser} />
      </div>
      <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
        <Box>
          <h1 className="title">
            Bem vindo(a)
          </h1>

          <OrkutNostalgicIconSet />
        </Box>

        <Box>
          <h2 className="subTitle">O que você deseja fazer?</h2>
          {/*O "onSubmit captura a ação de criar a comunidade*/}
          <form onSubmit={function handleCriaComunidade(e) {
              e.preventDefault();
              const dadosDoForm = new FormData(e.target);

              console.log('Campo: ', dadosDoForm.get('title'));
              console.log('Campo: ', dadosDoForm.get('image'));

              const comunidade = {
                id: new Date().toISOString(),
                title: dadosDoForm.get('title'),
                image: dadosDoForm.get('image'),
              }
              const comunidadesAtualizadas = [...comunidades, comunidade];
              setComunidades(comunidadesAtualizadas)
          }}>
            <div>
              <input 
              placeholder="Qual vai ser o nome da sua comunidade?" 
              name="title"
              aria-label="Qual vai ser o nome da sua comunidade?"
              type="text"
              />
            </div>
            <div>
              <input 
              placeholder="Coloque uma URL para usarmos de capa" 
              name="image"
              aria-label="Coloque uma URL para usarmos de capa"
              />
            </div>

            <button>
              Criar comunidade
            </button>
          </form>
        </Box>
      </div>
      <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
        <ProfileRelationsBox title="Seguidores" items={seguidores} />
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
            {/*O comunidades.length faz a contagem do número de pessoas e mostra na tela*/}
            Comunidades ({comunidades.length})
          </h2>
          <ul>
            {/*O ".map entrará em cada item do array do componente "pessoasFavoritas" e vai modificar ele de alguma forma retornando um valor diferente*/}
            {comunidades.slice(0,6).map((itemAtual) => {
              return (
              <li key={itemAtual.id}>
                <a href={`/users/${itemAtual.title}`}>
                  <img src={itemAtual.image} />
                  <span>{itemAtual.title}</span>
                </a>
              </li>
              )
            })}
          </ul>
        </ProfileRelationsBoxWrapper>
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
            {/*O pessoasFavoritas.length faz a contagem do número de pessoas e mostra na tela*/}
            Pessoas da comunidade ({pessoasFavoritas.length})
          </h2>
          <ul>
            {/*O ".map entrará em cada item do array do componente "pessoasFavoritas" e vai modificar ele de alguma forma retornando um valor diferente*/}
            {pessoasFavoritas.slice(0,6).map((itemAtual) => {
              return (
              <li key={itemAtual}>
                <a href={`/users/${itemAtual}`}>
                  <img src={`https://github.com/${itemAtual}.png`} />
                  <span>{itemAtual}</span>
                </a>
              </li>
              )
            })}
          </ul>
        </ProfileRelationsBoxWrapper>
      </div>
    </MainGrid>
  </>
  )
}
