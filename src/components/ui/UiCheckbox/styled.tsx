import styled, { css } from 'styled-components/macro'

export const Wrapper = styled.span.attrs(() => ({
  display: 'flex',
  role: 'checkbox',
  tabIndex: 0,
}))``

export const Label = styled.label`
  display: flex;
  align-items: center;
  color: #0F1521;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 21px;
  cursor: pointer;
`

export const Input = styled.input.attrs(() => ({
  'aria-hidden': true,
  tabIndex: -1,
  type: 'checkbox',
}))`
  position: absolute;
  z-index: -1;
  opacity: 0;
`

export const StyledCheckbox = styled.div<{checked?: boolean}>`
  display: flex;
  width: 34px;
  height: 24px;
  border-radius: 5px;
  border: 1px solid #0F1521;
  margin-right: 10px;
  align-items: center;

  ${({ checked }) => (checked ? css`
    box-shadow: inset -3px 4px 7px #0F1521;
  ` : '')}
`
