import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Input, Select } from "antd";
import React, { useContext } from "react";
import styled from "styled-components";
import { IntrucaoContext } from "../App";
import InputInstrucao from "./InputInstrucao";
import { Instrucao1, Instrucao2 } from "./InstrucoesPreProntas";

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
      title="Quantidade de instruções"
      bodyStyle={{ overflowY: "scroll" }}
    >
      <div className="selecione-exemplo">
        <Select defaultValue={0} onSelect={onSelectExemplo}>
          <Select.Option value={0}>Ou selecione um exemplo</Select.Option>
          <Select.Option value={1}>Exemplo 1</Select.Option>
          <Select.Option value={2}>Exemplo 2</Select.Option>
        </Select>
      </div>
      <div className="qtd-instrucoes-wrapper">
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
        }}
      >
        <Card
          title="Lista de instruções"
          type="inner"
          style={{ width: "90%", alignSelf: "center" }}
          // bodyStyle={{ width: '10%' }}
        >
          {GerarCampoInstrucoes()}
        </Card>
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
  -webkit-box-shadow: 8px 7px 28px -17px rgba(29, 26, 71, 0.57);
  -moz-box-shadow: 8px 7px 28px -17px rgba(29, 26, 71, 0.57);
  box-shadow: 8px 7px 28px -17px rgba(29, 26, 71, 0.57);

  .selecione-exemplo {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  .qtd-instrucoes-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    .qtd-instrucoes {
      display: flex;
      flex-direction: row;
    }
  }
`;
