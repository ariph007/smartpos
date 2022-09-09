import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Order from './pages/Order';
import { ContextWrapper } from './helpers/context';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <ContextWrapper>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/order/:table' element={<Order />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </Router>
    </ContextWrapper>
  )
}

export default App;
