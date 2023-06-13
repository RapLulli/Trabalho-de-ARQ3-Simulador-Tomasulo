import React from 'react';
import styled from 'styled-components';
import BotoesConfimarResetar from './BotoesConfimarResetar';
import CiclosPorInstrucao from './CiclosPorInstrucao';
import ListaInstrucoes from './ListaInstrucoes';
import QuantidadeTipoRegistrador from './QuantidadeTipoRegistrador';



const LeftSideScreen: React.FC = () => {

    return (
        <Wrapper>
            <ListaInstrucoes />
            <div className='wrapper-ciclos-registrador'>
                <CiclosPorInstrucao />
                <QuantidadeTipoRegistrador />
            </div>
            <BotoesConfimarResetar />
        </Wrapper >
    );
}

export default LeftSideScreen;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
    position: relative;
    height: 100%;

    .wrapper-ciclos-registrador{
        display: flex;
        flex-direction: row;
        margin-top: 15px;
        justify-content: space-around;
    }
`;
