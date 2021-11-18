import React from 'react';
import { Container, Content } from './home_styled';
import {Menu} from '../../component/Menu/menu'
import Tabela from '../../component/Tabela/tabela.js'
const Home = () => {
  return (
    <Container>
      <Menu /> 
      <Content>
        <h1 style={{marginTop:'0', marginBottom:'40px', color:'#10B981'}}>Home</h1>
        <Tabela 
          onEditarDado
          hasEventoAcao
          
        /> 
      </Content>
    </Container>
  );
}

export default Home;
