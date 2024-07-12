import ReactPaginate from 'react-paginate';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useParams } from 'react-router';
import { getStatisticsPaginate } from 'store/tournament/tournamentService';
import cls from './PaginationComponent.module.css'
import { ArrowIcon } from '../ArrowIcon/ArrowIcon';

// interface ResultsPaginateProps {
//   items: Array<any>,
//   itemsPerPage: number,
// }

export const PaginationComponent = ({
  items,
  itemsPerPage,
}) => {
  const [itemOffset, setItemOffset] = useState(1);
  const page = useSelector((state) => state.tournament.tournaments.page) - 1 || 0
  const dispatch = useDispatch();
  const { id } = useParams();
  const endOffset = itemOffset + itemsPerPage;
  // const currentItems = items?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items / itemsPerPage);
  const handlePageClick = (event) => {
    dispatch(getStatisticsPaginate({ id, page: event.selected + 1 }));
  }
  return (
    <div>
      <ReactPaginate
        forcePage={page}
        className={cls.pagination}
        nextLabel={<ArrowIcon direction='RIGHT' />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={4}
        pageCount={pageCount}
        previousLabel={<ArrowIcon />}
        breakLabel='...'
        activeClassName={cls.active}
        renderOnZeroPageCount={null}
        disabledClassName={cls.disable}
      />
    </div>
  )
}
