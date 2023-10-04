/* eslint-disable @typescript-eslint/no-unused-expressions */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface OrdersState {
  loadingStatus: string
  error: any
  orders: []
  currentOrderId: number | null
}

const initialState: OrdersState = {
  loadingStatus: 'loading',
  error: null,
  orders: [],
  currentOrderId: null
}

const ordersSlice = createSlice({
  name: 'ordersInfo',
  initialState,
  reducers: {
    changeOrder: (state, action: PayloadAction<number>) => {
      state.currentOrderId = action.payload
    }
  }
})

export const { changeOrder } = ordersSlice.actions
export const channelsSelector = (state: any): void => state.orders
export default ordersSlice.reducer
