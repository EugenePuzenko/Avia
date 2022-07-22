import { createSlice } from '@reduxjs/toolkit';

import { updateCheckboxList } from '../helpers';

const checkboxListSlice = createSlice({
  name: 'checkboxList',
  initialState: {
    checkboxList: [
      {
        value: 'Все',
        isChecked: true,
        filterValue: [0, 1, 2, 3],
      },
      {
        value: 'Без пересадок',
        isChecked: true,
        filterValue: 0,
      },
      {
        value: '1 пересадка',
        isChecked: true,
        filterValue: 1,
      },
      {
        value: '2 пересадки',
        isChecked: true,
        filterValue: 2,
      },
      {
        value: '3 пересадки',
        isChecked: true,
        filterValue: 3,
      },
    ],
  },
  reducers: {
    onCheckboxClick(state, action) {
      state.checkboxList = updateCheckboxList(state.checkboxList, action.payload);
    },
  },
});

export const { onCheckboxClick } = checkboxListSlice.actions;

export default checkboxListSlice.reducer;
