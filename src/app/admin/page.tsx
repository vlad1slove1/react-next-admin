'use client'

import React, { useState, useEffect } from 'react'
import { useGetOrdersQuery } from '@/redux/services/supabaseApi'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'

import Spinner from '@/components/Spinner'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid/DataGrid'
import { type GridColDef } from '@mui/x-data-grid'

export default function AdminPage (): React.JSX.Element {
  const { data, error } = useGetOrdersQuery(null)
  const [selectedItems, setSelectedItems] = useState([])

  const handleSelection = (params: any): void => {
    console.log(params)
    setSelectedItems(params)
  }

  if (data == null) {
    return (
      <Spinner />
    )
  }

  // console.log(selectedItems)

  const columns: GridColDef[] = [
    { field: 'createdAt', headerName: 'Date', headerAlign: 'center', align: 'center', flex: 1 },
    { field: 'author', headerName: 'Author', headerAlign: 'center', align: 'center', flex: 2 },
    { field: 'price', headerName: 'Price', headerAlign: 'center', align: 'center', flex: 1 },
    { field: 'company', headerName: 'Company', headerAlign: 'center', align: 'center', flex: 2 },
    { field: 'address', headerName: 'Address', headerAlign: 'center', flex: 3 },
    { field: 'contact', headerName: 'Contact', headerAlign: 'center', align: 'center', flex: 2 },
    { field: 'email', headerName: 'Email', headerAlign: 'center', align: 'center', flex: 2 },
    { field: 'about', headerName: 'Description', headerAlign: 'center', sortable: false, flex: 3 },
    { field: 'id', headerName: 'id', headerAlign: 'center', align: 'center', flex: 1 }
  ]

  return (
    <Box sx={{ width: '100%', background: 'white' }}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 15 }
          }
        }}
        pageSizeOptions={[15, 30, 45]}
        checkboxSelection
        disableRowSelectionOnClick
        rowSelectionModel={selectedItems}
        onRowSelectionModelChange={handleSelection}
      />
    </Box>
  )
}
