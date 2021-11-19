import axios from 'axios'
const url = 'http://localhost:3000/categoriaDespesa'

export const buscarAll = async () => {
    return new Promise((resolve, reject) => {
        resolve(axios.get(url))
    })
}
