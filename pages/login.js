//Criando a página de login que terá o acesso via login e senha
//Criando a função que dará estrutura a pagina de login
import React from 'react';
//Importando o hook de rotas do next.js para disponibilizar o uso do sistema de roteamento do react.js
import { useRouter } from 'next/router';
//Importando os nookies para o Next.js
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import Head from 'next/head';

export default function LoginScreen(props) {
const [mensagem, setMensagem] = React.useState(false)
const router = useRouter();
const [githubUser, setGithubUser] = React.useState([]);

  return (
    <main style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', }}>
      <Head>
        <title>Alurakut</title>
        <link rel='icon' href='https://image.flaticon.com/icons/png/512/1251/1251835.png'></link>
      </Head>
      <div className="loginScreen"> 
        <section className="logoArea">
          <img src="https://alurakut.vercel.app/logo.svg" />

          <p><strong>Conecte-se</strong> aos seus amigos e familiares usando recados e mensagens instantâneas</p>
          <p><strong>Conheça</strong> novas pessoas através de amigos de seus amigos e comunidades</p>
          <p><strong>Compartilhe</strong> seus vídeos, fotos e paixões em um só lugar</p>
        </section>

        <section className="formArea">
          <form className="box" onSubmit={(infosDoEvento) => {
                infosDoEvento.preventDefault();
                // alert('Alguém clicou no botão!')
                console.log('Usuário: ', githubUser)
              if (infosDoEvento.target[0].value.length > 0) {
                fetch('https://alurakut.vercel.app/api/login', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ githubUser: githubUser })
              })
              .then(async (response) => {
                  const dadosResponse = await response.json()
                  const token = dadosResponse.token
                  nookies.set(null, 'USER_TOKEN', token, {
                    path: '/',
                    maxAge: 86400 * 7
                  })
                  router.push('/')
              })
              }
              setTimeout(() => {
                  setMensagem(true)
              }, 2500);
          }}>
            <p>
              Acesse agora mesmo com seu usuário do <strong style={{ color: "#10003f" }}>GitHub</strong>!
          </p>
          <h4 className='notFound'>
                            {
                                mensagem
                                    ? '*Usuário não encontrado! Favor verificar o valor que foi inserido.'
                                    : ''
                            }
                        </h4>
            <input 
                placeholder="Usuário" 
                onChange={(evento) => {
                    setGithubUser(evento.target.value)
                }} 
            />
            {/* Verificando uma condição pelo método do ternário*/}
            <p className='mensagemPreencher'>
              {githubUser.length === 0
                  ? <strong>*Este campo não pode estar vazio!</strong>
                  : ''
              }
            </p> 
            <button type="submit" style={{ background: '#e402a2' }}>
              Login
            </button>
          </form>

          <footer className="box">
            <p>
              Ainda não é membro? <br />
              <a href="/login">
                <strong style={{ color: '#e402a2' }}>
                  ENTRAR JÁ
              </strong>
              </a>
            </p>
          </footer>
        </section>

        <footer className="footerArea" style={{ background: '#10003f' }}>
          <p style={{ color: "white" }}>
            © 2021 alura.com.br - <a href="/" style={{ color: "white" }}>Sobre o Alurakut.br</a> - <a href="/" style={{ color: "white" }}>Centro de segurança</a> - <a href="/" style={{ color: "white" }}>Privacidade</a> - <a href="/" style={{ color: "white" }}>Termos</a> - <a href="/" style={{ color: "white" }}>Contato</a>
          </p>
        </footer>
      </div>
    </main>
  )
} 