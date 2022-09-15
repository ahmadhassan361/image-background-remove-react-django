import axios from 'axios';
import { BASE_URL } from '../constants/Endpoints';
export const uploadImageForRemoveBackground = async (file,login,user)=>{
    var formData = new FormData()
    formData.append('file',file)
    if(login){
      formData.append('user_id',user.user_id)
    }
    const response = await axios({
        method: "post",
        url: `${BASE_URL}/api/remove-background/`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((response)=>response.data)
      .catch((error)=>error);  
    return response;
}

export const signupRequest = async (formData)=>{
    
    
    const response = await axios({
        method: "post",
        url: `${BASE_URL}/api/createuser/`,
        data: formData,
      }).then((response)=>response.data)
      .catch((error)=>error);  
    return response;
}
export const loginRequest = async (formData)=>{
    
    
    const response = await axios({
        method: "post",
        url: `${BASE_URL}/api/login/`,
        data: formData,
      }).then((response)=>response.data)
      .catch((error)=>error);  
    return response;
}


export const changeProfileImageRequest = async (file,user)=>{
  var formData = new FormData()
  formData.append('profile_img',file)
  const response = await axios({
      method: "put",
      url: `${BASE_URL}/api/change-profile-image/`,
      data: formData,
      headers: { 
        "Content-Type": "multipart/form-data",
        "Authorization": `Token ${user.token}` 
     },
    }).then((response)=>response.data)
    .catch((error)=>error);  
  return response;
}
export const changeInfoRequest = async (formData,user)=>{
  const response = await axios({
      method: "put",
      url: `${BASE_URL}/api/change-info/`,
      data: formData,
      headers: { 
        "Authorization": `Token ${user.token}` 
     },
    }).then((response)=>response.data)
    .catch((error)=>error);  
  return response;
}
export const changePasswordRequest = async (formData,user)=>{
  const response = await axios({
      method: "put",
      url: `${BASE_URL}/api/change-password/`,
      data: formData,
      headers: { 
        "Authorization": `Token ${user.token}` 
     },
    }).then((response)=>response.data)
    .catch((error)=>error);  
  return response;
}
export const contactUsRequest = async (formData)=>{
    
    
  const response = await axios({
      method: "post",
      url: `${BASE_URL}/api/contact-us/`,
      data: formData,
    }).then((response)=>response.data)
    .catch((error)=>error);  
  return response;
}
export const getBackgroundImage = async ()=>{
    
  const response = await axios({
      method: "get",
      url: `${BASE_URL}/api/background-images/`,
    }).then((response)=>response.data)
    .catch((error)=>error);  
  return response;
}
