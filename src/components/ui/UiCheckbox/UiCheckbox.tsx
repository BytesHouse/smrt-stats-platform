import type { ReactNode, InputHTMLAttributes } from 'react'

import {
  Wrapper,
  Input,
  Label,
  StyledCheckbox,
} from './styled'

type Props = Pick<InputHTMLAttributes<HTMLInputElement>, (
  | 'checked'
  | 'className'
  | 'id'
  | 'name'
  | 'onClick'
  | 'onChange'
)> & {
  label?: ReactNode,
  text?: string,
}

export const UiCheckbox = ({
  checked,
  className,
  id,
  label,
  name,
  onChange,
  onClick,
  text,
}: Props) => (
  <Wrapper className={className}>
    <Label>
      <Input
        id={id}
        name={name}
        defaultChecked={checked}
        onClick={onClick}
        onChange={onChange}
      />
      <StyledCheckbox checked={checked} />
      {text ? (<span>{text}</span>) : label}
    </Label>
    {!!checked}
  </Wrapper>
)
