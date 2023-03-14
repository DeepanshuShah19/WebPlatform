import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import PhoneVerification from "./components/PhoneVerification";
import "./App.css";
import Home from "./components/Home";
import Scheduler from "./components/Scheduler";
import Profile from "./components/Profile";
import Posts from "./components/Posts";
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/phone-verification" element={<PhoneVerification />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/scheduler" element={<Scheduler />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/scheduled-meetings" element={<Posts />} />
      </Routes>
    </Router>
  );
}

export default App;
