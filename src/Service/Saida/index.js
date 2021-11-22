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
        resolve(window.$http.get(url))
    })
}

export const criar = async (data) => {
  return new Promise((resolve, reject) => {
    window.$http.post(`${url}`, JSON.stringify(data)).then()
  })
}


export const excluir = async (data) => {
  return new Promise((resolve, reject) => {
    window.$http.delete(`${url}/${data[id]}`).then()
  })
}

export const atualizar = async (data) => {
  return new Promise((resolve, reject) => {
    window.$http.put(`${url}/${data[id]}`, JSON.stringify(data)).then()
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
