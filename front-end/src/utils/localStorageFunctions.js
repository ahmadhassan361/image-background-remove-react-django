export const setLogin = (data) => {
    console.log("logged in");
    localStorage.setItem("login", true);
    localStorage.setItem("user", JSON.stringify(data));
}
export const getLoggedInUser = () => {
   return JSON.parse(localStorage.getItem("user"));
}
export const checkLogin = () => {
   return (localStorage.getItem("login") === null ? false:true);
}
export const deleteLogin = () => {
   localStorage.removeItem("login");
   localStorage.removeItem("user");
   return true;
}