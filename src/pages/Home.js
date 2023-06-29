



import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import '../css/home.css'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button } from 'bootstrap';
import Checkout from './Checkout';
import { click } from '@testing-library/user-event/dist/click';
import Navbar from '../layout/Navbar';
import { BasketContext } from './BasketContext';

export default function Home() {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  console.log(location, " useLocation Hook");
  


  const [clickedProducts, setClickedProducts] = useState(location.state?.persistData||{});
  const {basketCount, setBasketCount} = useContext(BasketContext);

  const [c,setc] = useState(location.state?.latestcount||0);

  
  
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const res = await axios.get("http://localhost:9001/products");
    console.log("res", res.data);
    setProducts(res.data);
  };

  const [counter,setcounter]=useState(0);
 

  const handleAddToBasket = (index,productName, price) => {
    setcounter(counter+1)
    setBasketCount(basketCount+1);
    console.log("counter",counter)
    setClickedProducts((prevState) => {
      const updatedProducts = { ...prevState };
      updatedProducts[productName] = {
        sku:index,
        count: (updatedProducts[productName]?.count || 0) + 1,
        price: (updatedProducts[productName]?.price || 0) + price,
      };
      return updatedProducts;
    });
    
    console.log("Button clicked");
    console.log("clicked prod", clickedProducts);
  };

 

 

 
  return (
    <div className='container'>
      <div className='py-4'>
        <div className='basket'>
      <Link className='btn btn-outline-success' 
       to="/checkout"
       state={{clickedProducts:clickedProducts,
      }}
        >Basket {basketCount}</Link>
     </div>
        <table className="table border shadow">
          
        <thead>
    <tr>
      <th scope="col">SL.NO</th>
      <th scope="col">PRODUCT NAME</th>
      <th scope="col">PRICE</th>
      <th scope="col">ADD</th>
    </tr>
  </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{product.name}</td>
                <td>Rs.{product.price}</td>
                <td>
                  <button
                    className='btn btn-dark mx-2'
                    onClick={() => handleAddToBasket(product.sku,product.name,product.price)}
                    disabled={clickedProducts[product.name]?.count>=10}
                    >
                    Add to basket
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link className='btn btn-success mx-2' 
       to="/checkout"
       state={{clickedProducts:clickedProducts}}
        >Proceed to checkout</Link>
      </div>
      <div>
      </div>
    </div>
  );
}