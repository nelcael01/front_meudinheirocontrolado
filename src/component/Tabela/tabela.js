import React, { useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import moment from "moment";
import PropTypes from "prop-types";
import { Dialog } from "primereact/dialog";

import "./tabela_styled.css";
const Index = (props) => {
  const [selected, setSelected] = useState(null);
  const dt = useRef(null);
  const [visible, setVisible] = useState(false);
  const [lazyParams, setLazyParams] = useState({
    first: 0,
    rows: 10,
    page: 0,
  });
  const [rows, setRows] = useState(10);

  const confirmarExclucao = () => {
    setVisible(false);
    props.onExcluirDado(selected);
  };

  const handleExcluir = (event, rowData) => {
    event.preventDefault();
    setSelected(rowData);
    setVisible(true);
  };

  const actionBotoes = (rowData) => {
    return (
      <React.Fragment>
        <div style={{display:'flex'}}>
          {props.onEditarDado && <Button type="button"   tooltip="Editar" tooltipOptions={{position: 'top'}}  icon="pi pi-pencil" className="p-button-warning" onClick={() => props.onEditarDado(rowData)} style={props.onExcluirDado ? { marginRight: ".5em" } : {}} />}
          {props.onExcluirDado && <Button type="button" tooltip="Excluir" tooltipOptions={{position: 'top'}}  icon="pi pi-trash" className="p-button-danger" onClick={(e) => handleExcluir(e, rowData)} />}
        </div>
      </React.Fragment>
    );
  };

  const colunaTabela = (objeto, campo) => {
    var dataColuna = "";
    if (campo.nome.indexOf(".") < 0) {
      if (campo.displayFormat) {
        if (campo.displayFormat == "currency-pt-br") {
          const currencyBRL = (value) => {
            const formattedValue = value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

            return formattedValue;
          };
          return currencyBRL(objeto[campo.nome]);
        } else {
          dataColuna = moment(objeto[campo.nome]).format(campo.displayFormat);
          return dataColuna;
        }
      }
      return objeto[campo.nome];
    } else {
      var arryCampos = campo.nome.split(".");
      let colunasArray = objeto;
      for (let i = 0; i < arryCampos.length; i++) {
        if (colunasArray[arryCampos[i]]) {
          colunasArray = colunasArray[arryCampos[i]];
        } else {
          break;
        }
      }

      if (campo.displayFormat) {
        if (moment(colunasArray).isValid()) {
          dataColuna = moment(colunasArray).format(campo.displayFormat);
          return dataColuna;
        }
      }

      if (colunasArray) {
        if (typeof colunasArray != "object") {
          return colunasArray;
        } else {
          return "Não Informado";
        }
      } else {
        return "";
      }
    }
  };

  const Coluna = (rowData, campo) => {
    return (
      <>
        <span className={"p-column-title"}>{campo.titulo}:</span>
        {colunaTabela(rowData, campo)}
      </>
    );
  };

  const renderFooter = () => {
    return (
      <div>
        <Button label="Não" type="button" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
        <Button label="Sim" type="button" icon="pi pi-check" onClick={confirmarExclucao} autoFocus />
      </div>
    );
  };

  return (
    <div className={"datatable-responsive-demo"}>
      <div className="card">
        <DataTable
          ref={dt}
          value={props.dados}
          className={"p-datatable-responsive-demo"}
          dataKey="id"
          rowHover
          onSelectionChange={(e) => setSelected(e.value)}
          rows={rows}
          lazy={props.totalRecords ? true : false}
          rowsPerPageOptions={[10, 25, 50]}
          first={lazyParams.first}
        >
          {props.camposTabela && props.camposTabela.map((campo, i) => <Column field={campo.nome} header={campo.titulo} body={(rowData) => Coluna(rowData, campo)} key={i} />)}
          {props.children}
          {props.hasEventoAcao && <Column headerStyle={{ width: props.tamnhoAcao ? props.tamnhoAcao : "8em", textAlign: "center" }} bodyStyle={{ textAlign: "center" }} body={actionBotoes} header="Ação" />}
        </DataTable>
      </div>

      <Dialog header="Confirmação" visible={visible} footer={renderFooter("displayBasic")} onHide={() => setVisible(false)}>
        <p>Deseja realmente remover o registro selecionado? </p>
      </Dialog>
    </div>
  );
};

Index.propTypes = {
  camposTabela: PropTypes.array.isRequired,
  dados: PropTypes.array.isRequired,
  hasEventoAcao: PropTypes.bool,
  onEditarDado: PropTypes.func,
  onExcluirDado: PropTypes.func,
  onAdicionarDado: PropTypes.func,
  botoesAcoes: PropTypes.func,
};

export default Index;
