import axios from 'axios'
const url = 'http://localhost:3000/proventos'

export const camposTabela = [
  { titulo: "Valor",   nome: "valor"},
  { titulo: "Tipo Moeda",   nome: "tipoMoeda.nome"},
  { titulo: "Tipo Entrada",   nome: "tipoEntrada.nome"},
];

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
