import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";

import "./App.css";
import PhoneVerification from "./components/PhoneVerification";
// import Home from "./components/Home";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route exact path="/" element={<Home />} /> */}
        <Route exact path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/phone-verification" element={<PhoneVerification />} />
      </Routes>
    </Router>
  );
}

export default App;
