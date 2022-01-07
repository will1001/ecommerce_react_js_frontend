import { Provider } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import store from './store'
import Home from './pages/Home/Home'
import CartView from './pages/CartView/CartView'
import DetailProduct from './pages/DetailProduct/DetailProduct'
import Login from './pages/Login/Login'
import MemberPages from './pages/MemberPages/MemberPages'
import Product from './pages/Product/Product'
import SellerProductList from './pages/SellerProductList/SellerProductList'
import Signup from './pages/Signup/Signup'
import PreviewImages from './pages/PreviewImages/PreviewImages';


function App() {
  const token = localStorage.getItem('token');
  const tokenReady = token !== null && token !== 'undefined';
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/member" element={tokenReady?<MemberPages/>:<Navigate to={'/login'} />}></Route>
          <Route path="/previewImages" element={tokenReady ? <PreviewImages/>:<Navigate to="/login" />} />
          <Route path="/cartView" element={tokenReady?<CartView/>:<Navigate to={'/login'} />}></Route>
          <Route path="/detail_product" element={<DetailProduct/>}></Route>
          <Route path="/product" element={<Product/>}></Route>
          <Route path="/seller_product_list" element={<SellerProductList/>}></Route>
          <Route path="/login" element={tokenReady?<Navigate to={'/member'} />:<Login/>}></Route>
          <Route path="/signup" element={tokenReady?<Navigate to={'/member'} />:<Signup/>}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
