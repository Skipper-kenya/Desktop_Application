import { createRoot } from 'react-dom/client';
import App from './App';
import './App.css';
import GlobalContext from './context/Global';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(
    <App />
);
