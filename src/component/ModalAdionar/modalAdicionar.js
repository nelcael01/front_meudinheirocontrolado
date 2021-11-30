import {useState, useEffect} from 'react';
import Modal from './../Modal/modal';
import { TabView, TabPanel } from 'primereact/tabview';
import Rotulo from '../../component/Rotulo/rotulo'
import { InputText } from 'primereact/inputtext';
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";

import { 
  classNames,
  isFormFieldValid,
  getFormErrorMessage,
} from "../../config/global";

import { buscarAll as buscarAllProvento } from '../../Service/Provento';
import { buscarAll as buscarAllCategoriaDespesa } from '../../Service/CategoriaDespesa';
import { buscarAll as buscarAllUsuario } from '../../Service/Usuario';
import { buscarAll as buscarAllTipoEntrada } from '../../Service/TipoEntrada';
import { buscarAll as buscarAllTipoMoeda } from '../../Service/TipoMoeda';
import { styled } from 'styled-components';
import { initFormProvento } from '../../Service/Provento';
import { initFormSaida } from '../../Service/Saida';

// redux
import { useDispatch, useSelector } from 'react-redux';

const Modaladicionar = ({
  showPost,
  setShowPost, 
  formikProvento, 
  activeIndex, 
  setActiveIndex, 
  formikSaida, 
  dataSaida, 
  dataProvento,
}) => {

  const [optionsProvento, setOptionsProvento] = useState();
  const [optionsCategoriaDespesa, setOptionsCategoriaDespesa] = useState();
  const [optionsUsuario, setOptionsUsuario] = useState();
  const [optionsTipoEntrada, setOptionsTipoEntrada] = useState();
  const [optionsTipoMoeda, setOptionsTipoMoeda] = useState();

  const dadosCloud = useSelector((state) => state.stock)

  useEffect(() => {
    buscarAllProvento(dadosCloud.id_logado).then((res)=>{
      setOptionsProvento(res.data)
    })
    buscarAllCategoriaDespesa().then((res) =>{
      setOptionsCategoriaDespesa(res.data)
    })
    buscarAllUsuario().then((res) =>{
      setOptionsUsuario(res.data)
    })
    buscarAllTipoEntrada().then((res) =>{
      setOptionsTipoEntrada(res.data)
    })
    buscarAllTipoMoeda().then((res) =>{
      setOptionsTipoMoeda(res.data)
    })
  }, [dataSaida, dataProvento]);

  function handleHide() {
    setShowPost(false)
  }

  return (
    <Modal
      tamanho="850px"
      fechar={handleHide}
      visible={showPost}
      titulo='Criar'
    >
        <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
          <TabPanel header="Provento">
            < form onSubmit = {formikProvento.handleSubmit}>
              <Rotulo nome="Valor" cols="12 4" obrigatorio>
                  <InputNumber
                    id="valor"
                    name="valor"
                    mode="decimal"
                    minFractionDigits={2}
                    maxFracionDigits={2}
                    value={formikProvento.values.valor}
                    onValueChange={(e) => formikProvento.handleChange(e)}
                    className={classNames({ "p-invalid": isFormFieldValid("valor", formikProvento) })}
                  />
                  {getFormErrorMessage("valor", formikProvento)}
              </Rotulo>
              <Rotulo nome="Tipo Entrada" obrigatorio cols="12 4" >
                <Dropdown 
                  id="id_tipo_entrada"
                  name="tipoEntrada"
                  optionLabel="nome"
                  options={optionsTipoEntrada}
                  value={formikProvento.values.tipoEntrada}
                  onChange={(e) => formikProvento.handleChange(e)}
                  placeholder="Selecione..." 
                  className={classNames({ "p-invalid": isFormFieldValid("tipoEntrada", formikProvento) })} 
                />
                {getFormErrorMessage("tipoEntrada", formikProvento)}
              </Rotulo>
              <Rotulo nome="Tipo Moeda" obrigatorio cols="12 4" >
                <Dropdown 
                  id="id_tipo_moeda"
                  name="tipoMoeda"
                  optionLabel="nome"
                  options={optionsTipoMoeda}
                  value={formikProvento.values.tipoMoeda}
                  onChange={(e) => formikProvento.handleChange(e)}
                  placeholder="Selecione..." 
                  className={classNames({ "p-invalid": isFormFieldValid("tipoMoeda", formikProvento) })} 
                />
                {getFormErrorMessage("tipoMoeda", formikProvento)}
              </Rotulo>
              <Rotulo nome="Usuario" obrigatorio cols="12 4" >
                <Dropdown 
                  id="id_usuario"
                  name="usuario"
                  optionLabel="nome"
                  options={optionsUsuario}
                  value={formikProvento.values.usuario}
                  onChange={(e) => formikProvento.handleChange(e)}
                  placeholder="Selecione..." 
                  className={classNames({ "p-invalid": isFormFieldValid("usuario", formikProvento) })} 
                />
                {getFormErrorMessage("usuario", formikProvento)}
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
                    paddingRight:'25px',
                    outline:'none'
                  }}
                >Criar</button>
              </div>
          </form>
        </TabPanel>
          
          {/* SAIDA */}
          <TabPanel header="Saida" >
            <form action="" onSubmit={formikSaida.handleSubmit}>
              <Rotulo nome="Descrição" cols="12 4" obrigatorio>
                <InputText 
                id="descricao"
                name="descricao"
                value={formikSaida.descricao}
                className={classNames({ "p-invalid": isFormFieldValid("descricao", formikSaida) })}
                onChange={(e) => formikSaida.handleChange(e)}
                />
                {getFormErrorMessage("descricao", formikSaida)}
              </Rotulo>
              <Rotulo nome="Valor" cols="12 4" obrigatorio>
                <InputNumber
                  id="valor"
                  name="valor"
                  mode="decimal"
                  minFractionDigits={2}
                  maxFracionDigits={2}
                  value={formikSaida.valor}
                  className={classNames({ "p-invalid": isFormFieldValid("valor", formikSaida) })}
                  onValueChange={(e) => formikSaida.handleChange(e)}
                />
                {getFormErrorMessage("valor", formikSaida)}
              </Rotulo>
              <Rotulo nome="Provento" obrigatorio cols="12 4">
                <Dropdown 
                  id="id_provento"
                  name="provento"
                  optionLabel="valor"
                  // optionValue='provento'
                  options={optionsProvento}
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
                  options={optionsCategoriaDespesa}
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
                    marginTop:'15px', 
                    paddingTop:'8px',
                    paddingBottom:'8px',
                    paddingLeft:'25px',
                    paddingRight:'25px',
                    outline: 'none'
                  }}
                >Criar</button>
              </div>
            </form>
          </TabPanel> 
        </TabView>
    </Modal>
  );
}

export default Modaladicionar;
