import React, { useState, useRef } from "react";
import UserImg from "../../assets/user.png";
import ReactLoading from "react-loading";
import { changeInfoRequest, changePasswordRequest, changeProfileImageRequest } from "../../service/service";
import { getLoggedInUser, setLogin } from "../../utils/localStorageFunctions";
import { useDispatch } from "react-redux";
import { setLoginUser } from "../../state-slice/slice.auth";
import { BASE_URL } from "../../constants/Endpoints";
import { successToast, warningToast } from "../../constants/toasts";

export const Profile = ({ user }) => {
  const dispatch = useDispatch();

  const fileInput = useRef();
  const [imageLoading, setImageLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState("");
  const [fileError, setFileError] = useState("");
  const [profilePassword, setprofilePassword] = useState({
    value: "",
    error: "",
  });
  const [profilePasswordNew, setprofilePasswordNew] = useState({
    value: "",
    error: "",
  });

  const [profileFirtname, setprofileFirstname] = useState({
    value: user.first_name,
    error: "",
  });
  const [profileLastname, setprofileLastname] = useState({
    value: user.last_name,
    error: "",
  });

  const selectFile = () => {
    fileInput.current.click();
  };
  async function handle_image_change(e) {
    setImageLoading(true);
    setFile(URL.createObjectURL(e.target.files[0]));
    const response = await changeProfileImageRequest(e.target.files[0], user);
    if (response.response) {
      setFileError("Something went wrong! Please Try Again");
      warningToast("Sorry! Something Went Wrong");
    } else {
      if (response.code === 200) {
        successToast("Profile Image Updated Successfully!")
        const currentUser = getLoggedInUser();
        currentUser.profile_img = response.image;

        console.log(currentUser);
        setLogin(currentUser);
        dispatch(setLoginUser(currentUser));
      }
    }
    setImageLoading(false);
  }

  async function handle_change_info(){
    setLoading(true);
    if(profileFirtname.value === ''){
        setprofileFirstname({value:'',error:'First name must not be empty'})
    }else if(profileLastname.value === ''){
        setprofileLastname({value:'',error:'Last name must not be empty'})
    }else{
        const formData = {'first_name':profileFirtname.value,'last_name':profileLastname.value}
        const response = await changeInfoRequest(formData,user);
        if(response.response){
            console.log(response);
            warningToast("Sorry! Something Went Wrong");
        }else{
            if(response.code === 200){
                successToast("Profile Updated Successfully!")
                const currentUser = getLoggedInUser();
                currentUser.first_name = profileFirtname.value;
                currentUser.last_name = profileLastname.value;

                console.log(currentUser);
                setLogin(currentUser);
                dispatch(setLoginUser(currentUser));
            }
        }
    }
    setLoading(false);
  }

  async function handle_change_password(){
    setLoading(true);
    if(profilePassword.value.length <8){
        setprofilePassword({value:profilePassword.value,error:'password must be 8 or more characters'})
    }else if(profilePasswordNew.value < 8){
        setprofilePasswordNew({value:profilePasswordNew.value,error:'password must be 8 or more characters'})
    }else{
        const formData = {
            'old_password':profilePassword.value,
            'new_password':profilePasswordNew.value
        }
        const response = await changePasswordRequest(formData,user);
        if(response.response){
            warningToast('Error! Password Not Matched..');
        }else{
            successToast('Password Changed Successfully..');
            setprofilePassword({value:'',error:''});
            setprofilePasswordNew({value:'',error:''});
        }
    }
    setLoading(false);

  }

  return (
    <div className="container py-5">
      {/* Profile Image */}
      <div className="text-center">
        {user.profile_img === null || user.profile_img === "" ? (
          <img
            src={file === "" ? UserImg : file}
            className="rounded-circle border p-1"
            width={120}
            height={120}
            alt=""
          />
        ) : (
          <img
            src={BASE_URL + user.profile_img}
            className="rounded-circle border"
            width={120}
            height={120}
            alt=""
          />
        )}
        <input
          type="file"
          onChange={handle_image_change}
          ref={fileInput}
          style={{ display: "none" }}
          accept="image/x-png,image/jpeg,image/jpg"
        />
        {imageLoading ? (
          <ReactLoading
            className="mx-auto"
            type={"spin"}
            color={"#fefefe"}
            height={30}
            width={30}
          />
        ) : (
          <h6
            onClick={selectFile}
            className="text-main mt-2 "
            style={{ cursor: "pointer" }}
          >
            <i className="fa-solid fa-pen"></i> Change Image
          </h6>
        )}
        <h6 className="text-danger">{fileError}</h6>
      </div>
      <hr className="mt-3 mx-5" />

      {/* Personal Details */}
      <div className="row justify-content-center">
        <div className="col-md-6 bg-white p-5  ">
          <div className="">
            <h5 className="rounded bg-light py-2 px-1 text-center">
              Personal Details
            </h5>
            <div className="mb-3">
              <label className="form-label">Firstname</label>
              <input
                onChange={(e) =>
                  setprofileFirstname({ value: e.target.value, error: "" })
                }
                type="text"
                className="form-control"
                value={profileFirtname.value}
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text text-danger">
                {profileFirtname.error}
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Lastname</label>
              <input
                onChange={(e) =>
                  setprofileLastname({ value: e.target.value, error: "" })
                }
                type="text"
                className="form-control"
                value={profileLastname.value}
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text text-danger">
                {profileLastname.error}
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                readOnly
                type="email"
                className="form-control "
                style={{ backgroundColor: "whitesmoke" }}
                value={user.email}
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text text-main">
                Sorry! You cannot change your email
              </div>
            </div>
            {loading ? (
              <button
                type="button"
                className="btn btn-primary px-5 text-center mt-3"
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
                className="btn btn-primary px-5 mt-3"
                onClick={handle_change_info}
              >
                Save
              </button>
            )}
          </div>
        </div>
        <div className="col-md-6 bg-white p-5  ">
          <div className="">
            <h5 className="rounded bg-light py-2 px-1 text-center">
              Change Password
            </h5>
            <div className="mb-3">
              <label className="form-label">Current Password</label>
              <input
                onChange={(e) =>
                  setprofilePassword({ value: e.target.value, error: "" })
                }
                value={profilePassword.value}
                type="password"
                className="form-control"
              />
              <div id="emailHelp" className="form-text text-danger">
                {profilePassword.error}
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">New Password</label>
              <input
                onChange={(e) =>
                  setprofilePasswordNew({ value: e.target.value, error: "" })
                }
                value={profilePasswordNew.value}
                type="password"
                className="form-control"
              />
              <div id="emailHelp" className="form-text text-danger">
                {profilePassword.error}
              </div>
            </div>
            <ul>
                <li>password must be 8 or more characters</li>
                <li>must enter Upper, Lower case letter</li>
                <li>must enter numbers & symbols</li>
                
            </ul>

            {loading ? (
              <button
                type="button"
                className="btn btn-primary px-5 text-center mt-3"
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
                className="btn btn-primary px-5 mt-3"
                onClick={handle_change_password}
              >
                Save
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
