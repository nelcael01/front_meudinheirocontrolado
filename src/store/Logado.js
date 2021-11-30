import { createSlice } from "@reduxjs/toolkit"

const stock = createSlice({
  name:'stock',
  initialState:{
    logado:false,
    id_logado:null,
    nome:''
  },
  reducers:{
    salve(state, dados){
      state.logado = dados.payload.logado
      state.id_logado = dados.payload.id_logado
      state.nome = dados.payload.nome
    }
  }
});

export const {salve}  = stock.actions

export default stock.reducer
