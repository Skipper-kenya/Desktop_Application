import React, { EffectCallback, RefCallback, useEffect, useState } from 'react';
import axios from 'axios';
import ItemsTable from './ItemsTable';
import { useContext } from 'react';
import { loadingContext } from '../context/Global';
import {
  Box,
  Button,
  Icon,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import CreateItem, { CreateItemInterface } from './CreateItem';
import nothingIllustration from '../../../assets/nothing.png';

export interface Customer {
  No: string;
  Name: string;
  Phone_No: string;
  E_Mail: string;
  Address: String;
}

export interface Actions {
  action: string;
  actionData: {
    No: string;
    Description: string;
    Last_Date_Modified: string;
    Inventory: number;
    Key: string;
  };
}

const Items: React.FC = () => {
  const context = useContext(loadingContext);
  const [open, setOpen] = React.useState(false);
  const [itemDetails, setItemDetails] = React.useState<CreateItemInterface>({
    description: '',
    inventory: 0,
  });

  if (!context) {
    throw new Error('context is null');
  }

  const { setLoading } = context;

  const [items, setItems] = useState<any[]>([]);
  const [action, setAction] = useState<Actions>({
    action: '',
    actionData: {
      No: '',
      Description: '',
      Last_Date_Modified: '',
      Inventory: 0,
      Key: '',
    },
  });

  const fetchCustomers = async (): Promise<any> => {
    try {
      const url = 'https://localhost:44345/Items/GetElectronItems';
      setLoading(true);
      const response = await axios.get(url);

      setItems(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);

      console.log('something went worn');
    }
  };
  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div>
      <CreateItem
        action={action}
        setAction={setAction}
        itemDetails={itemDetails}
        setItemDetails={setItemDetails}
        open={open}
        setOpen={setOpen}
        setItems={setItems}
      />

      {items.length < 1 ? (
        <Stack direction="column" justifyContent="center" alignItems="center">
          <Stack>
            <Typography color="secondary">No items available</Typography>
            <img width="300px" src={nothingIllustration} alt="Empty list" />
          </Stack>
        </Stack>
      ) : (
        <ItemsTable
          action={action}
          setAction={setAction}
          open={open}
          setOpen={setOpen}
          items={items}
          itemDetails={itemDetails}
          setItemDetails={setItemDetails}
          setItems={setItems}
        />
      )}
    </div>
  );
};

export default Items;
