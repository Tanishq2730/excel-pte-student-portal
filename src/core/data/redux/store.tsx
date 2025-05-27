import { configureStore } from '@reduxjs/toolkit';
import themeSettingSlice from './themeSettingSlice';
import sidebarSlice from './sidebarSlice';
import authReducer from './authSlice';
import practiceSlice from './practiceSlice';
import bookingReducer from './bookingSlice';

const store = configureStore({
  reducer: {
    themeSetting: themeSettingSlice,
    sidebarSlice: sidebarSlice,
    auth: authReducer,
    subType: practiceSlice,
    bookingData: bookingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
