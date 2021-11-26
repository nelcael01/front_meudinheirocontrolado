import { InputText } from 'primereact/inputtext';
import {useState} from 'react';
import { Container } from './Right_styled';
import { Link } from "react-router-dom";
// useformik
import { useFormik } from "formik";
// service
import {initForm as initFormLogin, buscaLogin} from '../../Service/Login'
// useHistory
import { useHistory } from "react-router-dom";
// import useHistory from 'use-history'

import { 
  classNames,
  isFormFieldValid,
  getFormErrorMessage,
} from "../../config/global";

const Right = () => {
  const history = useHistory();
  const [LoginError, setLoginError] = useState();

   // FORMIK SAIDA
   const formikLogin = useFormik({
    enableReinitialize: true,
    initialValues: initFormLogin,
    validate: (data) => {
      let errors = {};
      if (!data.nome) {
        errors.nome = "Nome é obrigatorio";
      }
      if (!data.senha) {
        errors.senha = "Senha é obrigatoria";
      }
      return errors;
    },
    onSubmit: async (data) => {
      await buscaLogin(data).then(res => {
        if(res.data == true){
          history.push({pathname:'/home'})
        }else{
          setLoginError(true)
        }
      });
    },
  });
  return (
    <Container>
      < form 
        onSubmit = {formikLogin.handleSubmit} 
        style={{display:'flex', alignItems:'center', flexDirection:'column',maxWidth:'18vw'}}
      >
        <span className="p-input-icon-left" style={{marginTop:'20px', width:'100%'}}>
            <i className="pi pi-user" />
            <InputText 
              value={formikLogin.values.nome}
              id="nome"
              name="nome"
              placeholder="Seu nome" 
              onChange={(e) => formikLogin.handleChange(e)} 
              style={{width:'100%', backgroundColor:'#EEEEEE'}}
              className={classNames({ "p-invalid": isFormFieldValid("usuario", formikLogin) })} 
            />
            {getFormErrorMessage("nome", formikLogin)}
        </span>
        <span className="p-input-icon-left" style={{marginTop:'20px', width:'100%'}}>
            <i className="pi pi-lock" />
            <InputText 
              id="senha"
              name="senha"
              value={formikLogin.values.senha}
              placeholder="Sua senha"
              onChange={(e) => formikLogin.handleChange(e)}
              style={{width:'100%', backgroundColor:'#EEEEEE'}}
              className={classNames({ "p-invalid": isFormFieldValid("usuario", formikLogin) })} 
            />
            {getFormErrorMessage("senha", formikLogin)}
        </span>
        <button 
          type='submit'
          className="p-button-success"
          style={{width:'70px', height:'40px',borderRadius:'5px', fontSize:'16px' ,marginTop:'25px', backgroundColor:'#10B981', outline:'none', color:'white', border:'none'}}
        >
          <b>Entrar</b>
        </button>
      </form>

      <h4 style={{color:"#10B981", fontFamily:"Segoe UI"}}>Esqueceu a senha?</h4>
    </Container>
  );
}

export default Right;
