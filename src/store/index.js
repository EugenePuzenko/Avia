import { configureStore } from '@reduxjs/toolkit';

import checkboxListReducer from './checkboxListSlice';
import tabListReducer from './tabListSlice';
import ticketsReducer from './ticketsSlice';

export default configureStore({
  reducer: {
    checkboxList: checkboxListReducer,
    tabList: tabListReducer,
    ticketsList: ticketsReducer,
  },
});
