import { useEffect, useState } from 'react';
import cls from './CheckBox.module.css';

export const CheckBox = (props) => {
  const {
    checked = false,
    item,
    onChange,
    style = {},
    text = '',
  } = props;
  const [check, setChecked] = useState(checked);
  useEffect(() => {
    setChecked(checked);
  }, [checked])
  const handleCheck = () => {
    onChange(item, check)
    setChecked(!check);
  }
  return (
  // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label
      className={cls.container}
      style={{ ...style, paddingLeft: text ? 35 : 0 }}
    >
      <span>{text}</span>
      {item ? (
        <input
          type='checkbox'
          checked={check}
          onChange={handleCheck}
        />
      ) : (
        <input
          type='checkbox'
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
        />
      )}
      <span className={cls.checkmark} />
    </label>
  );
};
