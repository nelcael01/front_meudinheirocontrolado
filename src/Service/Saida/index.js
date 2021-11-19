import axios from 'axios'

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

// export const buscarAll = async (data) => {
//   return new Promise((resolve, reject) => {
//     api.post("url", JSON.stringify(jsonObjetc)).then(res =>{
//       resolve(axios.post(url))
//     })
//   })
// }


// export function salvar(data) {
//   return new Promise((resolve) => {
//     window.$http.post(`${url}`, JSON.stringify(data)).then((res) =>{
//       resolve(res.data);
//     })
//   })
// }
