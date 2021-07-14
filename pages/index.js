//Importando o componente "MainGrid"
import MainGrid from '../src/components/MainGrid'
//Importando o componente "Box"
import Box from '../src/components/Box'
//Para voltar uma pasta utilizar o comando ../ e para prosseguir ./
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'


//Criando uma função apenas para a foto de perfil da barra lateral
//As propriedades que estão sendo passadas como parâmetro no componente "ProfileSidebar" foram puxadas do componente "githubUser". 
function ProfileSidebar(propriedades) {
  //console.log(propriedades) utilizado para visualizar na tela o comando;
  return (
    <Box>
      {/* As chaves {} são a parte do React, já as aspas `` são JavaScript */ }
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />

      <p>
        <a className="" href={`https://github.com/${propriedades.githubUser}`}>
          @{propriedades.githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

//Criando a página inicial
export default function Home() {
//Criando o componente para o usuário do github, dono do perfil. Mas pode ser reutilizado para outros perfis dentro da rede social.
const githubUser = 'dionardomarques';
//Criando o componente de pessoas favoritas da comunidade com um array
const pessoasFavoritas = [
  'juunegreiros',
  'omariosouto',
  'peas',
  'kristoferhub',
  'rafael99costa'
]
  
  return (
  //Os fragments <> são espaços que englobam as tags HTML sem nenhum valor semântico. Ele não coloca no HTML final
  <>
  <AlurakutMenu />
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
      </div>
      <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
            {/*O pessoasFavoritas.length faz a contagem do número de pessoas e mostra na tela*/}
            Pessoas da comunidade ({pessoasFavoritas.length})
          </h2>
          <ul>
            {/*O ".map entrará em cada item do array do componente "pessoasFavoritas" e vai modificar ele de alguma forma retornando um valor diferente*/}
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
