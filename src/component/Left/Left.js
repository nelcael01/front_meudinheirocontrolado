import {useState} from 'react';
import { Container, Title } from './Left_styled';
import { InputText } from 'primereact/inputtext';

const Left = () => {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  return (
    <Container>
      <Title>
        <b>Bem vindo ao <br/>Meu Dinheiro Controlado</b>
      </Title>
      <span className="p-input-icon-left" style={{marginTop:'70px' , width:'70%'}}>
          <i className="pi pi-user" />
          <InputText value={nome} placeholder="Seu nome" onChange={(e) => setNome(e.target.values)} style={{width:'100%'}}/>
      </span>
      <span className="p-input-icon-left" style={{marginTop:'20px', width:'70%'}}>
          <i className="pi pi-phone" />
          <InputText value={telefone} placeholder="Seu telefone" onChange={(e) => setTelefone(e.target.values)} style={{width:'100%'}}/>
      </span>
      <span className="p-input-icon-left" style={{marginTop:'20px', width:'70%'}}>
          <i className="pi pi-arrow-up" />
          <InputText value={endereco} placeholder="Seu endereço" onChange={(e) => setEndereco(e.target.values)} style={{width:'100%'}}/>
      </span>
      <span className="p-input-icon-left" style={{marginTop:'20px', width:'70%'}}>
          <i className="pi pi-cog" />
          <InputText value={cpf} placeholder="Seu CPF" onChange={(e) => setCpf(e.target.values)} style={{width:'100%'}}/>
      </span>
      <span className="p-input-icon-left" style={{marginTop:'20px', width:'70%'}}>
          <i className="pi pi-ellipsis-h" />
          <InputText value={senha} placeholder="Sua senha" onChange={(e) => setSenha(e.target.values)} style={{width:'100%'}}/>
      </span>
      <h2 style={{color:"white", fontFamily:"Segoe UI"}}>Criar conta</h2>
    </Container>
  );
}

export default Left;
