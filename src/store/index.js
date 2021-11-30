import { configureStore } from "@reduxjs/toolkit";
import stockReducer from './Logado'

  const store = configureStore({
    reducer: {
      stock: stockReducer
    }
  })


export default store 