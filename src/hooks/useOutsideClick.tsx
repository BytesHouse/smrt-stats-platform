import { RefObject, useEffect } from 'react';

type Props = {
  handleClick: (event: MouseEvent) => void,
  ref: RefObject<HTMLDivElement | null>,
}

export const useOutsideClick = ({ handleClick, ref }:Props) => {
  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current?.contains(event.target as Node)) {
      handleClick(event)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);
}
