import { useSelector } from 'react-redux';

export const useLexicon = () => {
  const array = useSelector((state) => state.lexicon.translates);
  const findTitle = (id) => {
    const tmp = array.filter((item) => item.id === id);
    return tmp.length ? tmp[0].title : ''
  };
  return findTitle;
}
