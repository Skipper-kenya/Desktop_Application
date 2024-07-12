import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import {
  PeopleRounded,
  Inventory2Outlined,
  ArrowRightAlt,
} from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import '../App.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface CatalogueInterface {
  customers: number;
  items: number;
}

const Dashboard: React.FC = () => {
  const [data, setData] = useState<CatalogueInterface>({
    customers: 0,
    items: 0,
  });

  const navigate = useNavigate();

  const fetchCatalogueCount = async (): Promise<void> => {
    try {
      const response = await axios.get(
        'https://localhost:44345/Home/GetCatalogueCount',
      );

      const { CustomerCount, ItemsCount } = response.data;

      setData({ customers: CustomerCount, items: ItemsCount });
    } catch (error) {
      console.log('something went wrong');
    }
  };
  useEffect(() => {
    fetchCatalogueCount();
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to the Nav
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Overview of Our Catalogue
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Card className="card">
            <PeopleRounded className="card-icon" />
            <CardContent className="card-content">
              <Typography className="card-title">Customers</Typography>
              <Typography className="card-number">{data.customers}</Typography>
              <Button
                sx={{ marginTop: '1rem' }}
                variant="outlined"
                onClick={() => navigate('/customers')}
              >
                View Customers <ArrowRightAlt />
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card className="card">
            <Inventory2Outlined className="card-icon" />
            <CardContent className="card-content">
              <Typography className="card-title">Items</Typography>
              <Typography className="card-number">{data.items}</Typography>
              <Button
                sx={{ marginTop: '1rem' }}
                variant="outlined"
                onClick={() => navigate('/items')}
              >
                View Items <ArrowRightAlt />
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
