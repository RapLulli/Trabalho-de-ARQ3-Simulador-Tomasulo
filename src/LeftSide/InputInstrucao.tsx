import { Input, Select } from "antd";
import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { IntrucaoContext } from "../App";
import { TipoInstrucao } from "../Enums/TipoInstrucao";

interface IProps {
  index: number;
}

const InputInstrucao: React.FC<IProps> = ({ index }) => {
  const { arrInstrucoes, confirmado } = useContext(IntrucaoContext);

  const AssociarInstrucao = (valor: string, indexInstrucao: number) => {
    const newArray = arrInstrucoes.value.map((i, ind) => {
      if (ind === index) {
        if (indexInstrucao === 1) i.entrada1 = valor?.toUpperCase();
        else if (indexInstrucao === 2) i.entrada2 = valor?.toUpperCase();
        else if (indexInstrucao === 3) i.entrada3 = valor?.toUpperCase();
        else if (indexInstrucao === 4) i.nome = valor as any;
      }
      return i;
    });
    arrInstrucoes.setValue([...newArray]);
  };

  const onMount = () => {
    if (index >= arrInstrucoes.length)
      arrInstrucoes.push({
        id: index + 1 + "",
        nome: "Add",
        enviada: false,
        executada: false,
        escrita: false,
        commited: false,
        entrada1: "",
        entrada2: "",
        entrada3: "",
        descartada: false,
      });
    return () => {
      arrInstrucoes.removeIndex(index);
    };
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(onMount, []);

  return (
    <Wrapper>
      <label style={{ marginRight: "12px" }}>Inst{index + 1}</label>
      <Select
        style={{ width: "75px", marginRight: "2px" }}
        value={arrInstrucoes.value[index]?.nome ?? TipoInstrucao.Add}
        defaultValue={arrInstrucoes.value[index]?.nome ?? TipoInstrucao.Add}
        onChange={(valor) => {
          AssociarInstrucao(valor, 4);
        }}
      >
        {Object.keys(TipoInstrucao).map((i: any, ind: number) => (
          <Select.Option
            disabled={confirmado}
            key={"option-tipo-instrucao-" + ind}
            value={i}
          >
            <div>
              <label>{i}</label>
            </div>
          </Select.Option>
        ))}
      </Select>
      <Input
        disabled={confirmado}
        placeholder="Destino"
        value={arrInstrucoes.value[index]?.entrada1 ?? ""}
        onChange={(e) => {
          AssociarInstrucao(e.target.value, 1);
        }}
      />
      <Input
        disabled={confirmado}
        placeholder="Origem"
        value={arrInstrucoes.value[index]?.entrada2 ?? ""}
        onChange={(e) => {
          AssociarInstrucao(e.target.value, 2);
        }}
      />
      <Input
        disabled={confirmado}
        placeholder="Origem"
        value={arrInstrucoes.value[index]?.entrada3 ?? ""}
        onChange={(e) => {
          AssociarInstrucao(e.target.value, 3);
        }}
      />
    </Wrapper>
  );
};

export default InputInstrucao;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 2px;
  width: 100%;
  padding: 2px;

  input {
    width: 100px;
    margin-right: 2px;
  }
`;
