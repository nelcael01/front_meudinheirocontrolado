import axios from 'axios'
const url = 'http://localhost:3000/usuarios'
const api = require('axios');

export const buscarAll = async () => {
    return new Promise((resolve, reject) => {
        resolve(axios.get(url))
    })
}

export const  initForm = {
    id_usuario: null,
    nome: "",
    senha: "",
    cpf: "",
    telefone: "",
    endereco: ""
}

export const criar = async (data) => {
    return new Promise((resolve, reject) => {
      api.post("url", JSON.stringify(data)).then(res =>{
      })  
    })
  }