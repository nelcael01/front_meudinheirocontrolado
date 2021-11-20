import axios from 'axios'

const api = require('axios');
const id = "id_saida"

  // campos da tabela
  export const camposTabela = [
    { titulo: "Descrição",   nome: "descricao"},
    { titulo: "Valor",   nome: "valor"},
    { titulo: "Categoria",   nome: "categoriaDespesa.descricao"},
];
export const initFormSaida = {
  descricao:'',
  valor:null,
  provento:{
    id_provento:null
  },
  categoriaDespesa:{
    id_categoria_despesa:null
  }
}

const url = 'http://localhost:3000/saidas'

export const buscarAll = async () => {
    return new Promise((resolve, reject) => {
        resolve(axios.get(url))
    })
}

export const criar = async (data) => {
  return new Promise((resolve, reject) => {
    api.post("url", JSON.stringify(data)).then(res =>{
      resolve(axios.post(url))
    })
  })
}


export const excluir = async (data) => {
  return new Promise((resolve, reject) => {
    api.delete(`${url}/${data[id]}`).then(res =>{
      
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
