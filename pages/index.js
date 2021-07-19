//Para voltar uma pasta utilizar o comando ../ e para prosseguir ./
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
//Importando o modelo de profile boxs
import { ProfileBoxs } from '../src/components/ProfileBoxs';
//Importando a os perfis da barra lateral
import { ProfileSidebar } from '../src/components/ProfileSidebar'
//Importando a lib Alurakutcommons
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
//Importando fragment do react
import { Fragment } from 'react';
//Importando head do next.js
import Head from 'next/head';

//Criando a página inicial
export default function Home(props) {

const [githubUser, setGithubUser] = React.useState([props.githubUser])

const [comunidades, setComunidades] = React.useState([])

const [seguindo, setSeguindo] = React.useState([])

const [seguidores, setSeguidores] = React.useState([])

const [inputTitle, setInputTitle] = React.useState()
const handleInputTitle = (e) => {
  setInputTitle(e.target.value)
  console.log(inputTitle)
}

const [inputImageURL, setImageURL] = React.useState()
const handleInputImageURL = (e) => {
  setImageURL(e.target.value)
}
//Pegar o array de dados do GitHub
React.useEffect(function () {
// GET
fetch(`https://api.github.com/users/${githubUser}/followers`)
  .then((respostaDoServidor) => respostaDoServidor.json())
  .then((respostaCompleta) => {
    setSeguidores(respostaCompleta)
  })

fetch(`https://api.github.com/users/${githubUser}/following`)
  .then((respostaDoServidor) => respostaDoServidor.json())
  .then((respostaCompleta) => {
    setSeguindo(respostaCompleta)
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
    // console.log(comunidadesVindasDoDato)
    setComunidades(comunidadesVindasDoDato)
  })
  // .then(function (response) {
  //   return response.json()
  // })

}, [])
//Criar um box que vai ter um map, baseado nos items do array que pegamos do GitHub

  
  return (
  //Os fragments <> são espaços que englobam as tags HTML sem nenhum valor semântico. Ele não coloca no HTML final
  <Fragment>
    <Head>
    <title>Alurakut</title>
    <link rel='icon' href='https://image.flaticon.com/icons/png/512/1251/1251835.png'></link>
    </Head>
    {/*Mostrando a foto de usuário do GitHub no menu sanduíche*/}
    <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        {/* <Box style="grid-area: profileArea;"> */ }
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          {/* Esse componente "ProfileSidebar recebe a propriedade "githubUser que recebe o valor "{githubUser}"*/}
          <ProfileSidebar githubUser={githubUser} as='aside' />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a), {props.githubUser}
            </h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">Inserir uma nova comunidade</h2>
            {/*O "onSubmit captura a ação de criar a comunidade*/}
            <form onSubmit={function handleCriaComunidade(e) {
                e.preventDefault();
                const dadosDoForm = new FormData(e.target);

                const comunidade = {
                  title: dadosDoForm.get('title'),
                  imageUrl: dadosDoForm.get('image'),
                  creatorSlug: props.githubUser
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
                  const comunidadesAtualizadas = [comunidade, ...comunidades]
                  setComunidades(comunidadesAtualizadas)
                })
              setInputTitle('')
              setImageURL('')
            }}>
              <div>
                <input
                onChange={handleInputTitle}
                placeholder="Qual vai ser o nome da sua comunidade?" 
                name="title"
                aria-label="Qual vai ser o nome da sua comunidade?"
                type="text"
                value={inputTitle}
                />
              </div>
              <div>
                <input
                onChange={handleInputImageURL}
                placeholder="Coloque uma URL para usarmos de capa" 
                name="image"
                aria-label="Coloque uma URL para usarmos de capa"
                value={inputImageURL}
                />
              </div>

              <button style={{ background: '#e402a2' }}>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileBoxs title={'Seguidores'} array={seguidores} setGithubUser={setGithubUser} />
          <ProfileBoxs title={'Seguindo'} array={seguindo} setGithubUser={setGithubUser} />
          <ProfileBoxs title={'Comunidades'} array={comunidades} />
        </div>
      </MainGrid>
    </Fragment>
  )
}

//Definindo o usuário de login para a página home via "props"
export async function getServerSideProps(context) {
  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN;
  const { isAuthenticated } = await fetch('https://alurakut-dionardomarques.vercel.app/api/auth', {
    headers: {
        Authorization: token,
    }
})
.then((resposta) => resposta.json())

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