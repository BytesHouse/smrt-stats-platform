import styled from 'styled-components/macro';

export const ScHintWrapper = styled.div<{coord_x: number, coord_y: number}>`
  z-index: 2;
  display: flex;
  width: 373px;
  position: fixed;
  left: ${({ coord_x }) => `${coord_x - 1000}px`};
  bottom: ${({ coord_y }) => `${coord_y - 335}px`};
  background-color: #FFF;
  border: 2px solid #24F2FF;
  flex-direction: row;
  font-family: Hind Jalandhar;
  color: #000;
  border-radius: 10px;
  text-transform: capitalize;
  font-size: 10px;
  font-weight: 300;
  transform: scale(1, -1);
`

export const ScName = styled.span`
  font-size: 14px;
  font-weight: 600;
`
export const ScMatchInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

export const ScInfo = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: start;
  padding: 5px;
  gap: 5px;
`
export const ScImg = styled.img`
  width: 44px !important;
  height: 44px !important;
  object-fit: cover;
`

export const ScDivider = styled.hr`
  width: 196px;
  border-top: 0.5px solid #787878;
  margin: 0;
`

export const ScAction = styled.span`
  color: #030303;
  font-weight: 500;
  text-decoration-line: underline;
`

export const ScRecipient = styled.span`
  color: #030303;
  font-weight: 500;
`
