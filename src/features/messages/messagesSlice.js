import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { url } from '../../services/URL'
import axios from 'axios';

/*{
    uid: UUID
    description: 'bla',
    details: 'bla bla bla',
    userid: UUID
}*/

export const thunkGetMessages = createAsyncThunk(
    'messages/thunkGetMessages',
    async (userID) => {
        const response = await axios.get(`${url}/messages/${userID}`)
        return response.data
    }
)

const messagesSlice = createSlice({
    name: 'messages',
    initialState: [],
    reducers: {
        add (state, {payload}) {  //paylad é a nova menssages
        state.push(payload)
        },
        all (state, {payload}) {  // payload é a lista de todas as mesangens
        return payload
        },
        del (state, {payload: index})  {  // payload é o indice da mesange no array 
        state.splice(index, 1)
        },
        upd (state,{payload}) { // payload é toda a mensagem a ser modificada
        return state.map(elm => (elm.uid === payload.uid ? payload : elm))
        },
        rst () { 
            return []
        }
    },
    extraReducers: {
    [thunkGetMessages.pending]: () => {
        console.log("Pending");
    },
    [thunkGetMessages.rejected]: () => {
        console.log("Rejected!");
    },
    [thunkGetMessages.fulfilled]: (state, { payload }) => {
        console.log("Fetched Successfully!");
        return { ...state, messages: payload };
    },
    }  
});

// exporto as ações
export const { add, del, upd, all, rst } = messagesSlice.actions;

// Exportar o seletor de mensagens
export const selectMessages = (state) => state.messages;

// exporta os reducers para o rootReducer
export default messagesSlice.reducer;

