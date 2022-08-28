import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Order from './pages/Order';
import { ContextWrapper } from './helpers/context';

function App() {
  return (
    <ContextWrapper>
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/order' element={<Order />} />
        </Routes>
      </Router>
    </ContextWrapper>
  )
}

export default App;
