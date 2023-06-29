// import React from 'react'
// import { Link, Navigate, useNavigate,useLocation } from 'react-router-dom'
// import { useContext,useState } from 'react';
// import { BasketContext } from './BasketContext';

// export default function Transaction() {
  // const nav=useNavigate()
//   const location = useLocation();

// const [result,setres]=useState(location.state?.msg)
// console.log("gggg",result)
// const {basketCount,setBasketCount}=useContext(BasketContext)


//   const goBack = () => {
//     setBasketCount(0)
//     nav("/");
// }
//   return (
//   <div className='container'>
//     {result}
//         <h4>The transaction was completed successfully.</h4>
//         <button className='btn btn-outline-success'
//        onClick={goBack}>
//        Continue shopping
//        </button>
//   </div>
//   )
// }


import { useLocation,useNavigate } from 'react-router-dom';
import { useContext,useState } from 'react';
import { BasketContext } from './BasketContext';

export default function Error() {
  const location = useLocation();
  const nav=useNavigate()

  const {basketCount,setBasketCount}=useContext(BasketContext)
  const errorMessage = location.state && location.state.message;

  const goBack = () => {
    setBasketCount(0)
    nav('/');
}
  return (
    <div className='container'>
      {errorMessage && <h3>{errorMessage}</h3>}
      <button className='btn btn-outline-success'
       onClick={goBack}>
       Continue shopping
       </button>
    </div>
  );
}
