import { createSelector } from '@reduxjs/toolkit';

export const getPlaylistState = (state) => state.playlist.playlist;
export const getPlaylistSortedByDate = createSelector(
  getPlaylistState,
  (playlist) => [...playlist]
    ?.sort((a, b) => new Date(b?.date) - new Date(a?.date)),
);
export const getPlaylistSortedByTitleAsc = createSelector(
  getPlaylistState,
  (playlist) => [...playlist]
    ?.sort((a, b) => a?.title?.localeCompare(b?.title)),
);
export const getPlaylistSortedByTitleDesc = createSelector(
  getPlaylistState,
  (playlist) => [...playlist]
    ?.sort((a, b) => b?.title.localeCompare(a?.title)),
);
