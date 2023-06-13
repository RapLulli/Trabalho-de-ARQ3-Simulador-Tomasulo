import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Input, Select } from "antd";
import React, { useContext } from "react";
import styled from "styled-components";
import { IntrucaoContext } from "../App";
import InputInstrucao from "./InputInstrucao";
import { Instrucao1, Instrucao2 } from "./InstrucoesPreProntas";
import BotoesConfimarResetar from "./BotoesConfimarResetar";

const ListaInstrucoes: React.FC = () => {
  const { quantidadeInstrucoes, setQuantidadeInstrucoes, arrInstrucoes } =
    useContext(IntrucaoContext);

  const GerarCampoInstrucoes = () => {
    const arrFragmentInstrucao: JSX.Element[] = [];
    for (let i = 0; i < quantidadeInstrucoes; i++)
      arrFragmentInstrucao.push(
        <InputInstrucao key={`index-ionpt-instrucao-${i}`} index={i} />
      );
    return arrFragmentInstrucao;
  };

  const onSelectExemplo = (value: number) => {
    if (value === 0) {
      arrInstrucoes.setValue([]);
      setQuantidadeInstrucoes(0);
      setTimeout(() => setQuantidadeInstrucoes(1), 100);
    }
    if (value === 1) {
      setQuantidadeInstrucoes(Instrucao1.length);
      setTimeout(() => arrInstrucoes.setValue(Instrucao1), 100);
    }
    if (value === 2) {
      setQuantidadeInstrucoes(Instrucao2.length);
      setTimeout(() => arrInstrucoes.setValue(Instrucao2), 100);
    }
  };

  return (
    <Wrapper
      title="Quantidade de Instruções"
      bodyStyle={{ overflowY: "scroll" }}
    >
      <div className="topo">
        <BotoesConfimarResetar />
      </div>
      <div className="selecione">
        <Select defaultValue={0} onSelect={onSelectExemplo}>
          <Select.Option value={0}>Selecione um exemplo</Select.Option>
          <Select.Option value={1}>Exemplo 1</Select.Option>
          <Select.Option value={2}>Exemplo 2</Select.Option>
        </Select>
        <div className="qtd-instrucoes">
          <Button
            onClick={() => {
              if (quantidadeInstrucoes === 1) return;
              setQuantidadeInstrucoes(quantidadeInstrucoes - 1);
            }}
          >
            <MinusOutlined />
          </Button>
          <Input
            type={"number"}
            value={quantidadeInstrucoes}
            onChange={(e) => {
              if (Number(e.target.value) <= 0) return;
              setQuantidadeInstrucoes(Number(e.target.value));
            }}
          />
          <Button
            onClick={() => setQuantidadeInstrucoes(quantidadeInstrucoes + 1)}
          >
            <PlusOutlined />
          </Button>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          marginTop: 15,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <label style={{ fontWeight: "bold" }}>Lista de instruções</label>
          <div style={{ width: "90%", alignSelf: "center" }}>
            {GerarCampoInstrucoes()}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default ListaInstrucoes;

const Wrapper = styled(Card)`
  display: flex;
  position: relative;
  flex-direction: column;
  height: 56vh;
  width: 90%;
  align-items: center;
  justify-content: flex-start;
  margin-top: 15px;

  .topo {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-bottom: 15px;
  }
  .selecione {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-bottom: 10px;
  }
  .qtd-instrucoes {
    display: flex;
    flex-direction: row;
    width: 40%;
  }
`;
