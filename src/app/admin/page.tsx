'use client'

import React, { useState, useEffect } from 'react'
import { useGetOrdersQuery } from '@/redux/services/supabaseApi'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'

export default function AdminPage (): React.JSX.Element {
  const { data, error } = useGetOrdersQuery(null)

  console.log(data)

  return (
    <div>Hello!</div>
  )
}
