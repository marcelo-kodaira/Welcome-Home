# Welcome Home


# Endpoints
| Método | Endpoint | Responsabilidade |
| --- | --- | --- |
| POST | /users | Criação de usuário |
| GET | /users | Lista todos os usuários |
| PATCH | /users | Atualiza um usuário |
| DELETE | /users/<id> | Realiza um soft delete no usuário |
| POST | /login | Gera o token de autenticação |
| POST | /categories | Criação de categoria |
| GET | /categories/<id>/properties | Lista todos imóveis que pertencem a uma categoria |
| POST | /properties | Criação de um imóvel |
| GET | /properties | Lista todos os imóveis |
| POST | /schedules | Agenda uma visita a um imóvel |
| GET | /schedules/properties/<id> | lista todos os agendamentos de um imóvel |

# Requisições e retornos

### POST - /users
Rota para criação de usuário com os seguintes dados:
- name: string
- email: string
- password: Deverá receber uma string mas armazenar uma hash gerada com o bcrypt
- isAdm: boolean
- isActive: Gerado no momento da validação dos dados no formato boolean com default = true
- createdAt: Gerado no momento da validação dos dados no formato Date
- updatedAt: Gerado no momento da validação dos dados no formato Date
- id: uuidv4.

A rota de criação retorna todos os dados, com exceção da hash de senha.
Não podem ser cadastrados dois usuário com o mesmo e-mail.

## GET - /users
A rota deve retorna todos os dados dos usuários, com exceção da hash de senha.
a rota pode ser acessada apenas por administradores.

## PATCH - /users/<id>
Não é possível atualizar os campos id, isAdm e isActive.
Apenas administradores podem atualizar qualquer usuário, usuários não-administradores podem apenas atualizar seu próprio usuário.

## DELETE - /users/<id>
A rota realiza um soft delete do usuário, alterando isActive para false.
A rota pode ser acessada apenas por administradores.
Não é possível realizar um soft delete de um usuário inativo.

## POST - /login
Rota de login recebendo email e password
O login valida se o usuário existe e valida se a senha está correta.

## POST - /categories
Rota para criação de categorias com os seguintes dados:
- name: string
- id: Não deve ser passado mas gerado no momento da validação dos dados, deve um uuidv4.
Não podem ser cadastradas duas categorias com o mesmo nome.
A rota pode ser acessada apenas por administradores.

## GET - /categories
Rota lista todas as categorias.
A rota não precisa de autenticação para ser acessada.

## GET - /categories/<id>
Rota lista todos os agendamentos de um imóvel.
A rota pode ser acessada apenas por administradores.

# Instalação
Para inciar este projeto, é necessário instalar as dependências, que serão utilizadas nos testes. Portanto utilize o comando abaixo para instalar tais dependências:

````
yarn install
````


**Atenção:** é necessário utilizar o `yarn` pois esse projeto foi iniciado com esse gerenciador de pacotes.

Para verificar se já possui o gerenciador yarn instalado utilize o seguinte comando:

````
yarn --version
````

Caso não possua o yarn instalado, utilize o comando abaixo para instalar globalmente na sua máquina:

````
npm install --global yarn
````
<br>


Essa entrega já está com o Docker configurado, basta preencher as variáveis de ambiente no .env

Basta buildar e subir nossos containers usando o comando padrão:
````
docker-compose up --build
````

ou
````
docker compose up --build
````
O comando pode variar com a versão do docker compose instalada em sua máquina

***ATENÇÃO:*** a porta utilizada para rodar nosso docker é a `5431`.
Caso tenha algum problema com essa porta, basta alterá-la no docker-compose.yml.

<br>

# **Sobre os testes**

Essa aplicação possui testes, que serão utilizados para validar, se todas as regras de negócio foram aplicadas de maneira correta.

Os testes estão localizados em `src/__tests__`.

Na subpasta `integration` estão os testes.

Já na subpasta `mocks` estão os dados que serão utilizados para os testes.

No arquivo `jest.config.json` estão algumas configurações necessárias para os testes rodarem.

**`De modo algum altere qualquer um desses arquivos.`** Isso poderá comprometer a integridade dos testes.

E também não altere o script de `test` localizado no `package.json`. Isso será utilizado para rodar os testes.

<br>


# **Rodando os testes** 

Para rodar os testes é necessário que no seu terminal, você esteja dentro do diretório do projeto.

Estando no terminal e dentro do caminho correto, você poderá utilizar os comandos a seguir:

### Rodar todos os testes
````
yarn test
````
#
### Rodar todos os testes e ter um log ainda mais completo
````
yarn test --all
````
#

### Rodar os testes de uma pasta específica
`detalhe: repare que tests está envolvido por 2 underlines. Isso se chama dunder.`
````
yarn test ./scr/__tests__/integration/<subpasta>
````
#
### Rodar os testes de um arquivo específico
````
yarn test ./scr/__tests__/integration/<subpasta>/<arquivo>
````
#
### Rodar um teste específico
````
yarn test -t <describe ou test específico envolto em aspas>
````
````
\\ ex: yarn test -t "/categories"
\\ rodaria os testes do describe "/categorias" no caminho
\\ ./scr/__tests__/integration/categories/categoriesRoutes.test.ts
````

<br>


#



