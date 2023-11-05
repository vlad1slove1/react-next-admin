import { createSlice } from '@reduxjs/toolkit'
import { supabaseApi } from '../services/supabaseApi'

import type { PayloadAction } from '@reduxjs/toolkit'

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
      state.orders = state.orders.filter((order) => order.id !== payload)
      state.loadingStatus = 'succeeded'
      state.error = null
    },
    updateOrder: (state, { payload }: PayloadAction<IOrder>) => {
      const currOrderIndex = state.orders.map((order) => order.id).indexOf(payload.id)
      state.orders[currOrderIndex] = {
        about: payload.about,
        address: payload.address,
        author: payload.author,
        company: payload.company,
        contact: payload.contact,
        createdAt: payload.createdAt,
        email: payload.email,
        price: payload.price,
        id: payload.id
      }
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

export const { setOrder, deleteOrder, updateOrder } = ordersSlice.actions
export default ordersSlice.reducer
