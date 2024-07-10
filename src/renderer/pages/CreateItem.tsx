import * as React from 'react';
import { useContext } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Add, Description } from '@mui/icons-material';
import { TextField } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { loadingContext } from '../context/Global';
import axios from 'axios';
import { toast } from 'sonner';
import { Actions } from './Items';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export interface CreateItemInterface {
  description: string;
  inventory: number;
}

interface ItemDetailsInterface {
  action: Actions;
  setAction: any;
  open: boolean;
  setOpen: any;
  setItems: any;
  itemDetails: {
    description: string;
    inventory: number;
  };
  setItemDetails: any;
}

const CreateItem: React.FC<ItemDetailsInterface> = ({
  action,
  setAction,
  open,
  setOpen,
  itemDetails,
  setItemDetails,
  setItems,
}) => {
  const context = useContext(loadingContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error('context is null');
  }

  const { setLoading } = context;

  const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setItemDetails((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleOpen = () => {
    setOpen(true);
    setAction((prev: any) => ({ ...prev, action: 'create' }));
  };
  const handleClose = () => setOpen(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLInputElement>,
  ): Promise<void> => {
    e.preventDefault();

    try {
      setLoading(true);
      const url = 'https://localhost:44345/Items/CreateElectronItem';

      const response = await axios.post(url, {
        itemDetails,
      });

      const { Message, Success, Data } = response.data;
      setItems(Data);
      setLoading(false);
      Success
        ? (() => {
            handleClose();
            toast.success(Message);
          })()
        : toast.error(Message);
    } catch (error) {
      toast.error('The server did not respond');
      setLoading(false);
      console.log('something went wrong');
    }
  };

  const isActionEdit = () => action.action == 'edit';

  const handleSubmitEdit = async (
    e: React.FormEvent<HTMLInputElement>,
  ): Promise<void> => {
    e.preventDefault();
    const { No, Key, Last_Date_Modified } = action.actionData;
    try {
      setLoading(true);
      const response = await axios.post(
        'https://localhost:44345/Items/EditElectronItem',
        {
          No,
          Key,
          Last_Date_Modified,
          Description: itemDetails.description,
          Inventory: itemDetails.inventory,
        },
      );

      const { Message, Success, Data } = response.data;
      setItems(Data);
      Success
        ? (() => {
            setOpen(false);
            toast.success(Message);
            navigate('/items');
          })()
        : toast.error(Message);
      setLoading(false);
    } catch (error) {
      toast.error('The server did not respond');
      setLoading(false);
      console.log("'something went wrong");
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}>
        {isActionEdit() ? 'Edit ' : '  Add new '} Item
        <Add />
      </Button>
      <Modal
        open={open}
        sx={{ border: 'none' }}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {isActionEdit() ? 'Edit ' : '  Add new '} Item
          </Typography>
          <Box
            component="form"
            onSubmit={isActionEdit() ? handleSubmitEdit : handleSubmit}
            sx={{
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              maxWidth: 400,
              margin: 'auto',
            }}
          >
            {isActionEdit() && (
              <>
                <TextField
                  value={action.actionData.Key}
                  label="Key"
                  name="key"
                  inputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                  required
                />
                <TextField
                  value={action.actionData.No}
                  inputProps={{
                    readOnly: true,
                  }}
                  label="No"
                  name="no"
                  fullWidth
                  required
                />
                <TextField
                  value={action.actionData.Last_Date_Modified}
                  inputProps={{
                    readOnly: true,
                  }}
                  label="Last_Date_Modified"
                  name="Last_Date_Modified"
                  fullWidth
                  required
                />
              </>
            )}

            <TextField
              value={itemDetails.description}
              label="Description"
              name="description"
              onChange={handlechange}
              fullWidth
              required
            />
            <TextField
              value={itemDetails.inventory}
              onChange={handlechange}
              type="number"
              label="Inventory"
              name="inventory"
              fullWidth
              required
            />

            <Button type="submit" variant="contained" color="primary">
              {isActionEdit() ? 'Edit Item ' : 'Create Item '}{' '}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default CreateItem;
