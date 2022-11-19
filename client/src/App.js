import TopBar from "./components/topbar/TopBar";
import Home from "./pages/home/Home";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  const user = false;
  return (
    <Router>
      <TopBar />
      <Routes>
        <Route exact path="/" element={<Home />} />

        <Route path="/post/:postId" element={<Single />} />

        <Route path="/write" element={user ? <Home /> : <Write />} />

        <Route path="/settings" element={user ? <Home /> : <Settings />} />

        <Route path="/login" element={user ? <Home /> : <Login />} />

        <Route path="/register" element={user ? <Home /> : <Register />} />
      </Routes>
    </Router>
  );
}

export default App;
