import axios from 'axios'
const url = 'http://localhost:3000/usuarios'

export const buscarAll = async () => {
    return new Promise((resolve, reject) => {
        resolve(axios.get(url))
    })
}
