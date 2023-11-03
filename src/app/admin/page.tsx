/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import React, { useState, type SetStateAction, type SyntheticEvent } from 'react'
import {
  useGetOrdersQuery,
  useDeleteOrderMutation
} from '@/redux/services/supabaseApi'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { deleteOrder } from '@/redux/slices/ordersSlice'
import { useDisclosure } from '@nextui-org/react'

import SnackbarWithAlert from '@/components/SnackbarWithAlert'
import NewOrderButton from '@/components/NewOrderButton'
import EditOrderModal from '@/components/modals/EditOrderModal'
import Spinner from '@/components/Spinner'
import Box from '@mui/material/Box'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import { DataGrid } from '@mui/x-data-grid/DataGrid'
import {
  type GridColDef,
  type GridRowId,
  GridActionsCellItem
} from '@mui/x-data-grid'

export default function AdminPage (): React.JSX.Element {
  const [selectedOrderData, setSelectedOrderData] = useState(null)
  const [alertOpen, setAlertOpen] = useState(false)
  const { isOpen, onOpenChange } = useDisclosure()
  const { isLoading, refetch } = useGetOrdersQuery(null)
  const [removeOrder] = useDeleteOrderMutation()
  const orders = useAppSelector((state) => state.ordersReducer.orders)
  const dispatch = useAppDispatch()

  if (isLoading) {
    return <Spinner />
  }

  const handleEditClick = (data: SetStateAction<any>) => async () => {
    onOpenChange()
    setSelectedOrderData(data)
  }

  const handleOpenAlert = (): void => {
    setAlertOpen(true)
  }

  const handleCloseAlert = (event?: Event | SyntheticEvent<Element, Event>, reason?: string): void => {
    if (reason === 'clickaway') {
      return
    }

    setAlertOpen(false)
  }

  const handleDeleteClick = (id: GridRowId) => async () => {
    try {
      const responseData = await removeOrder(id).unwrap()
      dispatch(deleteOrder(Number(id)))
      void refetch()

      return responseData
    } catch (error) {
      console.error('Error creating order:', error)
    } finally {
      handleOpenAlert()
    }
  }

  const columns: GridColDef[] = [
    { field: 'createdAt', headerName: 'Date', headerAlign: 'center', align: 'center', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'author', headerName: 'Author', headerAlign: 'center', align: 'center', flex: 2, headerClassName: 'super-app-theme--header' },
    { field: 'price', headerName: 'Price $', headerAlign: 'center', align: 'center', flex: 1, headerClassName: 'super-app-theme--header' },
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
      getActions: (data) => {
        return [
          <GridActionsCellItem
            key={data.id}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(data)}
            color="inherit"
          />,
          <GridActionsCellItem
            key={data.id}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(data.id)}
            color="inherit"
          />
        ]
      }
    }
  ]

  return (
    <>
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
            rows={orders ?? []}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 15 }
              }
            }}
            pageSizeOptions={[15, 30, 45]}
          />
        </Box>

        <EditOrderModal isOpen={isOpen} onOpenChange={onOpenChange} orderData={selectedOrderData} />
      </Box>

      <SnackbarWithAlert
        open={alertOpen}
        onClose={handleCloseAlert}
        variant="warning"
        message="You have deleted the order"
        autoHideDuration={5000}
      />
    </>
  )
}
