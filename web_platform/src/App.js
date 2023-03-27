import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
  const isAuthenticated = localStorage.getItem("userEmailId");
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={isAuthenticated ? <Navigate to="/home" /> : <Login />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/phone-verification" element={<PhoneVerification />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to="/" />}
        />
        <Route
          path="/scheduler"
          element={isAuthenticated ? <Scheduler /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={isAuthenticated ? <Profile /> : <Navigate to="/" />}
        />
        <Route
          path="/scheduled-meetings"
          element={isAuthenticated ? <Posts /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
