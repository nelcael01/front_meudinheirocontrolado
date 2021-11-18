import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import moment from "moment";
import PropTypes from "prop-types";
import { Dialog } from "primereact/dialog";

import "./tabela_styled.css";
const Index = (props) => {
  const [selected, setSelected] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const dt = useRef(null);
  const [visible, setVisible] = useState(false);
  const [lazyParams, setLazyParams] = useState({
    first: 0,
    rows: 10,
    page: 0,
  });
  const [rows, setRows] = useState(10);

  const handleSearchKeyPress = (e) => {
    if (e.code === "Enter") {
      props.onSearch(globalFilter);
    }
  };

  const renderHeader = () => {
    if (props.hasCabecalhoDinamic) return;
    return (
      <div className="table-header p-grid p-fluid p-justify-between p-align-center">
        {props.onAdicionarDado && (
          <div className="p-col-12 p-md-3 p-lg-2">
            <Button label="Adicionar" icon="pi pi-plus" className="p-button-raised" onClick={props.onAdicionarDado} />
          </div>
        )}
        {props.onModalSearch && (
          <div className="p-col-12 p-lg-4" style={{display:"flex"}}>
            <Button label="Exportar" icon="pi pi-cloud-download" className="p-button-raised" onClick={props.onExportar} style={{marginRight:'10px'}} />
            <Button label="Imprimir" icon="pi pi-print" className="p-button-raised" onClick={props.onImprimir} style={{marginRight:'10px'}}/>
            {/* <Button label="Filtrar" icon="pi pi-search" className="p-button-raised" onClick={props.onModalSearch} /> */}
          </div>
        )}
        {props.onSearch && (
          <div className=" p-col-12 p-md-4">
            <div className="p-grid p-fluid p-align-center">
              <div className="p-col">
                <InputText size="50" type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder={props.searchPlaceholder ? props.searchPlaceholder : "Pesquisa Global"} onKeyPress={handleSearchKeyPress} />
              </div>
              <i className="pi pi-search" onClick={() => props.onSearch(globalFilter)} style={{ cursor: "pointer" }} />
            </div>
          </div>
        )}
      </div>
    );
  };

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
        {props.onEditarDado && <Button type="button"   tooltip="Editar" tooltipOptions={{position: 'top'}}  icon="pi pi-pencil" className="p-button-warning" onClick={() => props.onEditarDado(rowData)} style={props.onExcluirDado ? { marginRight: ".5em" } : {}} />}
        {props.onExcluirDado && <Button type="button" tooltip="Excluir" tooltipOptions={{position: 'top'}}  icon="pi pi-trash" className="p-button-danger" onClick={(e) => handleExcluir(e, rowData)} />}
        {props.onView &&
          <>
            <Button type="button" style={{marginLeft:'1vh', marginBottom:'1vh'}} tooltip="Visualizar" tooltipOptions={{position: 'top'}}  icon="pi pi-eye" className="Primary" onClick={() => props.onView(rowData)} />
            <Button type="button" style={{marginLeft:'1vh', marginBottom:'1vh'}} tooltip="Imprimir" tooltipOptions={{position: 'top'}}  icon="pi pi-print " className="Primary" onClick={() => props.onImpressao(rowData)} />
          </>
        }
        {props.onCalender && <Button type="button" icon="pi pi-calendar-plus" className="Primary" onClick={() => props.onCalender(rowData)} />}
        {props.botoesAcoes && props.botoesAcoes(rowData)}
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

  const handleOnPage = (event) => {
    if (props.onPage) {
      props.onPage(event);
    }
    let _lazyParams = { ...lazyParams, ...event };
    setLazyParams(_lazyParams);
    setRows(event.rows);
  };

  return (
    <div className={"datatable-responsive-demo"}>
      <div className="card">
        <DataTable
          ref={dt}
          value={props.dados}
          header={renderHeader()}
          className={"p-datatable-responsive-demo"}
          dataKey="id"
          rowHover
          selection={selected}
          onSelectionChange={(e) => setSelected(e.value)}
          paginator={props.semPaginacao ? false : true}
          rows={rows}
          lazy={props.totalRecords ? true : false}
          emptyMessage="Nenhum registro encontrado"
          totalRecords={props.totalRecords}
          currentPageReportTemplate="Mostrando {first} à {last} de {totalRecords} registros"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          rowsPerPageOptions={[10, 25, 50]}
          onPage={handleOnPage}
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
  totalRecords: PropTypes.number,
  hasEventoAcao: PropTypes.bool,
  hasCabecalhoDinamic: PropTypes.bool,
  semPaginacao: PropTypes.bool,
  onEditarDado: PropTypes.func,
  onView: PropTypes.func,
  onExcluirDado: PropTypes.func,
  onCalender: PropTypes.func,
  onAdicionarDado: PropTypes.func,
  botoesAcoes: PropTypes.func,
  onSearch: PropTypes.func,
  onImpressao: PropTypes.func,
  onImprimir: PropTypes.func,
  onExportar:PropTypes.func,
  onPage: PropTypes.func,
};

export default Index;
