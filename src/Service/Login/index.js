import axios from 'axios'
const url = 'http://localhost:3000/usuarios/buscaLogin'
const api = require('axios');

export const  initForm = {
    nome: "",
    senha: "",
}

export const buscaLogin = async (data) => {
    return new Promise((resolve, reject) => {
        window.$http.post(`${url}`, JSON.stringify(data)).then((res)=>{
            resolve(res)
        })      
    })
}