// react
import {useState, useEffect} from 'react';

// styled_component
import { Container, Content, More } from './home_styled';

// service
import { camposTabela as camposTabelaSaida, buscarAll as buscarAllSaidas, initFormSaida } from '../../Service/Saida/';
import { camposTabela as camposTabelaProvento, buscarAll as buscarAllProvento, initFormProvento } from '../../Service/Provento/';

// primereact
import { TabView, TabPanel } from 'primereact/tabview';

// useformik
import { useFormik } from "formik";

// components
import {Menu} from '../../component/Menu/menu'
import Tabela from '../../component/Tabela/tabela.js'
import Modaladicionar from './../../component/ModalAdionar/modalAdicionar';

const Home = () => {

  // estado do modal
  const [showPost, setShowPost] = useState(false);

  const [formSaida, setFormSaida] = useState(initFormSaida);
  const [formProvento, setFormProvento] = useState(initFormProvento);

  const [dataSaida, setDataSaida] = useState();
  const [dataProvento, setDataProvento] = useState();

  // index ativo no modal adicionar
  const [activeIndex, setActiveIndex] = useState();

  useEffect(() => {
    buscarAllSaidas().then((res) => {
      console.log("saida");
      console.log(res.data);
      setDataSaida(res.data)
    })
    buscarAllProvento().then((res)=>{
      console.log("saida");
      console.log(res.data);
      setDataProvento(res.data)
    })
  }, []);

  // FORMIK SAIDA
  const formikSaida = useFormik({
    enableReinitialize: true,
    initialValues: formSaida,
    validate: (data) => {
      let errors = {};
      if (!data.categoriaDespesa.id_categoria_despesa) {
        errors.categoriaDespesa = "Categoria despesa é preenchimento obrigatorio";
      }
      if (!data.descricao) {
        errors.descricao = "Descrição é preenchimento obrigatorio";
      }
      if (!data.provento.id_provento) {
        errors.provento = "Provento é preenchimento obrigatorio";
      }
      if (!data.valor) {
        errors.valor = "Valor é preenchimento obrigatorio";
      }
      
      return errors;
    },
    onSubmit: async (data) => {
      // await imprimirAll(date).then((res) => {
      //     setBase64('data:application/pdf;base64,' + res.dadosRelatorioBase64)
      //     setActiveImprimir(true)
      // });
    },
  });

  // FORMIK PROVENTO
  const formikProvento = useFormik({
    enableReinitialize: true,
    initialValues: formProvento,
    validate: (data) => {
      let errors = {};
      if (data.tipoEntrada.id_tipo_entrada) {
        errors.tipoEntrada = "Tipo Entrada é preenchimento obrigatorio";
      }
      if (data.tipoMoeda.id_tipo_moeda) {
        errors.tipoMoeda = "Tipo Moeda é preenchimento obrigatorio";
      }
      if (data.usuario.id_usuario) {
        errors.usuario = "Tipo Moeda é preenchimento obrigatorio";
      }
      if (data.valor) {
        errors.valor = "Valor é preenchimento obrigatorio";
      }
      return errors;
    },
    onSubmit: async (data) => {
      console.log('aaaaaaaaaaaaaa');
      // await imprimirAll(date).then((res) => {
      //     setBase64('data:application/pdf;base64,' + res.dadosRelatorioBase64)
      //     setActiveImprimir(true)
      // });
    },
  });

  function onEditarSaida(rowData) {
    setFormSaida(rowData)
    
  }

  function onEditarProvento(rowData) {
  }

  function onExcluirProvento(rowData) {
    
  }

  function onExcluirSaida(rowData) {
    
  }

  return (
    <Container>
      <Menu /> 
      <Content>
        <h1 style={{marginTop:'0', marginBottom:'40px', color:'#10B981'}}>Home</h1>
        <TabView >
          <TabPanel header="Provento" >
            <Tabela 
              hasEventoAcao
              camposTabela={camposTabelaProvento}
              dados={dataProvento}
              onEditarDado={(rowData) => onEditarProvento(rowData)}
              onExcluirDado={(rowData) => onExcluirProvento(rowData)}
            /> 
          </TabPanel>
          <TabPanel header="Saida" >
            <Tabela 
              hasEventoAcao
              camposTabela={camposTabelaSaida}
              dados={dataSaida}
              onEditarDado={(rowData) => onEditarSaida(rowData)}
              onExcluirDado={(rowData) => onExcluirSaida(rowData)}
            /> 
          </TabPanel>
        </TabView>
        <More onClick={() => setShowPost(true)}>
          <i className="pi pi-plus" style={{fontSize:'28px', color:'white'}}/>  
        </More>
        <Modaladicionar 
          formikSaida={formikSaida}
          formikProvento={formikProvento}
          showPost={showPost}
          setShowPost={setShowPost}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      </Content>
    </Container>
  );
}

export default Home;
