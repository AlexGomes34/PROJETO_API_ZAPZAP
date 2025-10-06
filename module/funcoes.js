/**************************************************************
 * Objetivo: API baseada no aplicativo WHATSAPP com integração no front
 * Data: 30/09/2025
 * Autor: Alex Henrique Da Cruz Gomes
 * Versão: 1.0.0
 * 
 *************************************************************/
const dados = require('./contatos.js')

const MESSAGE_ERROR = {status: false, statusCode: 500, development: 'Alex Henrique Da Cruz Gomes' }

const getAllUsuarios = function(){
    let message = {status: true, statusCode: 200, development: 'Alex Henrique Da Cruz Gomes'}
    
    message.users = []

    dados.contatos['whats-users'].forEach(function(item){
        message.users.push(item)
    })

    if(message.users){
        return message
    }else{
        return MESSAGE_ERROR
    }
}

const getUsuarioByNumero = function(number){
    let message = {status: true, statusCode: 200, development: 'Alex Henrique Da Cruz Gomes'}

    message.user = dados.contatos['whats-users'].find(userNumber => userNumber.number === String(number))

    delete message.user.contacts

    if(message.user){
        return message
    }else{
        return MESSAGE_ERROR
    }

}

const getContatosByNumero = function(number){
    let message = {status: true, statusCode: 200, development: 'Alex Henrique Da Cruz Gomes'}

    message.user = dados.contatos['whats-users'].find(userNumber => userNumber.number === String(number))

    delete message.user.id 
    delete message.user.nickname
    delete message.user['created-since']
    delete message.user['profile-image']
    delete message.user.background

    if(message.user){
        return message
    }else{
        return MESSAGE_ERROR
    }
}

const getAllMensagens = function(number){
    let message = {status: true, statusCode: 200, development: 'Alex Henrique Da Cruz Gomes'}

    message.usuarioMensagens = dados.contatos['whats-users'].find(userNumber => userNumber.number === String(number))

    delete message.usuarioMensagens.id 
    delete message.usuarioMensagens.nickname
    delete message.usuarioMensagens['created-since']
    delete message.usuarioMensagens['profile-image']
    delete message.usuarioMensagens.background
    delete message.usuarioMensagens.contacts.name

    message.usuarioMensagens.contacts.forEach(function(item){
        delete item.description
        delete item.image
        delete item.number
    })

    if(message.usuarioMensagens){
        return message
    }else{
        return MESSAGE_ERROR
    }
}

const getMensagemByNumero = function(usuarioNumber, contatoNumber){
    let message = {status: true, statusCode: 200, development: 'Alex Henrique Da Cruz Gomes'}

    message.usuarioMensagens = dados.contatos['whats-users'].find(user => user.number === String(usuarioNumber))

    delete message.usuarioMensagens.id 
    delete message.usuarioMensagens.nickname
    delete message.usuarioMensagens['created-since']
    delete message.usuarioMensagens['profile-image']
    delete message.usuarioMensagens.background

    message.usuarioMensagens.contacts.forEach(function(item){
        if(item.number == String(contatoNumber)){
            message.usuarioMensagens.contato = item

            delete message.usuarioMensagens.contacts
        }
    })

    delete message.usuarioMensagens.description
    delete message.usuarioMensagens.image

    if(message){
        return message
    }else{
        return MESSAGE_ERROR
    }
}

const getMensagensByKeyWord = function(usuarioNumber, keyWord){
    let message = {status: true, statusCode: 200, development: 'Alex Henrique Da Cruz Gomes', contato: []}

    const numberUsuarioEscolhido = usuarioNumber
    const numberUsuarioEncontrado = dados.contatos['whats-users'].find(contato => contato.number === String(numberUsuarioEscolhido))

    numberUsuarioEncontrado.contacts.forEach(function (item) {

        item.messages.forEach(function (item) {
            if (item.content.includes(keyWord)) {
                message.contato.push(item)
            }
        })

    })

    if (message.contato) {
        return message 
    } else {
        return MESSAGE_ERROR 
    }
}

//console.log(getAllUsuarios())
//console.log(getUsuarioByNumero(11987876567))
//console.log(getContatosByNumero(11987876567))
//console.log(getAllMensagens(11987876567))
//console.log(getMensagemByNumero(11987876567, 269999799601))
console.log(getMensagensByKeyWord(11955577796, "Sarah"))

module.exports = {
    getAllMensagens,
    getAllUsuarios,
    getContatosByNumero,
    getMensagemByNumero,
    getMensagensByKeyWord,
    getUsuarioByNumero
}