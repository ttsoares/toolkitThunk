import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

// Adapter dos produtos
/*
{
    id: UUID
    name: 'bla',
    password: 'bla bla bla,
}
*/
const adapter = createEntityAdapter({
    selectId: user => user.id,
});

const usersSlice = createSlice({
    name: 'userss',
    initialState: adapter.getInitialState([]),
    reducers: {
       
    }
});

// exporto as ações
export const {  } = usersSlice.actions;

// exportar o reducer
export default usersSlice.reducer;

// exportar o seletor para ler todos os usuarios
export const {  } =    adapter.getSelectors(state => state.users);
