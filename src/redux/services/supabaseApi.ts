import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import supabase from '@/supabase'

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

export const supabaseApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL }),
  endpoints: (builder) => ({
    getOrders: builder.query<IOrder[], null>({
      queryFn: async () => {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .order('id', { ascending: false })

        if (error != null) {
          throw new Error(error.message)
        }

        return { data }
      }
    }),
    createOrder: builder.mutation({
      queryFn: async (newOrder) => {
        const { data, error } = await supabase
          .from('orders')
          .insert(newOrder)
          .select('*')
          .order('id', { ascending: false })

        if (error != null) {
          throw new Error(error.message)
        }

        return { data }
      }
    })
  })
})

export const { useGetOrdersQuery, useCreateOrderMutation } = supabaseApi
