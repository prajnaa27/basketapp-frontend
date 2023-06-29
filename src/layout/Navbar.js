import React, { useContext,useState } from 'react'
import { Link,useLocation } from 'react-router-dom'
// import { BasketContext } from '../pages/Basketcontext'

export default function Navbar(props) {
  return (
    <div>

<nav className="navbar navbar-expand-lg navbar-dark bg-success">
  <div className="container-fluid">
    <Link className="navbar-brand"
     to="/">
        Basket App
        </Link>
    <button 
    className="navbar-toggler" 
    type="button" 
    data-bs-toggle="collapse"
    data-bs-target="#navbarSupportedContent" 
    aria-controls="navbarSupportedContent" 
    aria-expanded="false" 
    aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
    </button>
    {/* <Link className='btn btn-outline-light' to="/checkout">
        Basket 
        <span className='badge-bg-primary'></span>
    </Link> */}
  </div>
</nav>
    </div>
  )
}
