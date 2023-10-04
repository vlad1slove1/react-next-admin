import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import supabase from '@/supabase'

export const supabaseApi = createApi({
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getOrders: builder.query({
      queryFn: async () => {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .order('id', { ascending: true })

        if (error != null) {
          throw new Error(error.message)
        }

        return { data }
      }
    })
  })
})

export const { useGetOrdersQuery } = supabaseApi
