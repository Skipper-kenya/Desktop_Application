import React, { EffectCallback, RefCallback, useEffect, useState } from 'react';
import axios from 'axios';
import ItemsTable from './CustomersTable';
import { useContext } from 'react';
import { loadingContext } from '../context/Global';
import { Button, Icon, IconButton, Stack, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import CreateItem, { CreateCustomerInterface } from './CreateCustomer';
import CreateCustomer from './CreateCustomer';
import CustomersTable from './CustomersTable';
import nothingIllustration from '../../../assets/nothing.png';

export interface Actions {
  action: string;
  actionData: {
    No: string;
    Name: string;
    Phone_No: string;
    Address: string;
    Key: string;
    E_Mail: string;
    Responsibility_Center: string;
  };
}

const Customers: React.FC = () => {
  const context = useContext(loadingContext);
  const [open, setOpen] = React.useState(false);
  const [itemDetails, setItemDetails] = React.useState<CreateCustomerInterface>(
    {
      name: '',
      email: '',
      responsibility: '',
      phone: '',
    },
  );

  if (!context) {
    throw new Error('context is null');
  }

  const { setLoading } = context;

  const [items, setItems] = useState<any[]>([]);
  const [action, setAction] = useState<Actions>({
    action: '',
    actionData: {
      No: '',
      Name: '',
      E_Mail: '',
      Responsibility_Center: '',
      Phone_No: '',
      Key: '',
      Address: '',
    },
  });

  const fetchCustomers = async (): Promise<any> => {
    try {
      const url = 'https://localhost:44345/Home/GetElectronCustomers';
      setLoading(true);
      const response = await axios.get(url);
      setItems(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('something went wrong');
    }
  };
  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div>
      <CreateCustomer
        action={action}
        setAction={setAction}
        itemDetails={itemDetails}
        setItemDetails={setItemDetails}
        open={open}
        setOpen={setOpen}
        setItems={setItems}
      />
      {items?.length < 1 ? (
        <Stack direction="column" justifyContent="center" alignItems="center">
          <Stack>
            <Typography color="secondary">No Customers available</Typography>
            <img width="300px" src={nothingIllustration} alt="empty list" />
          </Stack>
        </Stack>
      ) : (
        <CustomersTable
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

export default Customers;
