/************************************************************************************************
 * Objetivo: API responsável em criar endPoints reference estados e cidades
 * Data: 15/09/2025 D.C.
 * Autor: Alex Henrique da Cruz Gomes
 * Versão: 1.0
 * 
 * Observações: Instalar dependencias para criar a API
 * express     - npm install express     --save Instala as dependencias para criar uma API
 * cors        - npm install cors        --save Instala as dependencias para configurar as permissões de uma API 
 * body-parser - npm install body-parser --save Instala as dependencias para receber os tipos de dados via POST ou PUT 
 ***********************************************************************************************/

//Import das dependencias
const express = require('express') 
const cors = require('cors')
const bodyParse = require('body-parser')

//Import do arquivo de funções
const dados = require('./module/funcoes.js')

//Define a porta padrao da API se for em um servidor de nuvem nao temos acesso a porta
            // em execução local podemos definir uma porta livre
const PORT = process.PORT || 8080

//Instancia na classe do express
const app = express()

//Configurações do cors
app.use((request, response, next)=>{
    response.header('Access-Controll-Allow-Origin', '*')//IP de origem
    response.header('Access-Controll-Allow-Methods', 'GET')//Métodos (verbos) do protocólo HTTP

    app.use(cors())
    next()//Proximo
})

//Request -> Recebe os dados da requisição da API
//Response -> Envia os dados na API

//EndPoints
app.get('/v1/allUsers', function (request, response) {
    let users = dados.getAllUsuarios()
    response.json(users)
})

app.get('/v1/whatsapp/user/perfil/:number', function(request, response){
    let userNumber = request.params.number
    let userProfile = dados.getUsuarioByNumero(userNumber)

    response.status(userProfile.statusCode)
    response.json(userProfile)
})

app.get('/v1/whatsapp/user/contatos/:number', function(request, response){
 let userNumber = request.params.number
    let userContatos = dados.getContatosByNumero(userNumber)

    response.status(userContatos.statusCode)
    response.json(userContatos)
})

app.get('/v1/whatsapp/user/contatos/mensagens/:number', function(request, response){
    let userNumber = request.params.number
    let userMessages = dados.getAllMensagens(userNumber)

    response.status(userMessages.statusCode)
    response.json(userMessages)
})

app.get('/v1/whatsapp/user/contatos/', function(request, response){
    let userNumber = request.query.userNumber
    let contactNumber = request.query.contactNumber

    let userConversation = dados.getMensagemByNumero(userNumber, contactNumber)

    response.status(userConversation.statusCode)
    response.json(userConversation)
})

app.get('/v1/whatsapp/user/contato/conversa', function(request, response){
    let userNumber = request.query.userNumber
    let keyWord = request.query.word

    let userMessages = dados.getMensagensByKeyWord(userNumber, keyWord)

    response.status(userMessages.statusCode)
    response.json(userMessages)
})

//Start da API
app.listen(PORT, function(){
    console.log('API aguardando requisições...')
})
