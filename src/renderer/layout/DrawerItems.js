const {
  Home,
  ShoppingCart,
  People,
  LogoutOutlined,
  LoginOutlined,
} = require('@mui/icons-material');

export const Menuitems = [
  {
    name: 'Home',
    icon: <Home />,
    path: '',
  },
  {
    name: 'Items',
    icon: <ShoppingCart />,
    path: 'items',
  },
  {
    name: 'Customers',
    icon: <People />,
    path: 'customers',
  },

  {
    name: 'Login',
    icon: <LoginOutlined />,
    path: 'login',
  },
  {
    name: 'Logout',
    icon: <LogoutOutlined />,
    path: 'logout',
  },
];
