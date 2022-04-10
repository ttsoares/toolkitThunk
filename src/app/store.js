import { configureStore } from '@reduxjs/toolkit';
import messagesReducer from '../features/messages/messagesSlice';
import loginReducer from '../features/login/loginSlice'

export const store = configureStore({
  reducer: {
    messages: messagesReducer,
    login: loginReducer,
  },
});
