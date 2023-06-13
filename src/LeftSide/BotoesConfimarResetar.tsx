import { Button } from 'antd';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { IntrucaoContext } from '../App';
import { TipoInstrucao } from '../Enums/TipoInstrucao';
import { TipoRegistrador } from '../Enums/TipoRegistrador';



const BotoesConfimarResetar: React.FC = () => {

    const {
        arrInstrucoes,
        arrCicloPorInstrucao,
        arrTipoRegistrador,
        arrRegistrador,
        setQuantidadeInstrucoes,
        arrEstacaoReserva,
        setConfirmado,
        setCicloAtual,
        arrBufferReordenamento,
    } = useContext(IntrucaoContext);

    const onCliqueConfirmar = () => {
        if (arrInstrucoes.value.length <= 0) {
            alert('Não há instruções para confirmar');
            return;
        }
        let ehValido = true;
        arrInstrucoes.value.forEach((i, ind) => {
            if ((i.nome === TipoInstrucao.Add || i.nome === TipoInstrucao.Sub || i.nome === TipoInstrucao.Mul || i.nome === TipoInstrucao.Ldr || i.nome === TipoInstrucao.Ldr) && (!i.entrada1 || !i.entrada2 || !i.entrada3)) {
                ehValido = false;
                alert(`'Instrução ${ind + 1}' ${i.nome} deve ter 3 entradas (entrada1 e entrada2 e entrada3)`);
            }
        })
        if (!ehValido)
            return;

        arrInstrucoes.setValue([...arrInstrucoes.value.map(i => {
            i.enviada = false;
            i.escrita = false;
            i.executada = false;
            i.commited = false;
            return i;
        })])
        arrRegistrador.setValue([...new Array(16).fill({ nome: '', valor: '' }).map((i, ind) => ({ nome: `F${ind}`, valor: '' }))])
        arrEstacaoReserva.setValue([...arrEstacaoReserva.value.map(er => {
            er.A = undefined;
            er.Ciclos = undefined;
            er.ocupada = false;
            er.operacao = undefined;
            er.registradorSendoUtilizado = undefined;
            er.Vj = undefined;
            er.Vk = undefined;
            er.destino = undefined;
            er.Qj = undefined;
            er.Qk = undefined;
            er.idInstrucao = undefined;
            return er;
        })])
        setCicloAtual(0);
        arrBufferReordenamento.setValue([]);
        setConfirmado(true);
    }

    const onCliqueResetar = () => {
        setConfirmado(false);
        setCicloAtual(0);
        arrInstrucoes.setValue([]);
        setQuantidadeInstrucoes(0);
        arrRegistrador.setValue([...new Array(16).fill({ nome: '', valor: '' }).map((i, ind) => ({ nome: `F${ind}`, valor: '' }))])
        arrTipoRegistrador.setValue(Object.keys(TipoRegistrador).map((i: any, ind: number) => {
            return (
                {
                    quantidade: 1,
                    TipoRegistrador: i
                }
            )
        }))
        arrCicloPorInstrucao.setValue(Object.keys(TipoInstrucao).map((i: any, ind: number) => {
            return (
                {
                    quantidade: 1,
                    TipoInstrucao: i
                }
            )
        }))
        setQuantidadeInstrucoes(1);
        arrBufferReordenamento.setValue([]);
    }

    return (
        <Wrapper>
            <div className='Wrapper-bottoes'>
                <div>
                    <Button
                        style={{ marginRight: '10px' }}
                        // disabled={confirmado && cicloAtual > 0}
                        type={'primary'}
                        onClick={() => onCliqueConfirmar()}
                    >
                        Confirmar
                    </Button>
                </div>
                <div>
                    <Button
                        onClick={() => onCliqueResetar()}
                    >
                        Resetar
                    </Button>
                </div>
            </div>
        </Wrapper >
    );
}

export default BotoesConfimarResetar;

const Wrapper = styled.div`
    position: absolute;
    bottom: 20px;
    .Wrapper-bottoes{
        display: flex;
        flex-direction: row;
    }
    -webkit-box-shadow: 8px 7px 28px -17px rgba(29,26,71,0.57);
    -moz-box-shadow: 8px 7px 28px -17px rgba(29,26,71,0.57);
    box-shadow: 8px 7px 28px -17px rgba(29,26,71,0.57);
`;
