import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Component } from './menu_styled';

export const Menu = () => {
  return (
    <Container>
      <Component>
        <i className="pi pi-user" style={{fontSize:'28px', color:'white'}}/>
      </Component>
      <Component>
        <Link to="/"> 
          <i className="pi pi-times" style={{fontSize:'28px', color:'white'}}/>
        </Link>
      </Component>
    </Container>
  );
}


