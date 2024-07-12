import {
  useRef,
  useState,
} from 'react';
import {
  DropdownContainer,
  DropdownList,
  DropdownItem,
  SelectContainer,
  DropdownButton,
} from './styled';
import { IconComponent } from '../../../assets/icons';
import { useOutsideClick } from '../../../hooks/index';

type Option = {
  checked?: boolean,
  label: string,
  value: string | number,
}

type Props = {
  disabled?: boolean,
  multiChoose?: boolean,
  onSelected: (option: Option) => void,
  options: Array<Option>,
  title: string,
}

export const UiDropdown = ({
  disabled = false,
  multiChoose = false,
  onSelected,
  options,
  title,
}: Props) => {
  const [isOpen, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  useOutsideClick({
    handleClick: () => setOpen(false),
    ref: dropdownRef,
  })

  return (
    <SelectContainer ref={dropdownRef} disabled={disabled}>
      <DropdownButton
        onClick={() => setOpen((prev) => !prev)}
      >
        {title}
        <IconComponent.ARROW />
      </DropdownButton>
      {isOpen && (
        <DropdownContainer>
          <DropdownList>
            {options?.map(({
              checked,
              label,
              value,
            }) => (
              <DropdownItem
                key={label}
                checked={checked}
                onClick={() => {
                  onSelected({
                    checked: true,
                    label,
                    value,
                  })
                  !multiChoose && setOpen(false)
                }}
              >
                {label}{checked}
              </DropdownItem>
            ))}
          </DropdownList>
        </DropdownContainer>
      )}
    </SelectContainer>
  )
}
