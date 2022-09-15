import React, { useState } from "react";
import "../../styles/authentication.css";
import ReactLoading from "react-loading";
import { loginRequest, signupRequest } from "../../service/service";
import {  setLogin } from "../../utils/localStorageFunctions";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setLoginState, setLoginUser } from "../../state-slice/slice.auth";
import { Navigate } from 'react-router-dom';
import { successToast, warningToast } from "../../constants/toasts";
import {BASE_URL} from '../../constants/Endpoints'
import ReCAPTCHA from 'react-google-recaptcha'
export const Authentication = ({login}) => {
  
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [captchaResult, setCaptchaResult] = useState()

  const [tab, setTab] = useState(true);
  const [loginError, setLoginError] = useState([]);
  const [signupError, setSignupError] = useState([]);

  const [loading, setLoading] = useState(false);
  const [loginEmail, setLoginEmail] = useState({ value: "", error: "" });
  const [loginPassword, setLoginPassword] = useState({ value: "", error: "" });
  const [signupEmail, setSignUpEmail] = useState({ value: "", error: "" });
  const [signupPassword, setSignUpPassword] = useState({
    value: "",
    error: "",
  });
  const [signupFirtname, setSignUpFirstname] = useState({
    value: "",
    error: "",
  });
  const [signupLastname, setSignUpLastname] = useState({
    value: "",
    error: "",
  });

  async function handle_signup() {
    var error = false;
    setLoading(true);
    if (signupFirtname.value === "") {
      setSignUpFirstname({ value: "", error: "Firstname must not be empty" });
      error = true;
    } 
    if (signupLastname.value === "") {
      setSignUpLastname({ value: "", error: "Lastname must not be empty" });
      error = true;
    }
    if (signupEmail.value === "" || !signupEmail.value.includes("@") || !signupEmail.value.includes(".")) {
      setSignUpEmail({ value: signupEmail.value, error: "Invalid Email Address" });
      error = true;
    } 
    if (signupPassword.value === "" || signupPassword.value.length < 8) {
      setSignUpPassword({
        value: signupPassword.value,
        error: "Password must not be less than 8 characters",
      });
      error = true;
    }
    if(!error){
        await sendSignupResquest();
    }
    setLoading(false);
  }
  async function handle_login(){
    setLoading(true);
    if(loginEmail.value === '' || !loginEmail.value.includes("@") || !loginEmail.value.includes(".")){
        setLoginEmail({
            value:loginEmail.value,
            error:'Invalid Email Address'
        })
    }
    else if(loginPassword.value.length <8){
        setLoginPassword({
            value:loginPassword.value,
            error:'Password Must Be 8 or more'
        })
    }else{
        const data = {
        
            'username':loginEmail.value.replace(/\s+/g,' ').trim().toLowerCase(),
            'password':loginPassword.value.replace(/\s+/g,' ').trim(),
        }
        await sendLoginResquest(data);
    }
    setLoading(false);
  }
  async function sendSignupResquest(){
   const data = {
        'first_name':signupFirtname.value.replace(/\s+/g,' ').trim(),
        'last_name':signupLastname.value.replace(/\s+/g,' ').trim(),
        'email':signupEmail.value.replace(/\s+/g,' ').trim().toLowerCase(),
        'username':signupEmail.value.replace(/\s+/g,' ').trim().toLowerCase(),
        'password':signupPassword.value.replace(/\s+/g,' ').trim(),
    }
    const response = await signupRequest(data);
    console.log(response)
    if(response.response){
            try{
              warningToast(`Error! ${response.response.data.username}`);
                setSignupError(response.response.data.username)
                console.log(response)
            }catch{
                setSignUpEmail(['Something Went Wrong! Please Try Again Later'])
            }
        
    }else{
      successToast(`Account Created Successfully! We are Logging In`)

        const data = {
            
            'username':signupEmail.value.replace(/\s+/g,' ').trim().toLowerCase(),
            'password':signupPassword.value.replace(/\s+/g,' ').trim(),
        }
        await sendLoginResquest(data)
    }
  }
  async function sendLoginResquest(data){
  
    const response = await loginRequest(data);
    if(response.response){

        console.log(response.response.data.non_field_errors)
        setLoginError(response.response.data.non_field_errors)
        warningToast("Sorry! Something Went Wrong");
    }else{
      console.log(response);
      successToast(`Welcome Back ${response.first_name.toUpperCase()} ${response.last_name.toUpperCase()}`)
      setLogin(response);
        dispatch(setLoginState(true));
        dispatch(setLoginUser(response));
        navigate("/");
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
  if(login){
    return <Navigate to="/" replace={true} />
  }
  else{
    return (
    <div className="container py-5">
      <div className="row justify-content-center ">
        <div className="col-md-5 rounded shadow bg-light p-5 ">
          <div className="d-flex">
            <h4
              onClick={(e) => setTab(true)}
              className={
                tab
                  ? "w-50 p-2 text-center tab active"
                  : "w-50 p-2 text-center tab"
              }
            >
              Login
            </h4>
            <h4
              onClick={(e) => setTab(false)}
              className={
                !tab
                  ? "w-50 p-2 text-center tab active"
                  : "w-50 p-2 text-center tab"
              }
            >
              SignUp
            </h4>
          </div>
          {tab ? (
            //login tab
            <div className="pt-5">
              
                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <input
                  onChange={(e) =>
                    setLoginEmail({ value: e.target.value, error: "" })
                  }
                  value={loginEmail.value}
                    type="email"
                    className="form-control"
                    aria-describedby="emailHelp"
                  />
                  <div id="emailHelp" className="form-text text-danger">
                    {loginEmail.error}
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    onChange={(e) =>
                        setLoginPassword({ value: e.target.value, error: "" })
                      }
                    value={loginPassword.value}
                    className="form-control"
                    id="exampleInputPassword1"
                  />
                  <div id="emailHelp" className="form-text text-danger">
                    {loginPassword.error}
                  </div>
                </div>
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                  />
                  <label className="form-check-label">Remember Me</label>
                 
                
                </div>
                {loginError.map((e)=><h6 key={e} className="text-danger"><b>{e}</b></h6>)}
               
                {loading ? (
                  <button
                    type="button"
                    className="btn btn-primary w-100 mt-3"
                    disabled
                  >
                    <ReactLoading
                    className="mx-auto"
                      type={"spin"}
                      color={"#fefefe"}
                      height={30}
                      width={30}
                    />
                  </button>
                ) : (
                  <button type="button" onClick={handle_login} className="btn btn-primary w-100 mt-3">
                    Login
                  </button>
                )}
              
            </div>


          ) : (
            // signup tab
            <div>
              
                <div className="mb-3">
                  <label className="form-label">Firstname</label>
                  <input
                    onChange={(e) =>
                      setSignUpFirstname({ value: e.target.value, error: "" })
                    }
                    type="text"
                    className="form-control"
                    value={signupFirtname.value}
                    aria-describedby="emailHelp"
                  />
                  <div id="emailHelp" className="form-text text-danger">
                    {signupFirtname.error}
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Lastname</label>
                  <input
                    onChange={(e) =>
                      setSignUpLastname({ value: e.target.value, error: "" })
                    }
                    type="text"
                    className="form-control"
                    value={signupLastname.value}
                    aria-describedby="emailHelp"
                  />
                  <div id="emailHelp" className="form-text text-danger">
                    {signupLastname.error}
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <input
                    onChange={(e) =>
                      setSignUpEmail({ value: e.target.value, error: "" })
                    }
                    type="email"
                    className="form-control"
                    value={signupEmail.value}
                    aria-describedby="emailHelp"
                  />
                  <div id="emailHelp" className="form-text text-danger">
                    {signupEmail.error}
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    onChange={(e) =>
                      setSignUpPassword({ value: e.target.value, error: "" })
                    }
                    value={signupPassword.value}
                    type="password"
                    className="form-control"
                  />
                  <div id="emailHelp" className="form-text text-danger">
                    {signupPassword.error}
                  </div>
                </div>
                <div className="text-center d-flex">

                <ReCAPTCHA
                className="mx-auto"
                sitekey="6LdWvO0hAAAAAP13FYg7Vp1m8lRt3jrw8E9eJYMR"
                onChange={handleRecaptcha}
                />
                </div>
                {signupError.map((e)=><h6 key={e} className="text-danger"><b>{e.replace('username','email')}</b></h6>)}
                
                {
                 captchaResult && <> {loading ? (
                    <button
                      type="button"
                      className="btn btn-primary w-100 text-center mt-5"
                      disabled
                    >
                      <ReactLoading
                        className="mx-auto"
                        type={"spin"}
                        color={"#fefefe"}
                        height={30}
                        width={30}
                      />
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-primary w-100 mt-5"
                      onClick={handle_signup}
                    >
                      Signup
                    </button>
                    
                  )}</>
                }
              
              <p className="text-secondary mt-2 text-center " style={{'fontSize':'12px'}}>
              By creating this account, you agree to our <span><u><b>Privacy Policy</b></u></span> & <span><u><b>Cookie Policy</b></u></span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
  }

  
};
