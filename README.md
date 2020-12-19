# StarWars API 🪐

Desenvolvimento para o desafio da B2W Digital. 

## ⚙️ Tecnologias

➤ [NodeJS](https://nodejs.org/en/) (V. 13.11.0)

➤ [Express](https://expressjs.com/pt-br/) (V. 4.17.1)

➤ [Axios](https://github.com/axios/axios) (V. 0.19.2)

➤ [Mongoose](https://mongoosejs.com/) (V. 5.10.6)

➤ [Mocha](https://mochajs.org/) (V. 8.1.3)

➤ [Swagger](https://swagger.io/) (V. 4.1.5)

➤ [Docker](https://www.docker.com/) (V. 20.10.0)

➤ [Docker-Compose](https://docs.docker.com/compose/install/) (1.27.4)


## 💻 Como Rodar 
```bash
# clone o repositório.
git clone https://github.com/ErickGuimaraes/starwarsb2wapi
# entre na pasta do projeto
cd starwarsb2wapi
# para iniciar o programa usando docker.
docker-compose up

# para acessar as rotas da aplicação.
http://localhost:3000/starwarsapi/

###  OU

# inicie com o yarn para instalar os pacotes.
yarn
# para iniciar a aplicação em modo de produção.
yarn start
# para iniciar a aplicação em desenvolvimento.
yarn dev
# para iniciar os testes automatizados da aplicação .
yarn test
# para acessar as rotas da aplicação.
http://localhost:3000/starwarsapi/
```

## API Rest:

### ‣ GET /planets 
#### FORMATO DA RESPOSTA
JSON
#### QUERY
name (opcional)

### ‣ POST /planets 
#### FORMATO DA RESPOSTA
JSON
#### EXEMPLO DA RESPOSTA
```json
{
        "film_appearances": 4,
        "_id": "5f6c11b9c045195378fa08e4",
        "name": "Coruscant",
        "climate": "temperate",
        "terrain": "cityscape, mountains"
}
```
#### PARAMS
name (obrigatorio), climate(obrigatorio), terrain (obrigatorio)

### ‣ GET /planets/:id
#### FORMATO DA RESPOSTA
JSON
#### PARAMS
name(obrigatorio), climate, terrain

### ‣ DELETE /planets/:id
#### FORMATO DA RESPOSTA
JSON

## 🔨    Funcionalidades desejadas

‣ Adicionar um planeta (com nome, clima e terreno)

‣ Listar planetas

‣ Buscar por nome

‣ Buscar por ID

‣ Remover planeta

‣ Linguagem Node.JS

‣ Banco de Dados MongoDB

‣ Testes

## License
[MIT](https://choosealicense.com/licenses/mit/)
