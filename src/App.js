import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import Order from './pages/Order';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/order' element={<Order/>}/>
      </Routes>
    </Router>
    )
}

export default App;
