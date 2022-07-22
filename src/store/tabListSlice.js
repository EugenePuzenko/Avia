import { createSlice } from '@reduxjs/toolkit';

const TabListSlice = createSlice({
  name: 'TabList',
  initialState: {
    tabList: [
      {
        label: 'Самый дешевый',
        value: 'Самый дешевый',
      },
      {
        label: 'Самый быстрый',
        value: 'Самый быстрый',
      },
      {
        label: 'Оптимальный',
        value: 'Оптимальный',
      },
    ],
  },
  reducers: {},
});

export default TabListSlice.reducer;
