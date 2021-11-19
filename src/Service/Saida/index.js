// import fetch from 'react-fetch';
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000'
})

  // campos da tabela
  export const camposTabela = [
    { titulo: "Descrição",   nome: "descricao"},
    { titulo: "Valor",   nome: "valor"},
    { titulo: "Categoria",   nome: "categoria_despesa.descricao"},
];

const url = 'http://localhost:3000/saidas'

export const buscarAll = async () => {
    return new Promise((resolve, reject) => {
        resolve(axios.get(url))
    })
}

export function salvar(data) {
  return new Promise((resolve) => {
    window.$http.post(`${url}`, JSON.stringify(data)).then((res) =>{
      resolve(res.data);
    })
  })
}

export const initFormSaida = {
  id_saida:null,
  descricao:'',
  valor:null,
  provento:{
    id_provento:null
  },
  categoriaDespesa:{
    id_categoria_despesa:null
  }
}
