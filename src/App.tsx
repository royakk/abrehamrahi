import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Login } from "./pages/login";
import { Profile } from "./pages/profile";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
