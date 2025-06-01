import { configureStore } from '@reduxjs/toolkit'
import { searchSlice } from './slices/searchSlice'
import { drawerSlice } from './slices/dawerSlice'

export const store = configureStore({
    reducer: {
        search: searchSlice.reducer,
        drawer: drawerSlice.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch