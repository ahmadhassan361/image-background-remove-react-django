import { Footer } from "./components/footer/Footer";
import { HomePage } from "./components/home/HomePage";
import { Navbar } from "./components/navbar/Navbar";

function App() {
  return (
    <>
     <Navbar/>
     <div className="">
      <HomePage/>
     
    </div>
    <Footer/>
    </>
    
  );
}

export default App;
