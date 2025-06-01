import { createSlice } from "@reduxjs/toolkit"

export interface IInitalState {
    isOpen: boolean
}


const initialState: IInitalState = {
    isOpen: false
}

export const drawerSlice = createSlice({
    name: "drawer",
    initialState,
    reducers: {
        toggleOpenDrawer: (state, payloadAction) => {
            state.isOpen = payloadAction.payload;
        }
    }
})

export const { toggleOpenDrawer } = drawerSlice.actions;
