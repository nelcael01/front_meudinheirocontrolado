import Modal from './../Modal/modal';

const ModalLoginError = ({setLoginError, LoginError}) => {
  function handleHide(params) {
    setLoginError(false)
  }
  return (
    <Modal
      tamanho="400px"
      fechar={handleHide}
      visible={LoginError}
      titulo='Erro no Login'
    >
      <div 
        style={{color:'red'}}
      >
        Senha ou usuário inválido!</div>
    </Modal>
  );
}

export default ModalLoginError;
