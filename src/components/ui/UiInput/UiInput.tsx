import { ChangeEvent, RefObject } from 'react';
import {
  InputContainer,
  ScInput,
  ScLabel,
} from './styled';

type Props = {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void,
  innerRef?: RefObject<HTMLInputElement>,
  label?: string,
  placeholder?: string,
  value: string,
}

export const UiInput = ({
  handleChange,
  innerRef,
  label,
  placeholder,
  value,
}: Props) => (
  <InputContainer
    onClick={(e) => {
      e.preventDefault()
      e.stopPropagation()
    }}
  >
    <ScLabel>
      {label ?? ''}
    </ScLabel>
    <ScInput
      type='text'
      ref={innerRef}
      onInput={handleChange}
      value={value}
      placeholder={placeholder ?? ''}
    />

  </InputContainer>
)

