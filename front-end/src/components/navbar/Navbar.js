import React from 'react'
import Logo from '../../assets/Logo.svg'
import '../../styles/navbar.css'
export const Navbar = () => {
  return (
   <>
    <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top">
  <div className="container">
    <img src={Logo} className="navbar-brand" width={160} alt="logo"  />
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <h3 className="nav-link " aria-current="page" >Remove Background</h3>
        </li>
        <li className="nav-item">
          <h3 className="nav-link" >AboutUs</h3>
        </li>
        <li className="nav-item">
          <h3 className="nav-link" >Contact Us</h3>
        </li>
        <li className="nav-item">
          <h3 className="nav-link" >Privacy Policy</h3>
        </li>
        
        
        
      </ul>
      <div className='d-flex justify-content-center'>
            
            <h3 className='nav-link nav-link-btn  rounded-5 p-3 mx-2'>Login</h3>
            <h3 className='nav-link nav-link-btn  rounded-5 py-3 px-4'>SignUp</h3>
      </div>
      
    </div>
  </div>
</nav>
   </>
  )
}
