import React from 'react'
import '../../styles/footer.css'
export const Footer = () => {
  return (
    <div className='footer container-fluid ' style={{"minHeight":'40vh'}}>
      <div className="container">
        <div className='follow-us'>
              <span> Follow Us</span>
            </div>
            <div className='br-social-links'>
              <a href='https://www.facebook.com/backgroundremovercc/' className='text-end text-light text-decoration-none mx-1 fs-3'><i className="fa-brands fa-facebook"></i></a>
              <a href='https://www.instagram.com/backgroundremovercc/' className='text-end text-light text-decoration-none mx-1 fs-3'><i className="fa-brands fa-instagram"></i></a>
              <a href='https://www.linkedin.com/in/backgroundremover/' className='text-end text-light text-decoration-none mx-1 fs-3'><i className="fa-brands fa-linkedin"></i></a>
          </div>
      <div className='br-footer-menu col-lg-12'>
        <ul className="text-light mt-2">
          <li><h6 className=' footer-nav-link'>Privacy Policy</h6></li>
          <li><h6 className=' footer-nav-link'>Terms &amp; Conditions</h6></li>
          <li><h6 className=' footer-nav-link'>About US</h6></li>
          <li><h6 className=' footer-nav-link'>Contact Us</h6></li>
        </ul>
      </div>
      <hr className='w-50 mx-auto text-light'/>
      <h6 className='text-center text-light'>Copyright © 2022 BackgroundRemover.cc</h6>
      <h6 className='text-center text-light'>Made with <svg width={15} aria-labelledby="svg-inline--fa-title-PUQdAnRaNfES" data-prefix="fas" data-icon="heart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="margin-x-4xs app-footer-heart-flutter svg-inline--fa fa-heart"><title id="svg-inline--fa-title-PUQdAnRaNfES" className="">love</title><path fill="currentColor" d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" className=""></path></svg> by <a href='https://optimosweb.com' className='fw-bold text-white '>Optimos Web</a></h6>
      </div>
    </div>
  )
}
