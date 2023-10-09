'use client'

import React, { useState } from 'react'
import { useGetOrdersQuery } from '@/redux/services/supabaseApi'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'

import NewOrderButton from '@/components/NewOrderButton'
import Spinner from '@/components/Spinner'
import Box from '@mui/material/Box'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import { DataGrid } from '@mui/x-data-grid/DataGrid'
import {
  type GridColDef,
  type GridRowModesModel,
  type GridRowId,
  GridActionsCellItem,
  GridRowModes
} from '@mui/x-data-grid'

export default function AdminPage (): React.JSX.Element {
  const { data, error, isLoading } = useGetOrdersQuery(null)
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({})

  if (isLoading) {
    return (
      <Spinner />
    )
  }

  const handleEditClick = (id: GridRowId) => () => {
    // setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })
  }

  const handleDeleteClick = (id: GridRowId) => () => {
    // setRows(rows.filter((row) => row.id !== id))
  }

  const columns: GridColDef[] = [
    { field: 'createdAt', headerName: 'Date', headerAlign: 'center', align: 'center', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'author', headerName: 'Author', headerAlign: 'center', align: 'center', flex: 2, headerClassName: 'super-app-theme--header' },
    { field: 'price', headerName: 'Price', headerAlign: 'center', align: 'center', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'company', headerName: 'Company', headerAlign: 'center', align: 'center', flex: 2, headerClassName: 'super-app-theme--header' },
    { field: 'address', headerName: 'Address', headerAlign: 'center', flex: 3, headerClassName: 'super-app-theme--header' },
    { field: 'contact', headerName: 'Contact', headerAlign: 'center', align: 'center', flex: 2, headerClassName: 'super-app-theme--header' },
    { field: 'email', headerName: 'Email', headerAlign: 'center', align: 'center', flex: 2, headerClassName: 'super-app-theme--header' },
    { field: 'about', headerName: 'Description', headerAlign: 'center', sortable: false, flex: 3, headerClassName: 'super-app-theme--header' },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      flex: 1,
      cellClassName: 'actions',
      headerClassName: 'super-app-theme--header',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            key={id}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            key={id}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />
        ]
      }
    }
  ]

  return (
    <Box>
      <Box sx={{ backgroundColor: 'rgba(237, 231, 225)' }}>
        <NewOrderButton />
      </Box>

      <Box
        sx={{
          width: '100%',
          background: 'white',
          '& .super-app-theme--header': {
            backgroundColor: 'rgba(237, 231, 225)',
            fontSize: 'large'
          }
        }}
      >
        <DataGrid
          rows={data ?? []}
          columns={columns}
          rowModesModel={rowModesModel}
          // slots={{
          //   toolbar: NewOrderButton
          // }}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 15 }
            }
          }}
          pageSizeOptions={[15, 30, 45]}
        />
      </Box>
    </Box>
  )
}
