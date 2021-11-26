import { InputText } from 'primereact/inputtext';
import {useState} from 'react';
import { Container } from './Right_styled';
import { Link } from "react-router-dom";
// useformik
import { useFormik } from "formik";
// service
import {initForm as initFormLogin, buscaLogin} from '../../Service/Login'

import { 
  classNames,
  isFormFieldValid,
  getFormErrorMessage,
} from "../../config/global";

const Right = () => {
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");

   // FORMIK SAIDA
   const formikLogin = useFormik({
    enableReinitialize: true,
    initialValues: initFormLogin,
    validate: (data) => {
      let errors = {};
      if (!data.nome) {
        errors.nome = "Nome é preenchimento obrigatorio";
      }
      if (!data.senha) {
        errors.senha = "Senha é preenchimento obrigatorio";
      }
      return errors;
    },
    onSubmit: async (data) => {
      await buscaLogin(data).then(res => {
          // setEstadoInicial(initFormUsuario)
          // formikUsuario.resetForm()
      });
    },
  });
  return (
    <Container>
      <span className="p-input-icon-left" style={{marginTop:'20px', width:'40%'}}>
          <i className="pi pi-user" />
          <InputText value={nome} placeholder="Seu nome" onChange={(e) => setNome(e.target.values)} style={{width:'100%', backgroundColor:'#EEEEEE'}}/>
      </span>
      <span className="p-input-icon-left" style={{marginTop:'20px', width:'40%'}}>
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
          {getFormErrorMessage("usuario", formikLogin)}
      </span>
      
        <button 
          className="p-button-success"
          style={{width:'70px', height:'40px',borderRadius:'5px', fontSize:'16px' ,marginTop:'25px', backgroundColor:'#10B981', outline:'none', color:'white', border:'none'}}
        >
          <b>Entrar</b>
        </button>

      <Link to="/home" style={{outline:'none'}}> 
      </Link>
      <h4 style={{color:"#10B981", fontFamily:"Segoe UI"}}>Esqueceu a senha?</h4>
    </Container>
  );
}

export default Right;
