import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

export const TDTableItemMatchesPlayer = ({
  canHover = true,
  link,
  onClick,
  style = {},
  value,
}) => {
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const styleHover = useMemo(() => {
    if (canHover) {
      return {
        backgroundColor: isHover ? '#96c6e1' : 'var(--main-whitesmoke)',
        color: isHover ? '#000' : '#0f1521',
        cursor: 'pointer',
      };
    }
    return {};
  }, [isHover, canHover]);

  const handleClick = () => {
    if (value) onClick?.();
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <td
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{ ...style, ...styleHover }}
    >
      {link ? (
        <Link
          style={{
            color: 'inherit',
            display: 'block',
            lineHeight: '60px',
            textDecoration: 'none',
            width: '100%',
          }}
          to={link}
        >
          {value}
        </Link>
      ) : (
        value
      )}
    </td>
  );
};
