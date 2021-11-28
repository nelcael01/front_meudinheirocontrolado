import Modal from './../Modal/modal';
import Rotulo from './../Rotulo/rotulo';
import { InputText } from 'primereact/inputtext';
import { classNames, getFormErrorMessage, isFormFieldValid } from '../../config/global';

const ModalMudarSenha = ({setActiveMudarSenha, activeMudarSenha, formikMudarSenha, resultado, setResultado}) => {
  function handleHide(params) {
    setActiveMudarSenha(false)
    setResultado('')
  }
  return (
    <Modal
      tamanho="400px"
      fechar={handleHide}
      visible={activeMudarSenha}
      titulo='Atualizar Senha'
    >
      <form form onSubmit = {formikMudarSenha.handleSubmit}>
        <Rotulo nome="Usuário" cols="12 4" obrigatorio>
          <InputText 
          id="nome"
          name="nome"
          value={formikMudarSenha.nome}
          className={classNames({ "p-invalid": isFormFieldValid("nome", formikMudarSenha) })}
          onChange={(e) => formikMudarSenha.handleChange(e)}
          />
          {getFormErrorMessage("nome", formikMudarSenha)}
        </Rotulo> 
        <Rotulo nome="Nova senha" cols="12 4" obrigatorio>
          <InputText 
          id="senha"
          name="senha"
          value={formikMudarSenha.senha}
          className={classNames({ "p-invalid": isFormFieldValid("senha", formikMudarSenha) })}
          onChange={(e) => formikMudarSenha.handleChange(e)}
          />
          {getFormErrorMessage("senha", formikMudarSenha)}
        </Rotulo>
        <div >
          <button
            type='submit'
            style={{
              border:'none', 
              backgroundColor:'#10B981', 
              display: 'flex',
              alignItems:'center',
              justifyContent:'center',
              color: 'white', 
              fontSize:'22px', 
              borderRadius:'5px', 
              marginTop:'30px', 
              paddingTop:'8px',
              paddingBottom:'8px',
              paddingLeft:'25px',
              paddingRight:'25px'
            }}
          >Atualizar</button>
        </div>
      </form>
      <div 
        style={{marginTop:'20px', fontSize:'22px', borderRadius:'15px', display:'flex',  color: resultado == 'Atualizado!' ? '#10B981' : "red" , alignItems:'center', justifyContent:'center', fontWeight:'bold'}}
      >
        {resultado}
      </div>
    </Modal>
  );
}

export default ModalMudarSenha;
