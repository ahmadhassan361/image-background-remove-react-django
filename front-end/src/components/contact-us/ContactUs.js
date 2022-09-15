import React, { useState } from 'react'
import '../../styles/static-page.css'
import {BASE_URL} from '../../constants/Endpoints'
import ReCAPTCHA from 'react-google-recaptcha'
import { contactUsRequest } from '../../service/service'
import { successToast, warningToast } from "../../constants/toasts";

export const ContactUs = () => {

  const [name,setName] = useState({value:'',error:''})
  const [email,setEmail] = useState({value:'',error:''})
  const [message,setMessage] = useState({value:'',error:''})
  const [captchaResult, setCaptchaResult] = useState()


  async function handle_submit(e){
    e.preventDefault();
    if(name.value === ''){
      setName({value:name.value,error:'Name must not be empty'})
    }else if(email.value === '' || !email.value.includes('@') || !email.value.includes('.')){
      setEmail({value:email.value,error:'Invalid email address'})
      
    }else if(message.value === ''){ 
      
      setMessage({value:message.value,error:'Message must not be empty'})
    }else{
      console.log(name.value,email.value,message.value);
      const response = await contactUsRequest({
        'name':name.value,
        'email':email.value,
        'message':message.value
      })
      if(response.response){
        warningToast('Something Went Wrong! Please Try again');
      }else{
        successToast(response.message);
        setName({value:'',error:''});
        setEmail({value:'',error:''});
        setMessage({value:'',error:''});
      }
    }


  }

  const handleRecaptcha = (value) => {

    fetch(BASE_URL+'/api/recaptcha/', {
      method: 'POST',
      body: JSON.stringify({ 'captcha_value': value }),
      headers: { 'Content-Type': 'application/json' }
    })
     .then(res => res.json())
     .then(data => {
       console.log(data.captcha.success)
       setCaptchaResult(data.captcha.success)
     }) 
  }


  return (
    <div>
        <div className="br-title-section">
        <h1>
          Contact <span>Us</span>
        </h1>
      </div>
      <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-7 shadow rounded p-3 p-lg-5 text-start">
              <p
                className="lead p-0"
                style={{ fontSize: "16px", textAlign: "justify" }}
              >
                If you have any questions, suggestions or business inquires or any other requests. Feel free to fill the simple form below or contact us via our official e-mail address: <a href="mailto:backgroundremovercc@gmail.com">backgroundremovercc@gmail.com</a><br /> We will try to answer you as soon as possible.
              </p>
              <form>
              <div className="mb-3">
                <label  className="form-label">Full Name</label>
                <input type="text" className="form-control" id="name" name='name' value={name.value} onChange={(e)=>setName({value:e.target.value,error:''})}  />
                <div  className="form-text text-danger">
                    {name.error}
                  </div>
              </div>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                value={email.value} onChange={(e)=>setEmail({value:e.target.value,error:''})}
                />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                <div  className="form-text text-danger">
                    {email.error}
                  </div>
              </div>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Message</label>
                <textarea name="message" id="message" rows="10" className="form-control" placeholder='type here your message'
                value={message.value} onChange={(e)=>setMessage({value:e.target.value,error:''})}
                ></textarea>
                <div  className="form-text text-danger">
                    {message.error}
                  </div>
              </div>
              <div className='d-flex'>

              <ReCAPTCHA 
              className='mx-auto'
                sitekey="6LdWvO0hAAAAAP13FYg7Vp1m8lRt3jrw8E9eJYMR"
                onChange={handleRecaptcha}
                />
              </div>
              
              {
                captchaResult && <button type='submit' className="btn btn-primary" onClick={(e) => {handle_submit(e)}}>Submit</button>
              }
              
            </form>
              
            </div>
          </div>
        </div>
    </div>
  )
}
