import React from 'react';
import cls from './Input.module.css';

export const Input = (props) => {
  const {
    onChange,
    placeholder = '',
    style = {},
    type = 'text',
    value,
    ...otherProps
  } = props;

  return (
    <input
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...otherProps}
      className={cls.input}
      style={style}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
    />
  );
};
