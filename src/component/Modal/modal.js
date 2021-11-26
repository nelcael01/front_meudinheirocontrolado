import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import "./modalstyle.css";

const Modal = (props) => {
  const footer = () => {
    if(props.type === "CLOSE"){
      return(
        <div className="modal-botoes-footer">
            <Button
              type='button'
              label="Fechar" 
              icon="pi pi-times" 
              onClick={() => props.fechar()} 
              className="p-button-raised p-button-danger" 
              style={{}}
            />
        </div>
      )
    }   
  };

  return (
    <Dialog header={props.titulo} footer={footer()} visible={props.visible} style={{ width: props.tamanho ? props.tamanho : "70px", height: props.altura ? props.altura : "auto"}} modal onHide={() => props.fechar()}>
      <div className="margin-superior-simples quebrar-texto">
        <div className="p-grid p-fluid">{props.children}</div>
      </div>
    </Dialog>
  );
};

export default Modal;
