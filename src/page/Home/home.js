// react
import {useState, useEffect} from 'react';

// styled_component
import { Container, Content, More } from './home_styled';

// service
import { camposTabela as camposTabelaSaida, buscarAll as buscarAllSaidas, initFormSaida, excluir as excluirSaida, salvar as salvarSaida } from '../../Service/Saida/';
import { camposTabela as camposTabelaProvento, buscarAll as buscarAllProvento, initFormProvento, criar as criarProvento, excluir as excluirProvento, salvar as salvarProvento } from '../../Service/Provento/';

// primereact
import { TabView, TabPanel } from 'primereact/tabview';

// useformik
import { useFormik } from "formik";

// components
import {Menu} from '../../component/Menu/menu'
import Tabela from '../../component/Tabela/tabela.js'
import Modaladicionar from './../../component/ModalAdionar/modalAdicionar';
import Modaleditaprovento from '../../component/ModalEditarProvento/modalEditaProvento';
import Modaleditarsaida from '../../component/ModalEditaSaida/modalEditarSaida';
import ModalErrorIntegridadeBanco from "../../component/ModalErrorIntegridadeBanco/modalErrorIntegridadeBanco"

// redux
import { useDispatch, useSelector } from 'react-redux';

const Home = ({}) => {
  
  // estado do modal
  const [showPost, setShowPost] = useState(false);
  const [showPutProvento, setShowPutProvento] = useState(false);
  const [showPutSaida, setShowPutSaida] = useState(false);

  // estado formulario
  const [formSaida, setFormSaida] = useState(initFormSaida);
  const [formProvento, setFormProvento] = useState(initFormProvento);

  // estados das tabelas
  const [dataSaida, setDataSaida] = useState();
  const [dataProvento, setDataProvento] = useState();

  // index ativo no modal adicionar
  const [activeIndex, setActiveIndex] = useState();

  // estado do valor de saldo
  const [result, setResult] = useState(0);

  // redux
  const dadosCloud = useSelector((state) => state.stock)

  const [errorIntegridadeBanco, setErrorIntegridadeBanco] = useState(false);
  
  useEffect(() => {
    buscarAllSaidas(dadosCloud.id_logado).then((res) => {
      setDataSaida(res.data)
    })
    buscarAllProvento(dadosCloud.id_logado).then((res)=>{
      setDataProvento(res.data)
    })
  }, []);
  var res = 0;
  var resMenos = 0;
  useEffect(() => {
    if (dataSaida !== undefined && dataProvento !== undefined ) {
      dataProvento.map((key, item) => {
        res = dataProvento[item].valor + res
      })
      dataSaida.map((key, item) => {
        resMenos = dataSaida[item].valor + resMenos
      })
      setResult(res - resMenos)
    }
  },[dataProvento, dataSaida])


  // FORMIK SAIDA
  const formikSaida = useFormik({
    enableReinitialize: true,
    initialValues: formSaida,
    validate: (data) => {
      let errors = {};
      if (!data.categoriaDespesa.id_categoria_despesa) {
        errors.categoriaDespesa = "Categoria despesa é preenchimento obrigatorio";
      }
      // if (!data.provento.id_provento) {
      //   errors. = "Provento é preenchimento obrigatorio";
      // }
      if (!data.descricao) {
        errors.descricao = "Descrição é preenchimento obrigatorio";
      }
      if (!data.valor) {
        errors.valor = "Valor é preenchimento obrigatorio";
      }
      
      return errors;
    },
    onSubmit: async (data) => {
      await salvarSaida(data).then((res)=>{
        buscarAllSaidas(dadosCloud.id_logado).then((res) => {
          setDataSaida(res.data)
          setShowPutSaida(false)
          setShowPost(false)
        })
      });
    },
  });

  // FORMIK PROVENTO
  const formikProvento = useFormik({
    enableReinitialize: true,
    initialValues: formProvento,  
      validate: (data) => {
      let errors = {};
        if (!data.tipoEntrada.id_tipo_entrada) {
          errors.tipoEntrada = "Tipo Entrada é preenchimento obrigatorio";
        }
        if (!data.tipoMoeda.id_tipo_moeda) {
          errors.tipoMoeda = "Tipo Moeda é preenchimento obrigatorio";
        }
        if (!data.usuario.id_usuario) {
          errors.usuario = "Usuario é preenchimento obrigatorio";
        }
        if (!data.valor) {
          errors.valor = "Valor é preenchimento obrigatorio";
        }
        return errors;
    },
    onSubmit: async (data) => {
      await salvarProvento(data).then((res) => {
        buscarAllProvento(dadosCloud.id_logado).then((res)=>{
          setDataProvento(res.data)
          setShowPutProvento(false)
          setShowPost(false)
        })
      });
    },
  });

  function onEditarSaida(rowData) {
    setShowPutSaida(true)
    setFormSaida(rowData)
  }

  function onEditarProvento(rowData) {
    setShowPutProvento(true)
    setFormProvento(rowData)
  }

  function onExcluirProvento(rowData) {
    excluirProvento(rowData).then((res) => {
      if (res.data == 1) {
        setErrorIntegridadeBanco(true)  
      }
    });
    setTimeout(() => {
      buscarAllProvento(dadosCloud.id_logado).then((res) =>{
        setDataProvento(res.data)
      })
    }, 600);
  }

  function onExcluirSaida(rowData) {
    excluirSaida(rowData).then((res) => {});
    setTimeout(() => {
      buscarAllSaidas(dadosCloud.id_logado).then((res) =>{
        setDataSaida(res.data)
      })
    }, 600);
  }

  function onAdicionar() {
    console.log('chamou');
    formikSaida.resetForm();
    formikProvento.resetForm()
    setShowPost(true)
  }

  return (
    <Container>
      <Menu /> 
      <Content>
        <div style={{display:'flex', justifyContent: 'space-between'}}> 
          <h1 style={{marginTop:'0', fontSize:'22px', marginBottom:'40px', color:'#10B981'}}>Que bom ter você aqui, {dadosCloud.nome}! </h1>
          <h1 style={{marginTop:'0', marginBottom:'40px', color: result>100 ? '#10B981' : 'red', fontSize:'22px'}}>Saldo: R$ {result.toFixed(2)}</h1>
        </div>
        <TabView  >
          <TabPanel header="Provento" >
            
            { dataProvento !== undefined && dataProvento.length>=1 &&
              <Tabela 
                hasEventoAcao
                camposTabela={camposTabelaProvento}
                dados={dataProvento}
                onEditarDado={(rowData) => onEditarProvento(rowData)}
                onExcluirDado={(rowData) => onExcluirProvento(rowData)}
              /> 
            }
            {dataProvento == 0 &&
              <div style={{display:'flex', justifyContent:'center'}}>
                <h3 style={{color:'#10B981'}}>Crie um novo provento, você está sem proventos cadastrados atualmente!</h3>
              </div>
            }
          </TabPanel>
          <TabPanel header="Saída" >
            { dataSaida !== undefined && dataSaida.length>=1 &&
              <Tabela 
                hasEventoAcao
                camposTabela={camposTabelaSaida}
                dados={dataSaida}
                onEditarDado={(rowData) => onEditarSaida(rowData)}
                onExcluirDado={(rowData) => onExcluirSaida(rowData)}
              /> 
            }
            {dataSaida == 0 &&
              <div style={{display:'flex', justifyContent:'center'}}>
                <h3 style={{color:'#10B981'}}>Crie uma nova saída, você está sem saídas cadastradas atualmente!</h3>
              </div>
            }
          </TabPanel>
        </TabView>
        <More onClick={onAdicionar}>
          <i className="pi pi-plus" style={{fontSize:'28px', color:'white'}}/>  
        </More>
        <Modaladicionar 
          formikSaida={formikSaida}
          formikProvento={formikProvento}
          showPost={showPost}
          setShowPost={setShowPost}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          dataProvento={dataProvento}
          dataSaida={dataSaida}
        />
        <Modaleditaprovento
          formikProvento={formikProvento}
          showPutProvento={showPutProvento}
          setShowPutProvento={setShowPutProvento}
        />
        <Modaleditarsaida
          formikSaida={formikSaida}
          showPutSaida={showPutSaida}
          setShowPutSaida={setShowPutSaida}
        />
        <ModalErrorIntegridadeBanco
          errorIntegridadeBanco={errorIntegridadeBanco}
          setErrorIntegridadeBanco={setErrorIntegridadeBanco}
        />

        
      </Content>
    </Container>
  );
}

export default Home;
