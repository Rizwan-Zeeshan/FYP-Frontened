import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Signup from "./components/Signup";
import FacSignup from "./components/FacSignup";
import Login from "./components/Login";
import FacLogin from "./components/FacLogin";
import StudentDashboard from "./components/Dashboard1";
import Logout from "./components/Logout";
import UpDocument from "./components/UpDocument";
import Submissions from "./components/Submissions";
import ViewGrades from "./components/ViewGrades";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/student-signup" element={<Signup />} />
        <Route path="/faculty-signup" element={<FacSignup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/facLogin" element={<FacLogin />} />
        <Route path="/Dashboard1" element={<StudentDashboard />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/upload-document" element={<UpDocument />} />
        <Route path="/submission-history" element={<Submissions />} />
        <Route path="/view-grades" element={<ViewGrades />} />
      </Routes>
    </Router>
  );
}

export default App;
