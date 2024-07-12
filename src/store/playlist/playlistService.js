import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  deletePlaylist as deletePlaylistItem,
  addPlaylist,
  getPlaylists,
} from 'requests';
import { addEventsToPlaylist } from 'requests/playlists/addEventsToPlaylist';
import { $api } from '../../config/api';

export const getPlaylist = createAsyncThunk(
  'platform/get_playlist',
  async ({ page = 1, token }, { rejectWithValue }) => {
    try {
      const playlists = await getPlaylists()
      return playlists
    } catch (e) {
      return rejectWithValue(`${e.response.data.message}`);
    }
  },
);

export const createPlaylist = createAsyncThunk(
  'platform/create_playlist',
  async ({
    events,
    title,
    token,
  }, { rejectWithValue }) => {
    try {
      const body = {
        events: events?.length > 0 ? events : [],
        title: title || 'untitled',
      };
      const response = await addPlaylist({ title })
      return response.data;
    } catch (e) {
      return rejectWithValue(`${e.response.data.message}`);
    }
  },
);

export const deletePlaylist = createAsyncThunk(
  'platform/delete_playlist',
  async ({
    id,
    token,
  }, { rejectWithValue }) => {
    try {
      const response = await deletePlaylistItem({ playlistId: id })
      return response.data;
    } catch (e) {
      return rejectWithValue(`${e.response.data.message}`);
    }
  },
);

export const editPlaylistEvents = createAsyncThunk(
  'platform/edit_playlist_events',
  async ({
    events,
    id: playlistId,
    token,
  }, { rejectWithValue }) => {
    try {
      const body = { events: events?.length > 0 ? events : [] };
      const response = await addEventsToPlaylist({ event: events, playlistId })
      return response.data;
    } catch (e) {
      return rejectWithValue(`${e.response.data.message}`);
    }
  },
);

export const deletePlaylistEvents = createAsyncThunk(
  'platform/delete_playlist_events',
  async ({
    events,
    id,
    token,
  }, { rejectWithValue }) => {
    try {
      const body = { events: events?.length > 0 ? events : [] };
      const response = await $api.delete(
        `/users/edit_events_playlist/${id}`,
        { ...body },
        { headers: { Authorization: `Token ${token}` } },
      );
      return response.data;
    } catch (e) {
      return rejectWithValue(`${e.response.data.message}`);
    }
  },
);
