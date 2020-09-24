# StarWars API 🪐

Desenvolvimento para o desafio da B2W Digital. 

## ⚙️ Tecnologias

➤ [NodeJS](https://nodejs.org/en/)

➤ [Express](https://expressjs.com/pt-br/)

➤ [Axios](https://github.com/axios/axios)

➤ [Mongoose](https://mongoosejs.com/)

## 💻 Como Rodar 
```bash
# clone o repositório.
git clone https://github.com/ErickGuimaraes/starwarsb2wapi
# entre na pasta do projeto
cd starwarsb2wapi
# inicie com o yarn para instalar os pacotes.
yarn
# para iniciar a aplicação em desenvolvimento.
yarn start dev
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

### ‣ PUT /planets/:id
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

## License
[MIT](https://choosealicense.com/licenses/mit/)
