import axios from 'axios'
const url = 'http://localhost:3000/usuarios/atualizarUsuario'
const api = require('axios');

export const  initForm = {
    nome: "",
    senha: "",
}

export const atualizarSenha = async (data) => {
    return new Promise((resolve, reject) => {
        window.$http.put(`${url}`, JSON.stringify(data)).then((res)=>{
            resolve(res)
        })      
    })
}