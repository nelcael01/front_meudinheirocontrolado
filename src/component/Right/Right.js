import { InputText } from 'primereact/inputtext';
import {useState} from 'react';
import { Container } from './Right_styled';
import { Link } from "react-router-dom";

// useformik
import { useFormik } from "formik";

// service
import {initForm as initFormLogin, buscaLogin} from '../../Service/Login'

import { atualizarSenha, initForm as initFormMudarSenha } from '../../Service/MudarSenha';

// useHistory
import { useHistory } from "react-router-dom";

import ModalLoginError from './../ModalLoginError/modalLoginError';

import ModalMudarSenha from './../ModalMudarSenha/modalMudarSenha';
import { 
  classNames,
  isFormFieldValid,
  getFormErrorMessage,
} from "../../config/global";

const Right = () => {
  const history = useHistory();
  const [LoginError, setLoginError] = useState(false);
  const [activeMudarSenha, setActiveMudarSenha] = useState(false);
  const [resultado, setResultado] = useState('');

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
          setLoginError(false)
        }else{
          setLoginError(true)
        }
      });
    },
  });

    // FORMIK MUDAR SENHA
    const formikMudarSenha = useFormik({
      enableReinitialize: true,
      initialValues: initFormMudarSenha,
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
        await atualizarSenha(data).then(res => {
          console.log(res.data);
          if (res.data === true) {
            console.log('oi');
            setResultado("Atualizado!")
          }else{
            console.log('oi');
            setResultado("Erro na atualização!")
          }
        });
      },
    });

    function handleActiveMudarSenha() {
      setActiveMudarSenha(true)
    }
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
      <ModalLoginError 
        LoginError={LoginError}
        setLoginError={setLoginError}
      />
      <h4 style={{color:"#10B981", fontFamily:"Segoe UI"}} onClick={handleActiveMudarSenha}>Esqueceu a senha?</h4>
      {activeMudarSenha &&
        <ModalMudarSenha
          activeMudarSenha={activeMudarSenha}
          setActiveMudarSenha={setActiveMudarSenha}
          formikMudarSenha={formikMudarSenha}
          resultado={resultado}
          setResultado={setResultado}
        />
      }
    </Container>
  );
}

export default Right;
