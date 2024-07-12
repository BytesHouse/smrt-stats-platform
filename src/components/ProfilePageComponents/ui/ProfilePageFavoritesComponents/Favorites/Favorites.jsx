/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from 'react-redux';
// import { useLexicon } from 'lib/hooks/useTranslates';
// import { PaginationComponent } from 'components/ui/PaginationComponent/PaginationComponent';
import ReactPaginate from 'react-paginate';
import { ArrowIcon } from 'components/ui/ArrowIcon/ArrowIcon';
import { useEffect, useState } from 'react';
import { getFavorites } from 'store/favorites/favoritesService';
import { AppDispatch } from 'providers/storeProvider/config/store';
import { useLexicon } from 'lib/hooks/useTranslates';
import cls from './Favorites.module.css';
import paginate from '../../../../ui/PaginationComponent/PaginationComponent.module.css'
import { Spinner } from '../../../../ui';
import { FavoritesItem } from './FavoritesItem';

export const Favorites = (props) => {
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const l = useLexicon();
  const favorites = useSelector((state) => state.favorites.favorites.results)
  const loading = useSelector((state) => state.favorites.loadingFavorites);
  const count = useSelector((state) => state.favorites.favorites.count);
  const sort = useSelector((state) => state.favorites.sort)
  const pageCount = Math.ceil(count / 10);
  // const l = useLexicon();
  const handlePageClick = (event) => {
    dispatch(getFavorites({ page: event.selected + 1, sort }))
    setPage(event.selected)
  }

  useEffect(() => {
    setPage(0);
  }, [sort])

  return (
    <div className={cls.FavoritesContainer}>
      {loading ? <div className={cls.loadingContainer}><Spinner /></div> : favorites?.length > 0 ? (
        <>
          {favorites.map((favorite) => (
            <FavoritesItem key={favorite.player.display_name} favorite={favorite} />
          ))}
        </>
      ) : (
        <div className={cls.playlist}>{l(447)}</div>
      ) }
      {count > 10
       && (
         <div style={{ marginTop: 'auto' }}>
           <ReactPaginate
             forcePage={page}
             className={paginate.pagination}
             nextLabel={<ArrowIcon direction='RIGHT' color='black' />}
             onPageChange={handlePageClick}
             pageRangeDisplayed={3}
             marginPagesDisplayed={4}
             pageCount={pageCount}
             previousLabel={<ArrowIcon color='black' />}
             breakLabel='...'
             activeClassName={paginate.active}
             renderOnZeroPageCount={null}
             disabledClassName={paginate.disable}
           />
         </div>)}
    </div>
  );
};

