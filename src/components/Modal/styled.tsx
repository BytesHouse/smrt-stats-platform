import styled from 'styled-components/macro';

export const ScModal = styled.div`
    font-family: Hind Jalandhar,serif;
    position: absolute;
    top: 0;
    right: 0;
    padding: 12px;
    background: #F5F5F5;
    border: 1px solid #FFFFFF;
    border-radius: 10px;
    width: 94%;
    color: #0F1521;
    max-width: 574px;
`

export const ScModalHeader = styled.div`
`

export const ScModalContent = styled.div`
`

export const ScModalFooter = styled.div`
  display: flex;
  justify-content: center;
`

export const ScModalCloseButton = styled.button`
  font-size: 15px;
  position: absolute;
  right: 14px;
  top: 14px;
  height: 30px;
  width: 30px;
  color: white;
  border-radius: 50%;
  border: 1px solid white;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ScModalFooterButton = styled.button`
  display: flex;
  width: 152px;
  height: 45px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #FFFFFF;
  border-radius: 10px;
  color: #FFF;
  background-color: #171F2F;
  font-size: 24px;
  font-weight: 500;
  line-height: 24px;
  text-transform: uppercase;
  padding-top: 8px;
`
