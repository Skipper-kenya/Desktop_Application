import { ipcMain } from 'electron';
import axios from 'axios';



export const CustomersHandler: any = () => {
  ipcMain.on('customers', async (event) => {
    try {
      console.log('customers route');
      const url = "https://localhost:44345/Items/GetElectronItems";

      const response = await axios.get(url);
      console.log(response.data);

    } catch (error) {
      console.log(error.message);
    }
  });
};
