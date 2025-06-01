import { createSlice } from "@reduxjs/toolkit"

export interface IInitalState {
    isOpen: boolean
}


const initialState: IInitalState = {
    isOpen: false
}

export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        toggleOpenSearch: (state, payloadAction) => {
            state.isOpen = payloadAction.payload;
        }
    }
})

export const { toggleOpenSearch } = searchSlice.actions;
