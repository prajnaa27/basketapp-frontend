import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Checkout from './pages/Checkout';
import Transaction from './pages/Transaction';

import { BasketProvider } from './pages/BasketContext';

function App() {
  return (
    <div className="App">
<BasketProvider>
      <Router>
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/checkout' element={<Checkout/>}/>
        <Route exact path='/transaction' element={<Transaction/>}/>
        {/* <Route exact path='/edituser/:id' element={<EditUser/>}/> */}
        {/* <Route exact path='/viewuser/:id' element={<ViewUser/>}/> */}

      </Routes>
      {/* <Home/> */}
      </Router>
      </BasketProvider>
    </div>
  );
}

export default App;
