import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

export const TDTableItem = ({
  // action,
  canHover = true,
  className,
  link,
  match,
  onClick,
  rowSpan,
  style = { color: 'black' },
  // team,
  value,
}) => {
  const [isHover, setIsHover] = useState(false);
  // для будущего решения когда будет необходимость получать параметры с backend
  // const formatedLink = `/video_cuts?action=${action}&match=${match}&team=${team}`
  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const styleHover = useMemo(() => {
    if (canHover) {
      return {
        backgroundColor: isHover ? '#96C6E1' : 'var(--main-whitesmoke)',
        color: isHover ? '#000' : style?.color || '#0f1521',
        cursor: 'pointer',
      };
    }
    return {};
  }, [isHover, canHover, style]);

  // const handleClick = () => {
  //   if (value) onClick?.();
  // };

  const selectedValue = useMemo(() => {
    switch (true) {
      case match?.status_id === 6 || match?.status_id === 5:
        return value;
      case value === match?.date.split('T')?.[0] ||
        value === match?.opponent ||
        value === match?.home_team?.name ||
        value === match?.away_team?.name:
        return value;
      case value === match?.score:
        return '-:-';
      default:
        return '-';
    }
  }, [match, value]);

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <td
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ ...style, ...styleHover }}
      rowSpan={rowSpan}
      className={className}
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
          {selectedValue ?? '-'}
        </Link>
      ) : (
        selectedValue ?? '-'
      )}
    </td>
  );
};
