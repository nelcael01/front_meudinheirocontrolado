import axios from 'axios'

const url = 'http://localhost:3000/proventos'
const api = require('axios');

export const camposTabela = [
  { titulo: "Valor",   nome: "valor"},
  { titulo: "Tipo Moeda",   nome: "tipoMoeda.nome"},
  { titulo: "Tipo Entrada",   nome: "tipoEntrada.nome"},
];

const id = "id_provento"

export const initFormProvento = {
  valor:null,
  usuario:{
    id_usuario:null
  },
  tipoEntrada:{
    id_tipo_entrada:null
  },
  tipoMoeda:{
    id_tipo_moeda:null
  }
}
export const buscarAll = async () => {
    return new Promise((resolve, reject) => {
        resolve(axios.get(url))
    })
}

export const criar = async (data) => {
  return new Promise((resolve, reject) => {
    api.post("url", JSON.stringify(data)).then(res =>{
      // resolve(axios.post(url))
    })
  })
}

export const excluir = async (data) => {
  return new Promise((resolve, reject) => {
    api.delete(`${url}/${data[id]}`).then(res =>{
      // resolve(axios.put(url))
    })
  })
}

export const atualizar = async (data) => {
  return new Promise((resolve, reject) => {
    api.put(`${url}/${data[id]}`).then(res =>{
      
    })
  })
}

export function salvar(data) {
  return new Promise ( async (resolve, reject) => {
      if (data[id] && data[id]!=0) {
        await atualizar (data).then((res)=>{
          resolve({...res, type:"UDP"});
        })
      } else {
        await criar(data).then((res)=>{
          resolve({...res, type:"INS"});
        })
      }  
    })
}