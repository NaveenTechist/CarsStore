import {BrowserRouter,Routes, Route} from 'react-router-dom';
import HomeRoute from './components/HomeRoute';
import CartComponent from './components/CartComponent';
import ServicesRoute from './components/ServicesRoute';
import Login from './components/Login'
import Register from './components/Register'
import ProtectedRoute from './ProtectedRoute';
import CommonContext from './CommonContext/common';
import NotFound from './components/NotFound';
import {useState} from 'react';
import './App.css';


const App = () =>  { 
  const [cartList, setCartList] = useState([]);
  const addCartListItem = (item) => {
    setCartList(prevList => [...prevList, item]);
  };

  const deleteCartListItem = (id) => {
    setCartList(prevList => prevList.filter(item => item.id !== id));
  };

  return( 
  <CommonContext.Provider value={{ cartList, addCartListItem: addCartListItem, deleteCartListItem: deleteCartListItem  }}> 
    <BrowserRouter> 
    <Routes>
      <Route exact path="/" element={ <ProtectedRoute>  <HomeRoute /> </ProtectedRoute> } />
      <Route exact path="/login" element={ <Login /> } />
      <Route exact path="/cart" element={ <ProtectedRoute>  <CartComponent /> </ProtectedRoute> } />
      <Route exact path="/services" element={ <ProtectedRoute> <ServicesRoute /> </ProtectedRoute> } />
      <Route exact path="/register" element={  <Register />  } />
      <Route path="*" element={ <ProtectedRoute>  <NotFound />  </ProtectedRoute> } />
    </Routes>
    </BrowserRouter>
  </CommonContext.Provider>
)
}
export default App;
