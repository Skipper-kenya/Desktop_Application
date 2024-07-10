import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { loadingContext } from '../context/Global';
import { toast } from 'sonner';
import { CreateItemInterface } from './CreateItem';
import { Actions } from './Items';

interface ItemsTableList {
  action: Actions;
  setAction: any;
  open: boolean;
  setOpen: any;
  items: any[];
  setItems: any;
  itemDetails: {
    description: string;
    inventory: number;
  };
  setItemDetails: any;
}

const ItemsTable: React.FC<ItemsTableList> = ({
  action,
  setAction,
  items,
  itemDetails,
  setItemDetails,
  open,
  setOpen,
  setItems,
}) => {
  const context = React.useContext(loadingContext);

  if (!context) {
    throw new Error('context is null');
  }

  /**
   * 
   * const timestamp = parseInt(dateString.replace(/\/Date\((\d+)\)\//, '$1'), 10);

// Create a new Date object
const date = new Date(timestamp);

// Output the date in a readable format
console.log(date.toString()); // Ex
   */

  const { setLoading } = context;

  const columns: GridColDef[] = [
    { field: 'No', headerName: 'No', width: 100 },
    { field: 'Description', headerName: 'Full Description', width: 200 },
    { field: 'Inventory', headerName: 'Inventory', width: 150 },
    {
      field: 'Last_Date_Modified',
      headerName: 'Last Date Modified',
      width: 200,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton
            sx={{ marginRight: '1rem' }}
            color="primary"
            onClick={() => handleEdit(params.row)}
          >
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={() => handleDelete(params.row)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const handleEdit = (row: any) => {
    setItemDetails({
      description: row.Description,
      inventory: row.Inventory,
    });
    setAction((prev: any) => ({ action: 'edit', actionData: row }));
    setOpen(true);
  };

  const handleDelete = async (row: any) => {
    try {
      setLoading(true);
      const response = await axios.post(
        'https://localhost:44345/items/deleteelectronitem',
        {
          key: row.Key,
        },
      );

      const { Message, Success, Data } = response.data;
      setItems(Data);
      setLoading(false);
      Success
        ? (() => {
            toast.success(Message);
          })()
        : toast.error(Message);
    } catch (error) {
      setLoading(false);

      console.log('something went wrong');
    }
  };

  return (
    <div style={{ height: '80vh', width: '100%' }}>
      <DataGrid
        rows={items}
        columns={columns}
        getRowId={(row) => row.No}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 20 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection={false}
      />
    </div>
  );
};

export default ItemsTable;
