// react
import {useState, useEffect} from 'react';

// styled_component
import { Container, Content, More } from './home_styled';

// service
import { camposTabela, buscarAll } from '../../Service/Saida/';

// primereact
import { TabView, TabPanel } from 'primereact/tabview';

// useformik
import { useFormik } from "formik";

// components
import {Menu} from '../../component/Menu/menu'
import Tabela from '../../component/Tabela/tabela.js'
import Modaladicionar from './../../component/ModalAdionar/modalAdicionar';
import axios from 'axios'

const Home = () => {

  // estado do modal
  const [showPost, setShowPost] = useState(false);

  const [dataSaida, setDataSaida] = useState();

  useEffect(() => {
    buscarAll().then((res) => {
      console.log(res);
  })
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    // initialValues: form,
    validate: (data) => {
      let errors = {};
      return errors;
    },
    onSubmit: async (data) => {
      // await imprimirAll(date).then((res) => {
      //     setBase64('data:application/pdf;base64,' + res.dadosRelatorioBase64)
      //     setActiveImprimir(true)
      // });
    },
  });

  return (
    <Container>
      <Menu /> 
      <Content>
        <h1 style={{marginTop:'0', marginBottom:'40px', color:'#10B981'}}>Home</h1>
        <TabView >
          <TabPanel header="Provento" >
            {/* <Tabela 
              onEditarDado
              hasEventoAcao
              camposTabela={camposTabela}
            />  */}
          </TabPanel>
          <TabPanel header="Saida" >
            {/* <Tabela 
              // dados={}
              // onEditarDado
              hasEventoAcao
              camposTabela={camposTabela}
            />  */}
          </TabPanel>
        </TabView>
        <More onClick={() => setShowPost(true)}>
          <i className="pi pi-plus" style={{fontSize:'28px', color:'white'}}/>  
        </More>
        <Modaladicionar 
          showPost={showPost}
          setShowPost={setShowPost}
        />
      </Content>
    </Container>
  );
}

export default Home;
