import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { supabaseApi } from '../services/supabaseApi'

interface IOrder {
  about: string | null
  address: string | null
  author: string | null
  company: string | null
  contact: string | null
  createdAt: string | null
  email: string | null
  price: string | null
  id?: number | null
}

interface IOrdersState {
  loadingStatus: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
  orders: IOrder[] | any[]
}

const initialState: IOrdersState = {
  loadingStatus: 'loading',
  error: null,
  orders: []
}

const ordersSlice = createSlice({
  name: 'ordersInfo',
  initialState,
  reducers: {
    setOrder: (state, { payload }: PayloadAction<IOrder>) => {
      state.orders.push(payload)
      state.loadingStatus = 'succeeded'
      state.error = null
    },
    deleteOrder: (state, { payload }: PayloadAction<number>) => {
      const filteredOrders = state.orders.filter((order) => order.id !== payload)
      state.orders = filteredOrders
      state.loadingStatus = 'succeeded'
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(supabaseApi.endpoints.getOrders.matchPending, (state) => {
      state.loadingStatus = 'loading'
    })
    builder.addMatcher(supabaseApi.endpoints.getOrders.matchFulfilled, (state, { payload }) => {
      state.orders = payload
      state.loadingStatus = 'succeeded'
      state.error = null
    })
    builder.addMatcher(supabaseApi.endpoints.getOrders.matchRejected, (state, { error }) => {
      state.loadingStatus = 'failed'
      state.error = error.message ?? null
    })
  }
})

export const { setOrder, deleteOrder } = ordersSlice.actions
export const ordersSelector = (state: any): void => state.orders
export default ordersSlice.reducer
