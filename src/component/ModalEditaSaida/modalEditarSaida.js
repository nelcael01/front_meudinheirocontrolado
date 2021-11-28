import React from 'react';
import {useState, useEffect} from 'react';
import Modal from '../Modal/modal';
import Rotulo from '../Rotulo/rotulo';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { 
  classNames,
  isFormFieldValid,
  getFormErrorMessage,
} from "../../config/global";
import { buscarAll as buscarAllCategoriaDespesa } from '../../Service/CategoriaDespesa';
import { buscarAll as buscarAllProvento } from '../../Service/Provento';

const Modaleditarsaida = ({formikSaida, setShowPutSaida, showPutSaida}) => {

  const [optionsSaidaProvento, setOptionsSaidaProvento] = useState();
  const [optionsSaidaCategoriaDespesa, setOptionsSaidaCategoriaDespesa] = useState();

  useEffect(() => {
    buscarAllCategoriaDespesa().then((res) =>{
      setOptionsSaidaCategoriaDespesa(res.data)
    })
    buscarAllProvento().then((res) =>{
      setOptionsSaidaProvento(res.data)
    })
  }, [showPutSaida]);

  
  function handleHide() {
    setShowPutSaida(false)
    formikSaida.resetForm();
  }

  return (
    <Modal
    
    tamanho="850px"
    fechar={handleHide}
    visible={showPutSaida}
    titulo='Atualizar saida'
  >
      <form action="" onSubmit={formikSaida.handleSubmit}>
        <Rotulo nome="Descrição" cols="12 4" obrigatorio>
          <InputText 
          id="descricao"
          name="descricao"
          value={formikSaida.values.descricao}
          className={classNames({ "p-invalid": isFormFieldValid("descricao", formikSaida) })}
          onChange={(e) => formikSaida.handleChange(e)}
          />
          {getFormErrorMessage("descricao", formikSaida)}
        </Rotulo>
        <Rotulo nome="Valor" cols="12 4" obrigatorio>
          <InputNumber
            id="valor"
            name="valor"
            value={formikSaida.values.valor}
            className={classNames({ "p-invalid": isFormFieldValid("saida", formikSaida) })}
            onValueChange={(e) => formikSaida.handleChange(e)}
          />
          {getFormErrorMessage("saida", formikSaida)}
        </Rotulo>
        <Rotulo nome="Provento" obrigatorio cols="12 4">
          <Dropdown 
            id="provento"
            name="provento"
            optionLabel="valor"
            options={optionsSaidaProvento}
            value={formikSaida.values.provento}
            onChange={(e) => formikSaida.handleChange(e)}
            placeholder="Selecione..." 
            className={classNames({ "p-invalid": isFormFieldValid("provento", formikSaida) })} 
          />
          {getFormErrorMessage("provento", formikSaida)}
        </Rotulo>
        <Rotulo nome="Categoria Despesa" obrigatorio cols="12 4" >
          <Dropdown 
            id="id_categoria_despesa"
            name="categoriaDespesa"
            optionLabel="descricao"
            options={optionsSaidaCategoriaDespesa}
            value={formikSaida.values.categoriaDespesa}
            onChange={(e) => formikSaida.handleChange(e)}
            placeholder="Selecione..." 
            className={classNames({ "p-invalid": isFormFieldValid("categoriaDespesa", formikSaida) })} 
          />
          {getFormErrorMessage("categoriaDespesa", formikSaida)}
        </Rotulo>
        <div >
          <button
            type='submit'
            style={{
              border:'none', 
              backgroundColor:'#10B981', 
              display: 'flex',
              alignItems:'center',
              justifyContent:'center',
              color: 'white', 
              fontSize:'22px', 
              borderRadius:'5px', 
              marginTop:'30px', 
              paddingTop:'8px',
              paddingBottom:'8px',
              paddingLeft:'25px',
              paddingRight:'25px'
            }}
          >Atualizar</button>
        </div>
      </form>
  </Modal>
  );
}

export default Modaleditarsaida;
