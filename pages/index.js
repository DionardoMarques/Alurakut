//Importando toda biblioteca do React
import React from 'react';
//Importando a bibilioteca de cookies do Next.Js
import nookies from 'nookies';
//Importando a lib para decodificar o token JWT
import jwt from 'jsonwebtoken';
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
export default function Home(props) {
//Criando o componente para o usuário do github, dono do perfil. Mas pode ser reutilizado para outros perfis dentro da rede social.
const githubUser = props.githubUser;
//Hook que inteceptará o momento em que o react ta atuando na página
const [comunidades, setComunidades] = React.useState([]);
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
  //GET
  fetch('https://api.github.com/users/DionardoMarques/followers')
  .then(function(respostaDoServidor) {
    return respostaDoServidor.json();
  })
  .then(function(respostaCompleta) {
    setSeguidores(respostaCompleta);
  })


  //API GraphQL
  fetch('https://graphql.datocms.com/', {
    method: 'POST',
    headers: {
      'Authorization': '41d7fa2e89078f94239a8ef106b81c',
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ "query": `query {
      allCommunities {
        id
        title
        imageUrl
        creatorSlug
      }
    }` })
  })
  //Pega o retorno do response.json() e já retorna
  .then((response) => response.json())
  .then((respostaCompleta) => {
    const comunidadesVindasDoDato = respostaCompleta.data.allCommunities;
    console.log(comunidadesVindasDoDato)
    setComunidades(comunidadesVindasDoDato)
  })
  // .then(function (response) {
  //   return response.json()
  // })

}, [])

  console.log('seguidores antes do return', seguidores);
//Criar um box que vai ter um map, baseado nos items do array que pegamos do GitHub

  
  return (
  //Os fragments <> são espaços que englobam as tags HTML sem nenhum valor semântico. Ele não coloca no HTML final
  <>
    {/*Mostrando a foto de usuário do GitHub no menu sanduíche*/}
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
                title: dadosDoForm.get('title'),
                imageUrl: dadosDoForm.get('image'),
                creatorSlug: githubUser,
              }

              fetch('/api/comunidades', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(comunidade)
              })
              .then(async (response) => {
                const dados = await response.json();
                console.log(dados.registroCriado);
                const comunidade = dados.registroCriado;
                const comunidadesAtualizadas = [...comunidades, comunidade];
                setComunidades(comunidadesAtualizadas)
              })
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

            <button style={{ background: '#e402a2' }}>
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
            {/*Colocar antes do .map ".slice(0,6)" se quiser limitar para no máximo 6 itens dentro da box, senão estourará e as imagens sairão da box. Porém tem o overflow que cria a barra*/}
            {comunidades.map((itemAtual) => {
              return (
              <li key={itemAtual.id}>
                <a href={`/communities/${itemAtual.id}`}>
                  <img src={itemAtual.imageUrl} />
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
            {/*Colocar antes do .map ".slice(0,6)" se quiser limitar para no máximo 6 itens dentro da box, senão estourará e as imagens sairão da box. Porém tem o overflow que cria a barra*/}
            {pessoasFavoritas.map((itemAtual) => {
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

//Definindo o usuário de login para a página home via "props"
export async function getServerSideProps(context) {
  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN;
  const { isAuthenticated } = await fetch('http://localhost:3000/api/auth', {
    headers: {
        Authorization: token,
    }
})
.then((resposta) => resposta.json())

console.log('isAuthenticated', isAuthenticated);

if(!isAuthenticated) {
  return {
    redirect: {
      destination: '/login',
      permanent: false,
    }
  }
}

const { githubUser } = jwt.decode(token);
  return {
    props: {
      githubUser
    }, // will be passed to the page component as props
  }
}
