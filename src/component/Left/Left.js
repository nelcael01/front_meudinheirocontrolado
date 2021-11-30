import {useState} from 'react'
import { useFormik } from 'formik';
import { Container, Title } from './Left_styled';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { initForm as initFormUsuario, criar as criarUsuario } from '../../Service/Usuario';

import { 
  classNames,
  isFormFieldValid,
  getFormErrorMessage,
} from "../../config/global";


const Left = () => {

  const [estadoInicial, setEstadoInicial] = useState(initFormUsuario);

  // FORMIK SAIDA
  const formikUsuario = useFormik({
    enableReinitialize: true,
    initialValues: estadoInicial,
    validate: (data) => {
      let errors = {};
      if (!data.nome) {
        errors.nome = "Nome é preenchimento obrigatorio";
      }
      if (!data.senha) {
        errors.senha = "Senha é preenchimento obrigatorio";
      }
      if (!data.endereco) {
        errors.endereco= "Endereço é preenchimento obrigatorio";
      }
      if (!data.cpf) {
        errors.cpf = "CPF é preenchimento obrigatorio";
      }
      if (!data.telefone) {
        errors.telefone = "Telefone é preenchimento obrigatorio";
      }
      return errors;
    },
    onSubmit: async (data) => {
      await criarUsuario(data).then(res => {
          setEstadoInicial(initFormUsuario)
          formikUsuario.resetForm()
      });
    },
  });

  return (
    <Container>
      <Title>
        Bem vindo ao <br/><b>Meu Dinheiro Controlado</b>
      </Title>
      < form onSubmit = {formikUsuario.handleSubmit} >
        <span className="p-input-icon-left" style={{marginTop:'70px' , width:'70%'}}>
            <i className="pi pi-user" />
            <InputText
              id="nome"
              name="nome"
              value={formikUsuario.values.nome}
              placeholder="Seu nome"
              onChange={(e) => formikUsuario.handleChange(e)}
              style={{width:'100%'}}
              className={classNames({ "p-invalid": isFormFieldValid("nome", formikUsuario) })}
            />
            {getFormErrorMessage("nome", formikUsuario)}
        </span>
        <span className="p-input-icon-left" style={{marginTop:'20px', width:'70%'}}>
            <i className="pi pi-phone" />
            <InputMask
              mask="(99) 99999-9999" 
              placeholder="Telefone" 
              id="telefone"
              value={formikUsuario.values.telefone} 
              onChange={(e) => formikUsuario.handleChange(e)}
              style={{width:'100%'}}
              className={classNames({ "p-invalid": isFormFieldValid("telefone", formikUsuario) })}
            />
              {getFormErrorMessage("telefone", formikUsuario)}
        </span>
        <span className="p-input-icon-left" style={{marginTop:'20px', width:'70%'}}>
            <i className="pi pi-map-marker" />
            <InputText 
              id="endero"
              name="endereco"
              value={formikUsuario.values.endereco} 
              placeholder="Seu endereço" 
              onChange={(e) => formikUsuario.handleChange(e)}
              style={{width:'100%'}}
              className={classNames({ "p-invalid": isFormFieldValid("endereco", formikUsuario) })}
            />
            {getFormErrorMessage("endereco", formikUsuario)}
        </span>
        <span className="p-input-icon-left" style={{marginTop:'20px', width:'70%'}}>
            <i className="pi pi-id-card" />
            <InputMask
              mask="999.999.999-99" 
              placeholder="CPF" 
              id="cpf"
              value={formikUsuario.values.cpf} 
              onChange={(e) => formikUsuario.handleChange(e)}
              style={{width:'100%'}}
              className={classNames({ "p-invalid": isFormFieldValid("telefone", formikUsuario) })}
            />
              {getFormErrorMessage("cpf", formikUsuario)}
        </span>
        <span className="p-input-icon-left" style={{marginTop:'20px', width:'70%'}}>
            <i className="pi pi-lock" />
            <InputText 
              id="senha"
              name="senha"
              value={formikUsuario.values.senha} 
              placeholder="Sua senha" 
              onChange={(e) => formikUsuario.handleChange(e)}
              style={{width:'100%'}}
              className={classNames({ "p-invalid": isFormFieldValid("senha", formikUsuario) })}
            />
            {getFormErrorMessage("senha", formikUsuario)}
        </span>
        <span className="p-input-icon-left" style={{marginTop:'20px', width:'70%'}} >
            <button 
              
              type="submit"
              style={{color:"white", fontFamily:"Segoe UI", fontSize:'24px', backgroundColor:"#10B981", border:'none', outline:'none' }}
            >
              Criar conta
            </button>
        </span>
      </form>  
    </Container>
  );
}

export default Left;
