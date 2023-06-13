import { Card } from "antd";
import React, { useContext } from "react";
import styled from "styled-components";
import { IntrucaoContext } from "../App";

const TabelasInstrucoes: React.FC = () => {
  const { arrInstrucoes } = useContext(IntrucaoContext);

  return (
    <Wrapper title="Instruções" bodyStyle={{ overflowY: "scroll" }}>
      <STabela>
        <thead>
          <tr>
            <th>Instrução</th>
            <th>Enviada</th>
            <th>Executada</th>
            <th>Escrita</th>
          </tr>
        </thead>
        <tbody>
          {arrInstrucoes &&
          arrInstrucoes.value &&
          arrInstrucoes.value.length ? (
            arrInstrucoes.value.map((instrucao) => (
              <tr key={"idInstrucao-" + instrucao.id}>
                <td>
                  {instrucao.nome +
                    (!!instrucao.entrada1
                      ? ", " + instrucao.entrada1.toUpperCase()
                      : "") +
                    (!!instrucao.entrada2
                      ? ", " + instrucao.entrada2.toUpperCase()
                      : "") +
                    (!!instrucao.entrada3
                      ? ", " + instrucao.entrada3?.toUpperCase()
                      : "")}
                </td>
                <td>{instrucao.enviada ? "X" : ""}</td>
                <td>{instrucao.executada ? "X" : ""}</td>
                <td>{instrucao.escrita ? "X" : ""}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td>--</td>
              <td>--</td>
              <td>--</td>
              <td>--</td>
            </tr>
          )}
        </tbody>
      </STabela>
    </Wrapper>
  );
};

export default TabelasInstrucoes;

const Wrapper = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: fit-content;
  max-height: 60vh;
  -webkit-box-shadow: 8px 7px 28px -17px rgba(29, 26, 71, 0.57);
  -moz-box-shadow: 8px 7px 28px -17px rgba(29, 26, 71, 0.57);
  box-shadow: 8px 7px 28px -17px rgba(29, 26, 71, 0.57);
`;

const STabela = styled.table`
  border: 1px solid black;
  th {
    border: 1px solid gray;
    padding: 10px;
  }
  td {
    border: 1px solid gray;
    padding: 10px;
  }
`;
