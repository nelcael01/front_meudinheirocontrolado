import React from 'react';
import {Container} from '../Layout/layout_styled'
import { Menu } from './../Menu/menu';

const Layout = (props) => {
  return (
    <Container>
      <Menu />
      {props.children}
    </Container>
  );
}

export default Layout;
