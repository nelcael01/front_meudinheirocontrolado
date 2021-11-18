import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import "./modalstyle.css";

const Modal = (props) => {
  const footer = () => {
    if (props.type === "CONFIRMACAO") {
      return (
        <div className="modal-botoes-footer">
          <Button label="Sim" icon="pi pi-check" onClick={() => props.funcAcao()} autoFocus className="p-button-raised" />
          <Button label="Não" icon="pi pi-times" onClick={() => props.fechar()} className="p-button-raised p-button-danger" />
        </div>
      );
    } else if (props.type === "SIMPLES") {
      return (
        <div className="modal-botoes-footer">
          <Button label={props.edit ? "Editar" : "Enviar"} icon={props.edit ? "pi pi-pencil" : "pi pi-check"} onClick={() => props.funcAcao()} autoFocus className={props.edit ? "p-button-warning" : "p-button-raised"} />
          <Button label="Cancelar" icon="pi pi-times" onClick={() => props.fechar()} className="p-button-raised p-button-danger" />
        </div>
      );
    } else if(props.type === "SUBMIT"){
      return(
        <div className="modal-botoes-footer">
            <Button type='submit' label={props.edit ? "Editar" : "Enviar"} icon={props.edit ? "pi pi-pencil" : "pi pi-check"}  autoFocus className={props.edit ? "p-button-warning" : "p-button-raised"}  />
            <Button type='button' label="Cancelar" icon="pi pi-times" onClick={() => props.fechar()} className="p-button-raised p-button-danger" />
        </div>
      )
    }else if(props.type === "SEARCH"){
      return(
          <div className="modal-botoes-footer">
              <Button type='submit' label='Filtrar' icon="pi pi-search"  autoFocus className= "p-button-raised" />
              <Button type='button' label="Cancelar" icon="pi pi-times" onClick={() => props.fechar()} className="p-button-raised p-button-danger" />
          </div>
      )
    }else if(props.type === "CLOSE"){
      return(
        <div className="modal-botoes-footer">
            <Button type='button' label="Cancelar" icon="pi pi-times" onClick={() => props.fechar()} className="p-button-raised p-button-danger" />
        </div>
      )
    }else if(props.type === "NONE"){
      return(<></>)
    } else {
      return (
        <div className="modal-botoes-footer">
          <Button label={props.labelAcao ? props.labelAcao : "Enviar"} icon={props.iconAcao ? props.iconAcao : "pi pi-check"} onClick={() => props.funcAcao()} autoFocus className="p-button-raised margin-app-entre-button" type={props.isSubmit ? "submit" : "button"} />
          <Button label={props.labelFechar ? props.labelFechar : "Fechar"} icon={props.iconFechar ? props.iconFechar : "pi pi-times"} onClick={() => props.fechar()} className="p-button-raised p-button-danger margin-app-entre-button " />
        </div>
      );
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
