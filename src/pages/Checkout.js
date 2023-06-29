import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import '../css/home.css'
import { useLocation } from "react-router-dom";
import { Dropdown } from 'bootstrap'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import { useContext } from 'react';
import { BasketContext } from './BasketContext';
import ErrorModal from '../ components/Modal';


export default function Checkout(props,prod) {
 

    const location = useLocation();
    const navigate=useNavigate();

console.log(location, " useLocation Hook");

const [data,setdata]=useState(location.state?.clickedProducts)
// const[bucketCount,setBucketCount]=useState(location.state?.bucketCount||0)
const {basketCount,setBasketCount}=useContext(BasketContext)

console.log("bucketcount")
const [persistData,setpersistData]=useState(data)
const [usecontinue,setUseContinue]=useState(false)

const handlecontinueshopping=()=>{
    // useEffect(()=>{
        setUseContinue(true);

        if(persistData)
        {
        setpersistData(prevData=>({...prevData,...persistData}));
        }
        console.log("persistdata",persistData)
    // },[data])
}

const [showModal,setShowModal]=useState(false)
const [errorMessage, setErrorMessage] = useState('');

  const handleShowModal = (message) => {
    setErrorMessage(message);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };






    const [promoCode,setpromoCode]=useState({})
    const [promoresponse,setpromoResponse]=useState('');
    const [promoprice,setpromoprice]=useState(0);
    const [show, setShow] = useState(true);

    const [cardNumber, setcardNumber] = useState('');
  const [isValid, setIsValid] = useState(false);

  const validateCreditCard = (number) => {
    // Remove any non-digit characters from the input
    if (number.length === 0) {
      return false;
    }
    if (/[^0-9]/.test(number)) {
      return false;
    }

    const sanitizedNumber = number.replace(/\D/g, '');

    let sum = 0;
    let isSecondDigit = false;

    // Iterate over the digits from right to left
    for (let i = sanitizedNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(sanitizedNumber.charAt(i), 10);

      if (isSecondDigit) {
        digit *= 2;

        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      isSecondDigit = !isSecondDigit;
    }

    return sum % 10 === 0;
    // console.log("return",sum)
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setcardNumber(value);

    setIsValid(validateCreditCard(value));
    console.log("validate",isValid);
     
  };

  
    const onInputChange=(e)=>{
        setpromoCode({promoCode:e.target.value});
        setpromoCode(e.target.value);
        
    }
    console.log("promo",promoCode)


    const handleApplyPromoCode = async () => {
        try {
          const response = await axios.post("http://localhost:9001/promocode",
           {promoCode});
          setpromoResponse(response.data);
          console.log("rde",promoresponse);
        setpromoprice((response.data['amount']/100)*totalPrice);
        console.log("promoprice",promoprice);
        //  setShowModal(false)
        }
        
         catch (error) {
        //   console.error(error);
        console.log("abcdefg",promoresponse)
        // alert(error.response.data.errors[0].msg)
        handleShowModal(error.response.data.errors[0].msg);
        }
      };
     

  const[latestcount,setLatestCount]=useState()

  const calculateTotalCount = (quantity) => {
    // let count = 0;
    Object.entries(data).forEach(([productName, { count, price }]) => {
      
      count+=parseInt(quantity);
    });
    
  };

   

  
    const handleQuantityChange = (productName,count,quantity,price,sku) => {
        let singleprodprice=price/count;
        // setBasketCount(quantity)
        const updatedPersistData = {
          ...persistData,
          [productName]: {
            count: quantity,
            price,
            sku
          }
        };
      
        let sum = 0;
        Object.values(updatedPersistData).forEach(({ count }) => {
          sum += parseInt(count);
        });
      
    
        setBasketCount(sum)
        setLatestCount(quantity)
        console.log("lkatest",latestcount)
        
        setpersistData((prevData) => {
          const updatedData = { ...prevData };
        updatedData[productName] = { sku:sku,count: quantity, price: singleprodprice * quantity };
        calculateTotalCount(quantity)
        return updatedData;
        


        });
      };

      const handleRemoveFromBasket = (productName,count) => {
        setpersistData((prevState) => {
          const updatedProducts = { ...prevState };
          delete updatedProducts[productName];
          return updatedProducts;
        });
        setBasketCount(basketCount-parseInt(count))
      };
     


      const [totalPrice, setTotalPrice] = useState(0);
      const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    calculateTotalPrice();
  }, [persistData]);

  const calculateTotalPrice = () => {
    let total = 0;
    let totalcount=0
    Object.entries(persistData).forEach(([productName, { count, price }]) => {
      total += price;
      totalcount+=parseInt(count)
    })
    setTotalPrice(total);
    setTotalCount(totalcount);
  };

  console.log("Total",totalPrice);
  console.log("Total count",totalCount);

  const [checkout,setCheckout]=useState({})
  const [checkoutresponse,setCheckoutResponse]=useState('')
  const [msg,setmsg]=useState("");



const [basket,setBasket]=useState([])

useEffect(() => {
    const updatedBasket = Object.entries(persistData).map(([productName, {sku, count }]) => ({
      sku: sku,
      quantity: count,
    }));
    setBasket(updatedBasket);
  }, [persistData]);

  

let shouldnav=false

const handleCheckout = async (cardNumber) => {
    console.log('basket',basket)
   const checkoutreq={basket,cardNumber}
   console.log("checkout req",checkoutreq)
    try {
        console.log("vvv",isValid)
        if(isValid)
        {

            const response=  await axios.post("http://localhost:9001/checkout",checkoutreq)
            if(response.status===200){
              const message=response.data.msg;
              navigate('/transaction',{ state: { message } });
           
            }
   
            
        }
        else{
            // alert("Invalid credit card number")
            handleShowModal('Invalid credit card number. Please try again.');
        }
    }
    
    //  catch (error) {
    //   if (error.response && error.response.status === 400) {
    //     // handleShowModal(error.response.data.errors[0].msg);
    //     setBasketCount(0);
    //     navigate('/error')
    //     alert(error.response.data.errors[0].msg)
    //   }
    // }

    catch (error) {
      if (error.response && error.response.status === 400) {
        const message = error.response.data.errors[0].msg;
        setBasketCount(0);
        navigate('/transaction', { state: { message } });
      }
    }
  }

 

 

  return (
    <div className='container'>
        {persistData&&Object.keys(persistData).length>0?(
        <div className='row'>
            <div 
            className='col-md-8 offset-md-2 border rounded p-4 shadow'
            >
                <h2 className='text-center '>
                    Checkout
                </h2>
                <div className='bb'>
      <Link className='btn btn-outline-success' 
       to="/checkout"
      //  state={{clickedProducts:clickedProducts}}
        >Basket {basketCount}</Link>
     </div>
                <div className='cont'>
                <Link 
                className='btn btn-outline-success mx-2' 
                to="/"
                onClick={handlecontinueshopping}
                state={{persistData:persistData,latestcount:latestcount}}
                >
                    Continue shopping
                </Link>
                {/* {Object.entries(data).map(([productName, {count,price,buttoncounter}]) => ( */}
                {/* <Link className='btn btn-outline-success' 
              to="/checkout"
               >Basket  </Link> */}
                {/* ))} */}
                </div>
                <form
                
                //  onSubmit={(e)=> onSubmit(e)}
               >
               <table className="table border shadow">
               <thead>
    <tr>
      <th scope="col">PRODUCT NAME</th>
      <th scope="col">PRICE</th>
      <th scope="col">QUANTITY</th>
      <th scope="col">DELETE</th>
    </tr>
  </thead>
          <tbody>
          {Object.entries(persistData).map(([productName, {sku,count,price}]) => (

             <tr
              key={productName}
              >  

                {/* <th scope="row">{index + 1}</th> */}
                
                <td>{productName}</td>
                <td>Rs. {price.toFixed(2)}</td>
                <td>
                <select value={count} 
                onChange={(e) =>handleQuantityChange(productName,count,e.target.value,price,sku)}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={7}>7</option>
                  <option value={8}>8</option>
                  <option value={9}>9</option>
                  <option value={10}>10</option>
                </select>
                </td>
                <td>
                  <button
                  onClick={()=>handleRemoveFromBasket(productName,count)}
                    className='btn btn-dark mx-2'
                  >
                    Remove
                  </button>
                </td>
              </tr>
              

            ))}
          </tbody>
        </table>
                <div>
                    <p></p>            
                </div>
                <div className='promo'>
                
                <p>

                </p>
               
                </div>
                <p></p>
               
                </form>

                <div className='mb-3'>
                    <div className='promocode'>
                    <label htmlFor='Username'>
                        Enter promo code
                    </label>
                    <input
                    type={"text"}
                    className="mx-4"
                    onChange={(e)=>onInputChange(e)}
                    />
                    <button
                    onClick={handleApplyPromoCode}
                     className='btn btn-outline-dark'>
                    Apply
                </button>
                
                <ErrorModal show={showModal} handleClose={handleCloseModal} errorMessage={errorMessage} />
                </div>
                <div className='amounts'>
                <label className="am" >Sub total amount</label>
                <label className="am2">Rs.{totalPrice.toFixed(2)}</label>
                <hr></hr>
                <label className="am">Promotional discount amount</label>
                <label className="am2">Rs.{promoprice.toFixed(2)}</label>
                <hr></hr>
                <label className="am">Basket total</label>
                <label className="am2">Rs.{(totalPrice - promoprice).toFixed(2)}</label>
                </div>
                <div className='cred'>
                <label className="mx-4" >Enter credit card number</label>
                <input
                    type={"text"}
                //     {{isValid}?className={'mx-4 border-success'}:
                // className={`mx-4 border-danger`}}
                 className={ (isValid && cardNumber.length>0?'valid':'invalid')}
                    onChange={handleInputChange}
                    />
                </div>
                <div>
                </div>

                <Link type='submit'
                // to={isValid?"/transaction":""}
                onClick={() => handleCheckout(cardNumber)}
                state={{checkoutresponse:checkoutresponse}}
                className={(Object.keys(persistData).length==0?'btn btn-success mt-4 disabled ':'btn btn-success mt-4')}
                 >
                    Checkout
                </Link>
                <ErrorModal show={showModal} handleClose={handleCloseModal} errorMessage={errorMessage} />

                </div>
            </div>
        </div>
        ):(
            <div className='empty'>
             <div className='addproducts'>
                <Link 
                className='btn btn-outline-success mx-2' 
                to="/"
                onClick={handlecontinueshopping}
                state={{persistData:persistData}}
                >
                    Add Products
                </Link>
                {/* {Object.entries(data).map(([productName, {count,price,buttoncounter}]) => ( */}
                {/* <Link className='btn btn-outline-success' 
              to="/checkout"
               >Basket  </Link> */}
                {/* ))} */}
                </div>
                <h2>Basket Empty</h2>
                <div className='check'>
                <Link type='submit'
                // to={isValid?"/transaction":""}
                onClick={() => handleCheckout(cardNumber)}
                // state={{msg:msg}}
                className={(Object.keys(persistData).length==0?'btn btn-success mt-4 disabled ':'btn btn-success mt-4')}
                 >
                    Checkout
                </Link>
                </div>
            </div>
        )}
    </div>
  )
}


