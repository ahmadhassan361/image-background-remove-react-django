import React from 'react'
import Logo from '../../assets/Logo.svg'
import UserImg from '../../assets/user.png'
import '../../styles/navbar.css'
import { Outlet, Link } from "react-router-dom";
import { deleteLogin } from '../../utils/localStorageFunctions';
import { useDispatch } from 'react-redux';
import { setLoginState, setLoginUser } from '../../state-slice/slice.auth';
import { BASE_URL } from '../../constants/Endpoints';
import { warningToast } from '../../constants/toasts';

export const Navbar = ({login,user}) => {
  const dispatch = useDispatch();

  function logout(){
    deleteLogin();
    dispatch(setLoginState(false));
    dispatch(setLoginUser(null));
    warningToast("Logged Out Successfully..")
  }



  return (
   <>
    <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top">
  <div className="container">
  <Link className='text-decoration-none' to="/"><img src={Logo} className="navbar-brand" width={160} alt="logo"  /></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className='text-decoration-none' to="/"><h3 className="nav-link" >Home</h3></Link>
          
        </li>
        <li className="nav-item">
          <Link className='text-decoration-none' to="/about-us"><h3 className="nav-link" >About Us</h3></Link>
        </li>
        <li className="nav-item">
        <Link className='text-decoration-none' to="/contact-us"><h3 className="nav-link" >Contact Us</h3></Link>
        </li>
        {/* <li className="nav-item">
        <Link className='text-decoration-none' to="/more-tools"><h3 className="nav-link" >More Tools</h3></Link>
        </li> */}
      </ul>
      {
        !login?
        <div className='d-flex justify-content-center'>
        <Link to="/login" className='text-decoration-none text-main'><h3 className='nav-link nav-link-btn  rounded-5 p-3 mx-2'>Login</h3></Link> 
        <Link to="/login" className='text-decoration-none text-light'><h3 className='sign-up-btn br-color nav-link nav-link-btn  rounded-5 py-3 px-4'>Sign Up</h3></Link> 
        </div>:
        <div className='d-flex justify-content-start'>
          <div className="dropdown text-center">
            
          {user ===null || user.profile_img === '' ||user.profile_img === null? 
           
          <img src={UserImg} className="rounded-circle border border-2 dropdown-toggle btn p-1" width={40} height={40} alt="" data-bs-toggle="dropdown" aria-expanded="false" />  
          : <img src={BASE_URL+user.profile_img} className="rounded-circle border dropdown-toggle btn p-0" width={40} height={40} alt="" data-bs-toggle="dropdown" aria-expanded="false" />
        }
        
            
           
            <ul className="dropdown-menu">
              <li><Link to="/account" className='text-decoration-none text-dark' > <h6 className="dropdown-item">My Profile</h6></Link></li>
              <li><h6 className="dropdown-item">History</h6></li>
              <li onClick={logout}><h6 className="dropdown-item">Logout</h6></li>
              
            </ul>
          </div>
        </div>
      }
      
    </div>
  </div>
</nav>
<Outlet />
   </>
  )
}
