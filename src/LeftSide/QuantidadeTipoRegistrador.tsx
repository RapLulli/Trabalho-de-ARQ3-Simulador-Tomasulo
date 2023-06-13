import { Card, Input } from 'antd';
import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { IEstacaoReserva, IntrucaoContext } from '../App';
import { TipoRegistrador } from '../Enums/TipoRegistrador';

interface IProps {
}

const QuantidadeTipoRegistrador: React.FC<IProps> = () => {
    const {
        arrEstacaoReserva,
        arrTipoRegistrador,
        confirmado,
    } = useContext(IntrucaoContext);

    //@ts-ignore
    var groupBy = function (xs, key): {} {
        //@ts-ignore
        return xs.reduce(function (rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    };

    const onArrTipoRegistradorChanges = () => {
        const arrAux: IEstacaoReserva[] = [];
        const arrayAgrupado = groupBy(arrTipoRegistrador.value, "TipoRegistrador");
        Object.keys(TipoRegistrador).forEach(tr => {
            //@ts-ignore
            arrayAgrupado[tr].forEach((g) => {
                for (let i = 0; i < g.quantidade; i++) {
                    arrAux.push({
                        nome: `${g.TipoRegistrador}${i + 1}`,
                        TipoRegistrador: g.TipoRegistrador,
                        ocupada: false,
                    })
                }
            })
        })

        arrEstacaoReserva.setValue([...arrAux]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(onArrTipoRegistradorChanges, [arrTipoRegistrador.value])

    return (
        <Wrapper
            title="Quantidade tipo registrador"
        >
            {
                Object.keys(TipoRegistrador).map((i: any, ind: number) =>
                    <div className='tipo-registrador' key={'tipo-registrador-' + ind}>
                        <label>
                            {i}
                        </label>
                        <Input
                            value={arrTipoRegistrador.findByStringId(i, 'TipoRegistrador').quantidade}
                            type="number"
                            onChange={(e) => {
                                if (Number(e.target.value) <= 0) return;
                                arrTipoRegistrador.setValue(
                                    [
                                        ...arrTipoRegistrador.value.map(cpi => {
                                            if (cpi.TipoRegistrador === i) {
                                                cpi.quantidade = Number(e.target.value);
                                            }
                                            return cpi;
                                        })
                                    ])
                            }}
                        />

                    </div>
                )
            }
        </Wrapper>
    );
}

export default QuantidadeTipoRegistrador;

const Wrapper = styled(Card)`
    display: flex;
	flex-direction: column;
    align-items: center;
    width: 45%;

    -webkit-box-shadow: 8px 7px 28px -17px rgba(29,26,71,0.57);
    -moz-box-shadow: 8px 7px 28px -17px rgba(29,26,71,0.57);
    box-shadow: 8px 7px 28px -17px rgba(29,26,71,0.57);
    .tipo-registrador{
        display: flex;
        flex-direction: row;
        margin-bottom: 3px;
        align-items: center;
        justify-content: center;
    }
    label{
        width: 45%;
    }
`;
