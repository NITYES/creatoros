import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface ApplicationData {
  name: string,
  url: string,
  link: string,
  age: number,
  subject: string
}


export interface ApplicationState {
  step: number,
  data: ApplicationData
}

const initialState: ApplicationState = {
  step: 1,
  data: {
    name: "",
    url: "",
    age: 0,
    subject: "",
    link: ""
  }
}


const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    updateCount: (state, action: PayloadAction<number>) => {
      state.step = action.payload
    },

    updateData: (state, action: PayloadAction<any>) => {
      state.data = { ...state.data, ...action.payload };
    },
    resetApplication: () => initialState,
  }
})


export const { updateCount, updateData, resetApplication } = applicationSlice.actions
export default applicationSlice.reducer