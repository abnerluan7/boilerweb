[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
[![Cypress.io](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)](https://www.cypress.io/)
# SOFTO FRONTEND BOILERPLATE

## Descrição
Este boilerplate tem como objetivo ser o ponto de partida para todos os projetos frontend desenvolvidos pela Softo, definindo alguns padrões arquiteturais visando a escabilidade e manutenibilidade do código.
---
&nbsp;
## Índice
1. [Organização de pastas](#pastas)
2. [Aspectos importantes](#aspectos-importantes)
3. [Tecnologias utilizadas](#tecnologias)
4. [Iniciando o projeto](#iniciando-projeto)
5. [Criando rotas](#rotas)
6. [Criando módulos](#modulos)
7. [Criando serviços](#criando-servicos)
8. [Implementando serviços](#implementando-serviços)
9.  [Testando a aplicação](#testes)
10. [O que esperar para o futuro](#roadmap)
11. [Dúvidas e sugestões](#duvidas-sugestoes)

---
&nbsp;

## <div id='pastas'/>
## Organizaçao de pastas 
```
 ┣ 📂src
 ┃ ┣ 📂application
 ┃ ┃ ┣ 📂protocols
 ┃ ┃ ┣ 📂services
 ┃ ┃ ┗ 📂tests
 ┃ ┣ 📂domain
 ┃ ┃ ┣ 📂common
 ┃ ┃ ┃ ┣ 📂exceptions
 ┃ ┃ ┃ ┗ 📂utils
 ┃ ┃ ┣ 📂models
 ┃ ┃ ┣ 📂modules
 ┃ ┃ ┣ 📂services
 ┃ ┃ ┗ 📂tests
 ┃ ┣ 📂infra
 ┃ ┃ ┣ 📂cache
 ┃ ┃ ┣ 📂http
 ┃ ┃ ┗ 📂tests
 ┃ ┣ 📂main
 ┃ ┃ ┣ 📂adapters
 ┃ ┃ ┣ 📂config
 ┃ ┃ ┣ 📂factories
 ┃ ┃ ┃ ┣ 📂caches
 ┃ ┃ ┃ ┣ 📂http
 ┃ ┃ ┃ ┣ 📂layouts
 ┃ ┃ ┃ ┣ 📂pages
 ┃ ┃ ┃ ┣ 📂providers
 ┃ ┃ ┃ ┣ 📂routes
 ┃ ┃ ┃ ┗ 📂services
 ┃ ┃ ┣ 📂routes
 ┃ ┃ ┣ 📂test
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂presentation
 ┃ ┃ ┣ 📂common
 ┃ ┃ ┃ ┣ 📂constants
 ┃ ┃ ┃ ┗ 📂types
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┣ 📂contexts
 ┃ ┃ ┣ 📂hooks
 ┃ ┃ ┣ 📂layout
 ┃ ┃ ┃ ┣ 📂basic-layout
 ┃ ┃ ┣ 📂pages
 ┃ ┃ ┃ ┣ 📂login
 ┃ ┃ ┣ 📂providers
 ┃ ┃ ┣ 📂styles
 ┃ ┃ ┃ ┣ 📂themes
 ┃ ┃ ┗ 📂tests
 ┃ ┗ 📂validation
 ┃ ┃ ┣ 📂errors
 ┃ ┃ ┣ 📂protocols
 ┃ ┃ ┣ 📂test
 ┃ ┃ ┗ 📂validators
 ┣ 📜.editorconfig
 ┣ 📜.eslintrc.json
 ┣ 📜.gitignore
 ┣ 📜.huskyrc.json
 ┣ 📜.lintstagedrc.json
 ┣ 📜README.md
 ┣ 📜cypress.json
 ┣ 📜jest.config.js
 ┣ 📜package.json
 ┣ 📜template.dev.html
 ┣ 📜template.prod.html
 ┣ 📜tsconfig-eslint.json
 ┣ 📜tsconfig.json
 ┣ 📜webpack.common.js
 ┣ 📜webpack.dev.js
 ┣ 📜webpack.prod.js
 ┗ 📜yarn.lock
```
---
&nbsp;
## <div id='aspectos-importantes'/>
## Aspectos importantes
Seguindo o conceito de Clean Architecture e DDD, a arquitetura foi pensada de forma que haja desacoplamento entre as camadas da aplicação, sendo as necessário respeitar alguns limites entre as camadas para manter a estrutura coesa e escalável.
&nbsp;

***Componentes de alto nível não podem depender de componentes de baixo nível.***
&nbsp;

Para ser mais objetivo, levando este boilerplate como exemplo, as regras a seguir ***DEVEM SER RESPEITADAS***.
&nbsp;

* O `domain` é a camada de mais alto nível, não sendo permitido que ela dependa de nenhum módulo, classe ou função das demais camadas.
* A `data` layer é a camada onde há implementações dos `services` e `modules` do `domain`, podendo ter como dependência somente módulos, classes e funçÕes do `domain`.
* A `infra` layer é a camada para integração de bibliotecas externas com as interfaces e protocolos definidos no `domain` e no `data` layer. Aqui serão feitas as implementações, por exemplo, do HttpClient que será responsável pelas requisições na aplicação.
* A `presentation` é a camada responsável pela renderização da `view` para o usuário, sendo que sua dependência direta são os `services` disponíveis dentro do `domain`.
* Dentro do `presentation`, em vários casos, é necessário utilizar bibliotecas de terceiros para, por exemplo, formatação de datas, validação de campos, armazenamento de estado etc. É extremanete importante ***ABSTRAIR TODA A LÓGICA EM PROTOCOLOS*** e implementar este protocolo em sua camada específica, fazendo posteriormente a injeção de dependência no `presentation`, dentro dos módulos, páginas ou providers disponíveis.
* Para poder ter essa estrutura desacoplada, precisamos fazer a composição de tudo e, para isso, a `main` layer é sacrificada para realizar essa função. Dentro desta camada estarão todos os arquivos de configurações de rotas, decorators, factories, adapters, dentre outros métodos necessários para fazer a montagem correta de todas as camadas sem quebrar os princípios do ***SOLID e Clean Architecture***.
---
&nbsp;
## <div id='tecnologias'/>
## Tecnologias utilizadas
- [Typescript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [Axios](https://github.com/axios/axios)
- [Material-UI](https://material-ui.com/)
- [Jest](https://jestjs.io/)
- [Cypress](https://www.cypress.io/)
- [Faker.js](https://github.com/marak/Faker.js/)
- [Husky](https://github.com/typicode/husky)
- [Lint-Staged](https://github.com/okonet/lint-staged)
- [Webpack](https://webpack.js.org/)
- [React Icons](https://react-icons.github.io/react-icons/)

---
&nbsp;
## <div id='iniciando-projeto'/>
## Iniciando o projeto
~~~bash
## Clonar repositório
git clone https://github.com/SoftoDev/Softo-Frontend-Web-Boilerplate.git

## Instalar dependências
yarn

## Iniciar dev-server
yarn dev
~~~
---
&nbsp;
## <div id='rotas'/>
## Criando rotas
A criação de rotas está concentrada em um arquivo de configuração dentro do arquivo `src/main/config/routes-config.tsx`, possuindo a seguinte estrutura modelo:

~~~typescript
export const RouteConfig = {
  login: {
    path: '/',
    title: 'Login',
    private: false,
    component: lazy(async () =>
      import('~/main/factories/pages/login-page/login-page-factory')
    ),
    layout: 'DefaultLayout'
  }
}
~~~

O arquivo é auto-explicativo. Cada rota deve ser criada em uma nova key, informando obrigatoriamente todos os atributos, seguindo a tipagem a seguir:

~~~typescript
  [key: string]: {
    path: string
    title: string
    private: boolean
    component: React.LazyExoticComponent<React.FC<{}>>
    layout: string
  }
~~~

***IMPORTANTE***
&nbsp;

Não deve-se importar diretamente as páginas localizadas na `presentation` layer. Deve-se criar um factory desta página, dentro de `src/main/factories/pages`, seguindo modelo abaixo como exemplo:
~~~tsx
import React from 'react'
import { LoginPage } from '~/presentation/pages'
import { makeLoginValidation } from './login-page-validation-factory'

const makeLoginPage: React.FC = () => (
  <LoginPage validation={makeLoginValidation()} />
)

export default makeLoginPage
~~~

Este factory deve ser importado no arquivo de configuração utilizando `React.lazy`. Feito isso, esta rota estará automaticamente implementada na aplicação e disponível para acesso.

---
&nbsp;
## <div id='modulos'/>
## Criando módulos
Módulos são utilizados como uma forma de organização de áreas correlacionadas dentro do sistema. Eles devem ser criados dentro do `domain` e são somente namespaces que mantém interfaces, tipos, constantes e enums para utilização sistema afora. Abaixo, exemplo do módulo de `Autenticação`:
~~~typescript
import { Response, TokenModel } from '~/domain/models'

export namespace Authentication {
  export enum Provider {
    google = 'Google',
    facebook = 'Facebook',
    email = 'Email'
  }

  export type Model = Response<TokenModel>

  export type EmailParams = {
    email: string
    password: string
  }
}
~~~
Basicamente, são armazenadas informações gerais relacionadas à autenticação, como o `model` de resposta de toda autenticação, os parâmetros para os métodos que utilizam e-mail para autenticar e os provedores de autenticação disponíveis. Não há uma definição clara do que pode ou não ser colocado aqui, porém, a ideia é que se utilize os `modules` de forma consciente, mantendo uma abstração alta e nenhum relacionamento com camadas externas ao `domain`.

---
&nbsp;
## <div id='criando-servicos'/>
## Criando serviços
Neste projeto, serviços são considerados ações (normalmente envolvendo requisições HTTP) e sua interface deve ser definida dentro do `domain`. Abaixo, exemplo de interface de autenticação por e-mail:
~~~typescript
import { Authentication } from '~/domain/modules'

export interface EmailAuthentication {
  auth: (params: Authentication.EmailParams) => Promise<Authentication.Model>
}
~~~
Como podemos ver, é definida uma inteface básica com o(s) método(s) e atributo(s) para implementação. Aqui, não é o momento de definir como este serviço será consumido, se por `requisição HTTP`, `Firebase`, `Cognito` ou de qualquer outra forma. Neste momento, estamos definindo uma regra de negócio, uma ação que precisamos realizar para conseguir atender os requisitos do sistema.
&nbsp;

É importante manter alguns padrões neste momento, tentando manter a interface coesa e não violando o SRP (`Single Responsability Principle`). ***Lembre-se, uma interface com muitos métodos e responsabilidades dificulta a elaboração de testes e aumenta o risco de bugs no sistema.***

---
&nbsp;
## <div id='implementando-servicos'/>
## Implementando serviços
Com a interface criada, é hora de fazer a implementação deste serviço. Essa responsabilidade fica a cargo da `data` layer, onde uma classe será criada para realizar esta implementação. A seguir, exemplo da interface criada na etapa anterior:
~~~typescript
import { error, success } from '~/domain/common/utils'
import { TokenModel } from '~/domain/models'
import { Authentication } from '~/domain/modules'
import { EmailAuthentication } from '~/domain/services'
import { HttpClient } from '~/application/protocols/http'
import { RequestResponse } from '~/application/protocols/http/request-response'

export class RemoteEmailAuthentication implements EmailAuthentication {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteEmailAuthentication.Model>
  ) {}

  async auth (
    params: Authentication.EmailParams
  ): Promise<Authentication.Model> {
    const httpResponse = await this.httpClient.request({
      method: 'post',
      url: this.url,
      body: params
    })

    const tokenOrError = RequestResponse.handle<TokenModel>(httpResponse)

    if (tokenOrError.isError()) {
      return error(tokenOrError.value)
    }

    return success(tokenOrError.value.response)
  }
}

export namespace RemoteEmailAuthentication {
  export type Model = TokenModel
}
~~~
Como é visível pelas importações, este método depende apenas de interfaces do `domain` e do `data` layer. Esta classe recebe dois parâmetros em seu método construtor - uma `url` e um `httpClient` - que serão injetados posteriormente através de um factory na `main` layer.
&nbsp;

A implementação do método `auth` é feito conforme a assinatura da interface, recebendo os mesmos parâmetros e retornando o mesmo modelo. Dentro do método, podemos separar em duas etapas:
  1. Requisição http
  2. Tratamento da resposta

Para a primeira etapa, é utilizado a `url` e o `httpClient` injetados, repassando os parâmetros necessários para realizar corretamente o request.
&nbsp;

Na segunda etapa, é utilizado um método estático da classe `RequestResponse`, que possui a seguinte estrutura:
~~~typescript
import {
  AccessDeniedError,
  InvalidCredentialsError,
  UnexpectedError
} from '~/domain/common/exceptions'
import {
  CombinedPredicated,
  combinedPredicates,
  error,
  success
} from '~/domain/common/utils'
import { Response, ResponseError } from '~/domain/models'
import { HttpResponse, HttpStatusCode } from '~/application/protocols/http'

export class RequestResponse<R> {
  private constructor (private readonly _response: R) {
    Object.freeze(this)
  }

  public static handle<R> (
    httpResponse: HttpResponse<R>
  ): Response<RequestResponse<R>> {
    const { statusCode } = httpResponse

    if (this.isSuccess(statusCode)) {
      return success(new RequestResponse(httpResponse.body))
    }

    const predicates: CombinedPredicated<HttpStatusCode, ResponseError> = [
      [this.isForbidden, new AccessDeniedError()],
      [this.isUnauthorized, new InvalidCredentialsError()]
    ]

    const errors = combinedPredicates({
      value: statusCode,
      predicatePairs: predicates
    })

    if (errors.isError()) {
      return error(errors.value)
    }

    return error(new UnexpectedError())
  }

  private static isSuccess (statusCode: HttpStatusCode): boolean {
    return statusCode >= 200 && statusCode <= 299
  }

  private static isForbidden (statusCode: HttpStatusCode): boolean {
    return statusCode === HttpStatusCode.forbidden
  }

  private static isUnauthorized (statusCode: HttpStatusCode): boolean {
    return statusCode === HttpStatusCode.unauthorized
  }

  get response (): R {
    return this._response
  }
}
~~~
O que está classe faz, basicamente, é tratar os possíveis retornos da `requisição http`, utilizando um pattern chamado `Either`. Este pattern é genérico, responsável por verificar se há erros no retorno, de acordo com os `predicates` passados, retornando um objeto com 2 métodos e 1 atributo, sendo eles `isError`, `isSuccess` e `value`, que contém o valor tratado. O retorno é feito através dos métodos `error` ou `success`, de acordo com o `status code` da requisição.
&nbsp;

Após o tratamento do `HttpResponse`, teremos um objeto - neste caso `tokenOrError` que possuirá os mesmos 2 métodos e 1 atributo citados acima - `isError`, `isSuccess` e `value` -  sendo feito um `if` para validar se `isError() === true`, retornando o erro se positivo ou retornando a resposta da requisição se não houver erros.

***RECOMENDACÃO DE LEITURA***
* [The Either data type as an alternative to throwing exceptions](https://www.thoughtworks.com/insights/blog/either-data-type-alternative-throwing-exceptions)
* [Data Validation in Typescript Using the Either Pattern](https://dev.to/polyov_dev/data-validation-in-typescript-using-the-either-pattern-4omk)
* [Pattern matching and type safety in TypeScript](https://blog.logrocket.com/pattern-matching-and-type-safety-in-typescript-1da1231a2e34/)


---
&nbsp;
## <div id='testes'/>
## Testando a aplicação
O projeto possui alguns scripts para teste da aplicação para serem utilizados em diferentes situações.
~~~json
    "test": "jest --passWithNoTests --no-cache --runInBand --detectOpenHandles",
    "test:watch": "yarn test --watch",
    "test:staged": "yarn test --findRelatedTests",
    "test:ci": "yarn test --coverage",
    "test:cypress": "cypress open",
    "test:cypress:ci": "start-server-and-test dev:base http-get://localhost:3000 cypress run",
~~~
Resumidamente, o `test` é a base dos demais testes unitários (`test:watch`, `test:staged`, `test:ci`). Durante desenvolvimento, o script `test:watch` é o recomendado para acompanhar em tempo real a mudança dos testes a medida que são escritos. Já o `test:staged` é rodado automaticamente cada vez que um commit é realizado. Finalizando os scripts de testes unitários, `test:ci` é executado antes de cada push para o repositório, gerando um relatório de coverage do projeto.
&nbsp;

Avançando para os testes end-to-end, o `Cypress` é utilizado para fazer essa tarefa. Como padrão, durante o desenvolvimento é utilizado o comando `test:cypress`, que abrirá uma nova tela que atualizará automaticamente em cada mudança nos testes. O script `test:cypress:ci` é executado antes de cada push para o repositório, abrindo um navegador headless para executar todos os testes.


---
&nbsp;
## <div id='roadmap'/>
## O que esperar para o futuro
O projeto estará em constante atualização, sendo adicionada novas features periodicamente. Estas features serão adicionadas dentro de uma pasta `/examples` na raiz do projeto, com seu próprio README e estrutura de pastas facilitar a inclusão dela em projetos em andamento.
Abaixo, algumas que estarão disponíveis em breve:
* Autenticação por Facebook
* Autenticação por Google
* Autenticação com Cognito
* Autenticação com Firebase
* Upload de arquivos com Amazon S3
* Nova camada de abstração para tratamento de datas
* Interceptor para atualização de refresh token
* Internacionalização
* Melhorias na documentação em geral.

---
&nbsp;
## <div id='duvidas-sugestoes'/>
## Dúvidas e sugestões
Qualquer dúvida que tenha, utilize o canal específico no Slack da Softo, descrevendo qual a feature necessita de ajuda e, se possível, demonstrando um exemplo concreto.
&nbsp;

Sugestões são muito bem-vindas e incentivadas, sendo essencial para manter o boilerplate sempre atualizado. Fez uma nova feature em seu sistema que pode ser utilizado por outros? Abra uma issue com a sugestão para iniciar uma discussão entre toda a equipe, mostrar o que você fez e como pode ser útil para todos.
