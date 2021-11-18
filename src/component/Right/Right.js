import { InputText } from 'primereact/inputtext';
import {useState} from 'react';
import { Container } from './Right_styled';
import { Button } from 'primereact/button';
import { Link } from "react-router-dom";
import { Password } from 'primereact/password';

const Right = () => {
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  return (
    <Container>
       <span className="p-input-icon-left" style={{marginTop:'20px', width:'40%'}}>
          <i className="pi pi-user" />
          <InputText value={nome} placeholder="Seu nome" onChange={(e) => setNome(e.target.values)} style={{width:'100%', backgroundColor:'#EEEEEE'}}/>
      </span>
      <span className="p-input-icon-left" style={{marginTop:'20px', width:'40%'}}>
          <i className="pi pi-lock" />
          <InputText value={senha} placeholder="Sua senha" onChange={(e) => setSenha(e.target.values)} style={{width:'100%', backgroundColor:'#EEEEEE'}} />
      </span>
      <Link to="/home" style={{outline:'none'}}> 
        <Button label="Entrar" className="p-button-success" style={{marginTop:'25px', backgroundColor:'#10B981'}}></Button>
      </Link>
      <h4 style={{color:"#10B981", fontFamily:"Segoe UI"}}>Esqueceu a senha?</h4>
    </Container>
  );
}

export default Right;
