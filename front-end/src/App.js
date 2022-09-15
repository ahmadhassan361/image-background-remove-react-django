import { Footer } from "./components/footer/Footer";
import { HomePage } from "./components/home/HomePage";
import { Navbar } from "./components/navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Authentication } from "./components/authentication/Authentication";
import { useSelector } from "react-redux";
import { Profile } from "./components/profile/Profile";
import { PrivateRoute } from "./routes/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ContactUs } from "./components/contact-us/ContactUs";
import { AboutUs } from "./components/about-us/AboutUs";
import { TermsConditions } from "./components/terms-conditions/TermsConditions";
import { PrivacyPolicy } from "./components/privacy-policy/PrivacyPolicy";
import { MoreTools } from "./components/more-tools/MoreTools";
function App() {
  const { login, user } = useSelector((state) => state.auth);
  console.log(login);
  console.log(user);
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Navbar login={login} user={user} />
        <Routes>
          <Route path="/" element={<HomePage login={login} user={user} />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/more-tools" element={<MoreTools />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Authentication login={login} />} />
          <Route
            path="/account"
            element={
              <PrivateRoute login={login}>
                <Profile user={user} />
              </PrivateRoute>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
