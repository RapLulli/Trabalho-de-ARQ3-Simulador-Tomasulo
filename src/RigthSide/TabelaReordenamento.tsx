import { Card } from 'antd';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { IInstrucoes, IntrucaoContext } from '../App';


const TabelaReordenamento: React.FC = () => {
    const {
        arrBufferReordenamento,
        arrInstrucoes,
    } = useContext(IntrucaoContext);

    const getEstadoInstrucao = (intrucao: IInstrucoes) => {
        if (intrucao.descartada)
            return 'Descartada';
        if (intrucao.commited)
            return "Commit";
        if (intrucao.escrita)
            return "Write back";
        if (intrucao.executada)
            return "Executed";
        if (intrucao.enviada)
            return "Issue";
        return "????";
    }

    return (
        <Wrapper
            title={'Buffer de Reordenamento'}
            bodyStyle={{ overflowY: 'scroll' }}
        >
            <STabela>
                <thead>
                    <tr>
                        <th>Entrada</th>
                        <th>Ocupado</th>
                        <th>Instrução</th>
                        <th>Estado</th>
                        <th>Destino</th>
                        {/* <th>Valor</th> */}
                    </tr>
                </thead>
                <tbody>
                    {
                        (arrInstrucoes && arrInstrucoes.value && arrInstrucoes.value.length)
                        && arrInstrucoes.value.map((instrucao, ind) => {
                            const buffer = arrBufferReordenamento.value.find(b => b.idInstrucao === instrucao.id);

                            return (
                                <tr style={{ backgroundColor: instrucao.descartada ? '#b6090990' : 'white' }}>
                                    <td>{ind + 1}</td>
                                    <td>{!instrucao.commited && !instrucao.descartada ? 'X' : ''}</td>
                                    <td>
                                        {
                                            instrucao.nome +
                                            (!!instrucao.entrada1 ? ", " + instrucao.entrada1.toUpperCase() : '') +
                                            (!!instrucao.entrada2 ? ", " + instrucao.entrada2.toUpperCase() : '') +
                                            (!!instrucao.entrada3 ? ", " + instrucao.entrada3?.toUpperCase() : '')
                                        }
                                    </td>
                                    <td>{!buffer && !instrucao.descartada ? '' : getEstadoInstrucao(instrucao)}</td>
                                    <td>{instrucao.entrada1}</td>
                                    {/* <td>TODO</td> */}
                                </tr>)
                        }
                        )
                    }
                </tbody>
            </STabela>
        </Wrapper >
    );
}

export default TabelaReordenamento;

const Wrapper = styled(Card)`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
    height: fit-content;
    max-height: 60vh;
    -webkit-box-shadow: 8px 7px 28px -17px rgba(29,26,71,0.57);
    -moz-box-shadow: 8px 7px 28px -17px rgba(29,26,71,0.57);
    box-shadow: 8px 7px 28px -17px rgba(29,26,71,0.57);
`;

const STabela = styled.table`
	border: 1px solid black;
	th{
		border: 1px solid gray;
		padding: 10px;
	}
	td { 
		border: 1px solid gray;
		padding: 10px;
	}
`;

