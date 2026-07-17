import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import "./index.css";
import Landing from "./pages/Landing";
import Menu from "./pages/Menu";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Checkout />} />
        {/*<Route path="/admin" element={<AdminPage />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
