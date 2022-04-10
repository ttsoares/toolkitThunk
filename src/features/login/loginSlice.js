import { createSlice } from '@reduxjs/toolkit';

/*
    uid: uuid
    name: string
    password: string
*/

export const slice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
        // crio a ação que vai receber os dados do usuário
        // e guardar no estado
        login: (state, {payload}) => {
            state.user = payload;
        },
        // Limpar o estado para fazer logout
        logout: (state) => {
            // limpar o estado
            state.user = undefined;
        }
    }
});

// exporta os reducers para o rootReducer
export default slice.reducer;

// exportar as ações
export const { login, logout } = slice.actions;

// Exportar o seletor do usuario
export const getUser = state => state.user.user;
