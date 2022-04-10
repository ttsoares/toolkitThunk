import axios from 'axios';
import { url } from  './URL'

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllMessages = createAsyncThunk(
  "messages/fetchAllmessages",
  async ({userID}) => {
    return axios.get(`${url}/messages/${userID}`)
        .then(
            (response) => {
                return response.data;
            },
        (error) => {
            console.log("Erro no back end !", error);
            throw (error);
        }
      )
  }
);

export const saveMessage = createAsyncThunk(
  "messages/saveMessages",
  async ({description, details}, uid) => {
    const descriNew = description.slice(0,44);
    const detailNew = details.slice(0,149);
    return axios.post(`${url}/messages/${uid}`,
    { description: descriNew,
      details: detailNew
    })
        .then(
            (response) => {
                return response.data;
            },
        (error) => {
            console.log("Erro no back end !", error);
            throw (error);
        }
      )
  }
);


const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    messages: [],
    message: [],
    loading: false,
    error: null,
  extraReducers: {
    [fetchAllMessages.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchAllMessages.fulfilled]: (state, action) => {
      state.loading = false;
      state.messages = [action.payload]; // não é como API dos 'drinks'
    },
    [fetchAllMessages.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // --------------------
    [saveMessage.pending]: (state, action) => {
      state.loading = true;
    },
    [saveMessage.fulfilled]: (state, action) => {
      state.loading = false;
      state.cocktail = action.payload;
    },
    [saveMessage.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //-----------------------
    [removeMessage.pending]: (state, action) => {
      state.loading = true;
    },
    [removeMessage.fulfilled]: (state, action) => {
      state.loading = false;
      state.cocktails = action.payload.drinks;
    },
    [removeMessage.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default messagesSlice.reducer;