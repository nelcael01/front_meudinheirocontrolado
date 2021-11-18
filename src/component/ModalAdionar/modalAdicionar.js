import React from 'react';
import Modal from './../Modal/modal';
import { TabView, TabPanel } from 'primereact/tabview';

const Modaladicionar = ({showPost, setShowPost}) => {

  function handleHide() {
    setShowPost(false)
  }
  
  return (
    <Modal
      type="SUBMIT"
      tamanho="850px"
      fechar={handleHide}
      visible={showPost}
      titulo='Criar'
    >
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
              onEditarDado
              hasEventoAcao
              camposTabela={camposTabela}
            />  */}
          </TabPanel>
        </TabView>
    </Modal>
  );
}

export default Modaladicionar;
