import Modal from './../Modal/modal';

const ModalLoginError = ({errorIntegridadeBanco, setErrorIntegridadeBanco}) => {
  function handleHide(params) {
    setErrorIntegridadeBanco(false)
  }
  return (
    <Modal
      tamanho="400px"
      fechar={handleHide}
      visible={errorIntegridadeBanco}
      titulo='Erro na exclusão'
    >
      <div 
        style={{color:'red'}}
      >
        Esse provento está sendo usado em alguma saida, por isso não pode ser excluído!</div>
    </Modal>
  );
}

export default ModalLoginError;
