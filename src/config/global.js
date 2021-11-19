import { v4 as uuidv4 } from "uuid";

export function printToast({ severity = "success", summary = "", detail = "" }) {
  let maiorMessage = summary.length > detail.length ? summary : detail;
  let messageLength = maiorMessage.split(" ").length;
  let life = (messageLength * 60000) / 150;
  window.$toast.current.show({ severity, summary, detail, life });
}

export const optionsAtivoInativo = [
  { name: "Inativo", code: 0 },
  { name: "Ativo", code: 1 },
];

export function classNames(parm) {
  let classes = "";

  for (let key of Object.keys(parm)) {
    if (parm[key]) {
      classes += ` ${key}`;
    }
  }

  return classes;
}

export const isFormFieldValid = (name, formik) => !!(formik.touched[name] && formik.errors[name]);

export const getFormErrorMessage = (name, formik) => {
  return isFormFieldValid(name, formik) && <small className="p-error">{formik.errors[name]}</small>;
};

export const summaryCriacaoSucessoPadrao = "Criação concluída";
export const detailCriacaoSucessoPadrao = "O registro foi inserido com sucesso";

export const summaryAlteracaoSucessoPadrao = "Alteração concluída";
export const detailAlteracaoSucessoPadrao = "O registro foi alterado com sucesso";

export const summaryExclusaoSucessoPadrao = "Exclusão concluída";
export const detailExclusaoSucessoPadrao = "O registro foi excluído com sucesso";

export const getUUID = () => {
  return uuidv4();
};

export const formatoContatos = ({ telefones }) => {
  telefones = telefones.split(" ");
  let telefonesAjustado = [];
  if (telefones.length > 1) {
    for (let i = 0; i < telefones.length; i++) {
      if (telefones[i] != "") {
        if (telefones[i].length == 11) {
          telefonesAjustado.push(telefones[i].replace(/(\d{2})?(\d{5})?(\d{4})/, "($1)$2-$3"));
          telefonesAjustado.push(<br />);
        } else if (telefones[i].length == 12) {
          telefonesAjustado.push(telefones[i].replace("0", "").replace(/(\d{2})?(\d{5})?(\d{4})/, "($1)$2-$3"));
          telefonesAjustado.push(<br />);
        } else {
          telefonesAjustado.push(telefones[i].replace(/(\d{2})?(\d{4})?(\d{4})/, "($1)$2-$3"));
          telefonesAjustado.push(<br />);
        }
      }
    }
  }
  if (telefonesAjustado != "") {
    return telefonesAjustado;
  } else {
    return telefones;
  }
};
