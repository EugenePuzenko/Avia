import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';

import { calculateFlightDuration } from '../helpers';

export const fetchSearchId = createAsyncThunk('fetchSearchId', async (_, { rejectWithValue }) => {
  try {
    const responce = await fetch('https://aviasales-test-api.kata.academy/search');
    if (!responce.ok) {
      throw new Error('SearchId Error');
    }
    const searchId = await responce.json();
    return searchId.searchId;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchTicketsPart = createAsyncThunk('fetchTicketsPart', async (searchId, { rejectWithValue }) => {
  try {
    const responceTickets = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`);
    if (!responceTickets.ok) {
      throw new Error('Tickets Error');
    }
    const ticketsList = await responceTickets.json();
    return ticketsList.tickets;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const ticketsSlice = createSlice({
  name: 'ticketsList',
  initialState: {
    ticketsList: [],
    countOfVisibleTickets: 5,
    stopFetchTickets: false,
    searchId: null,
    searchIdStatus: null,
    searchIdError: null,
    ticketsListStatus: null,
    ticketsListError: null,
    requestError: 0,
    isLoading: true,
    filtersList: [0, 1, 2, 3],
  },
  reducers: {
    getMoreFiveTickets(state) {
      state.countOfVisibleTickets += 5;
    },
    onTabListClick(state, action) {
      const currentTickets = current(state.ticketsList).slice();
      state.ticketsList = currentTickets.sort((prevTicket, nextTicket) => {
        if (action.payload === 'Самый дешевый') {
          return prevTicket.price > nextTicket.price ? 1 : -1;
        }

        if (action.payload === 'Самый быстрый') {
          return calculateFlightDuration(prevTicket.segments) > calculateFlightDuration(nextTicket.segments) ? 1 : -1;
        }

        return calculateFlightDuration(prevTicket.segments) + prevTicket.price >
          calculateFlightDuration(nextTicket.segments) + nextTicket.price
          ? 1
          : -1;
      });
    },

    filterListChange(state, action) {
      if (action.payload[0].isChecked) {
        state.filtersList = [0, 1, 2, 3];
      } else {
        state.filtersList = action.payload.filter((t) => t.isChecked).map((t) => t.filterValue);
      }
    },
  },
  extraReducers: {
    [fetchSearchId.pending]: (state) => {
      state.searchIdStatus = 'loading';
      state.searchIdError = null;
    },
    [fetchSearchId.fulfilled]: (state, action) => {
      state.searchIdStatus = 'resolved';
      state.searchId = action.payload;
    },
    [fetchSearchId.rejected]: (state, action) => {
      state.searchIdStatus = 'rejected';
      state.searchIdError = action.payload;
    },

    [fetchTicketsPart.pending]: (state) => {
      state.ticketsListStatus = 'loading';
      state.ticketsListError = null;
    },
    [fetchTicketsPart.fulfilled]: (state, action) => {
      state.ticketsListStatus = 'resolved';
      if (!action.payload.length) {
        state.stopFetchTickets = true;
        state.isLoading = false;
      } else {
        state.ticketsList.push(...action.payload);
      }
    },
    [fetchTicketsPart.rejected]: (state, action) => {
      if (action.payload === 'Tickets Error') {
        state.requestError += 1;
        state.ticketsListStatus = '500Error';
      } else {
        state.ticketsListStatus = 'rejected';
      }
    },
  },
});

export const { getMoreFiveTickets, onTabListClick, filterListChange } = ticketsSlice.actions;

export default ticketsSlice.reducer;
