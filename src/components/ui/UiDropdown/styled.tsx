import styled, { css } from 'styled-components/macro';

export const SelectContainer = styled.div<{disabled?: boolean}>`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;

    ${({ disabled }) => (disabled ? css`
        background-color: gray;
        color: #b6b6b6;
    ` : '')}
`;

export const DropdownContainer = styled.div`
  z-index: 2;
  position: absolute;
  top: 30px;
  width: 100%;
  border-radius: 5px;
  display: flex;
  background-color: #171F2F;
`

export const DropdownList = styled.ul`
  padding: 0;
  margin: 0;
  width: 100%;
  max-height: 150px;
  border: 1px solid white;
    border-radius: 5px;
  overflow-y: auto;
`

export const DropdownItem = styled.li<{checked?: boolean}>`
  list-style: none;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  border: 1px solid black;
  padding: 5px 10px;
  cursor: pointer;
  min-height: 30px;

    ${({ checked }) => (checked ? css`
        background-color: var(--main-light-blue);
        color: #0f1521;
  ` : 'background-color: #F5F5F5;')}
  
  &:hover{
    opacity: 0.5;
  }
`

export const DropdownButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  border: 1px solid black;
  cursor: pointer;
  width: 100%;
  height: 34px;
  padding: 0px 5px 0 10px ;
  box-sizing: border-box;
  font-size: 15px;
`

