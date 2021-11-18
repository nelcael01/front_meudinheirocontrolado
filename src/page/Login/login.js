import React from 'react';
import { Layout } from './login_layout';
import Left from '../../component/Left/Left'
import Right from '../../component/Right/Right'

const Home = () => {
  return (
    <Layout>
      <Left/>
      <Right/>
    </Layout>
  );
}

export default Home;
