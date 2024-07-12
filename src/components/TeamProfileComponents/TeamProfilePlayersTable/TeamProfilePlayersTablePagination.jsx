import React from 'react';
import cls from './TeamProfilePlayersTablePagination.module.css';

export const TeamProfilePlayersTablePagination = ({ pages }) => (
  <ul className={cls.pageList}>
    {Array.from(Array(pages).keys()).map((page) => (
      <li key={page} className={cls.page}>
        {page + 1}
      </li>
    ))}
  </ul>
);
