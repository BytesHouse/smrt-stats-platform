import styled from 'styled-components/macro';

export const OffsetContainerSc = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
`

export const InputSc = styled.input`
    width: 45px;
    padding-left: 40px;
    border-radius: 5px;
    border: 0.3px solid rgba(8, 184, 57, 0.80);
    background: #0F1521;
    color: white;
`

export const CircleSc = styled.div`
    border: 4px solid #08B839;
    border-radius: 50%;
`

export const InnerCircleSc = styled.div`
    background: #FFFFFF;
    box-shadow: inset 1px 2px 1px -1px #5E5757, inset 1px 2px 1px -1px #5E5757, inset 2px 1px 4px -1px #000000;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: 4px solid #313131;
`
