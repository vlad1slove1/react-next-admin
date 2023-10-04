import { configureStore } from '@reduxjs/toolkit'
import ordersReduces from './slices/ordersSlice'
import { supabaseApi } from './services/supabaseApi'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

const store = configureStore({
  reducer: {
    ordersReduces,
    [supabaseApi.reducerPath]: supabaseApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([supabaseApi.middleware])
})

setupListeners(store.dispatch)

// Infer the type of the root state automatically
export type RootState = ReturnType<typeof store.getState>
// Export the dispatch type
export type AppDispatch = typeof store.dispatch

export default store
