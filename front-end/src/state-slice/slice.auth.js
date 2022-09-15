  
import { createSlice } from "@reduxjs/toolkit";
import { checkLogin, getLoggedInUser } from "../utils/localStorageFunctions";
const user = getLoggedInUser();
const loggedIn = checkLogin();
const initialState = {login:loggedIn,user:user}

const authSlice = createSlice({
name: "auth",
initialState,
reducers:{
setLoginState(state,action){
    state.login = action.payload;
},
setLoginUser(state,action){
    state.user = action.payload
}
}
});


export const { setLoginState,setLoginUser } = authSlice.actions
export default authSlice.reducer