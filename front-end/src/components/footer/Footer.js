import React from 'react'
import Logo from '../../assets/Logo.svg'
import '../../styles/footer.css'
export const Footer = () => {
  return (
    <div className='container-fluid bg-primary py-5' style={{"minHeight":'40vh'}}>
      <div className="container">
      <div className="row justify-content-between">
      <div className='rounded p-2 text-center mb-2  col-lg-2' style={{'backgroundColor':'rgba(256,256, 256, .9)'}}>
        <img src={Logo} className=" my-2 "  width={170} alt="logo"  />
        <br /><small className='fw-bold text-secondary '>Remove Image Background <br /> Online <span className='text-primary'><strong>100%</strong></span></small>
        <br /><button className="rounded-5  mt-2 btn mx-auto  btn-primary  d-lg-block ">
                <i className="fas fa-upload" data-v-233d445a=""></i>{" "}
                <strong>Upload Image</strong>
        </button>
      </div>
        <div className='col-lg-8'>
        <h1 className='title-footer text-white text-center'>FOLLOW</h1>
        <h1 className='title-footer text-white text-center'>BACKGROUNDREMOVER.CC</h1>
        <div className="d-flex justify-content-center">
      <a href='https://facebook.com' className='text-end text-light text-decoration-none mx-1 fs-3'><i class="fa-brands fa-facebook"></i></a>
      <a href='https://instagram.com' className='text-end text-light text-decoration-none mx-1 fs-3'><i class="fa-brands fa-instagram"></i></a>
      <a href='https://linkedin.com' className='text-end text-light text-decoration-none mx-1 fs-3'><i class="fa-brands fa-linkedin"></i></a>
      </div>
        </div>
      <div className='col-lg-2'>
      <div className=" text-light mt-2 " >
        <h5><strong>Links</strong></h5>
        <h6 className=' footer-nav-link'>Remove Background</h6>
        <h6 className=' footer-nav-link'>About US</h6>
        <h6 className=' footer-nav-link'>Privacy Policy</h6>
        <h6 className=' footer-nav-link'>Contact Us</h6>
        <h6 className=' footer-nav-link'>Terms & Conditions</h6>
      
      </div>
      
      
      </div>
      </div>
      <hr className='w-50 mx-auto text-light mt-5 '/>
      <h6 className='text-center text-light'>Copyright © 2022 backgroundremover.cc</h6>
      <h6 className='text-center text-light'>Made with <svg width={15} aria-labelledby="svg-inline--fa-title-PUQdAnRaNfES" data-prefix="fas" data-icon="heart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="margin-x-4xs app-footer-heart-flutter svg-inline--fa fa-heart"><title id="svg-inline--fa-title-PUQdAnRaNfES" class="">love</title><path fill="currentColor" d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" class=""></path></svg> by <a href='https://zpexsolutions.com' className='fw-bold text-white '>ZpexSolutions</a></h6>
      </div>
    </div>
  )
}
