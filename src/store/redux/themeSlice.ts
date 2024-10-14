import { createSlice } from '@reduxjs/toolkit';
import { lightTheme, darkTheme } from '@theme/index';

interface ThemeState {
  isDarkMode: boolean;
  theme: any;
}

const initialState: ThemeState = {
  isDarkMode: false,
  theme: lightTheme,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
      state.theme = state.isDarkMode ? { ...darkTheme } : { ...lightTheme };
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
