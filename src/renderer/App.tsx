import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import Items from './pages/Items';
import Customers from './pages/Customers';
import Login from './components/Login';
import GlobalContext from './context/Global';
import Layout from './layout/Layout';
import { Toaster } from 'sonner';
//

export default function App() {
  return (
    <GlobalContext>
      <Toaster position="top-center" richColors />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />
          <Route
            path="/items"
            element={
              <Layout>
                <Items />
              </Layout>
            }
          />
          <Route
            path="/customers"
            element={
              <Layout>
                <Customers />
              </Layout>
            }
          />
          <Route
            path="/login"
            element={
              <Layout>
                <Login />
              </Layout>
            }
          />
        </Routes>
      </Router>
    </GlobalContext>
  );
}
