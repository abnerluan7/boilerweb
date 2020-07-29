# Softo-Frontend-Web-Boilerplate

- [Dependências](#dependências)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Build e Deploy](#build-e-deploy)

## Dependências

Navegação - [react-router-dom](https://github.com/ReactTraining/react-router)<br />
Gerenciamento de Cache e Requisições - [react-query](https://github.com/tannerlinsley/react-query)<br />
Estilização - [styled-componentes](https://github.com/styled-components/styled-components)<br />
Validação de objetos - [yup](https://github.com/jquense/yup)<br />
Testes - [react-testing-library](https://github.com/testing-library/react-testing-library)<br />

## Estrutura de pastas

### Pages

Rotas da aplicação

```javascript
pages / index.js
Home.js
Admin.js
MyProfile.js
Dashboard.js
```

### Containers

Componentes principais renderizados pelas rotas

```javascript
containers / Home.js
Admin.js
Dashboard.js
// Containers com sub-páginas podem ser agrupados em pastas
MyProfile / index.js
MyProfile.js
Details.js
```

### Componentes

Componentes são separados por pastas, cada pasta contém o componente principal, testes e outras dependências como componentes menores estilizados com styled-components e funções

```javascript
components / header / index.js
Header.js
Header.test.js
feed / index.js
Feed.js
Feed.test.js
```

### Providers

Contextos globais ficam na pasta principal. Contextos específicos são separados por pastas

```javascript
providers / AuthProvider.js
```

### Hooks

```javascript
hooks / useFolders.js
useUsers.js
```

### Services

Um único arquivo de serviço por entidade

```javascript
services / authServices.js
productService.js
```

### Utils

Qualquer função que possa ser reutilizada

```javascript
utils / floatToCurrency.js
dateTimeParser.js
```

## Build e Deploy

Na pasta principal do projeto, é possível utilizar os seguintes comandos:

### `yarn install`

Instala as dependências do projeto.<br />

### `amplify init`

Configura as credenciais do amplify.<br />

### `amplify auth add`

Adiciona o pull de usuários, ver imagem fixada no canal dev-boilerplate<br />

### `yarn start`

Roda o app em modo de desenvolvimento.<br />
Abra [http://localhost:3000](http://localhost:3000) para visualizar no navegador.

### `yarn test`

Roda o test runner em modo interativo com watch mode ativo.<br />

### `yarn build:prod`

Builda o app para produção na pasta `build` utilizando o arquivo .env.production. Não gera sourcemaps
<br />

### `yarn build:test`

Builda o app com sourcemaps para teste na pasta `build` utilizando o arquivo .env.test <br />
