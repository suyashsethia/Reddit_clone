// import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import { BrowserRouter as Router, Routes, Switch, Route, Link, useLocation } from 'react-router-dom';
// import BrowserRouter from 'react-rou'
function App() {
  return (
    <Router>
      <div>
        <Navbar></Navbar>
        <div className="">
          <Routes>

            <Route exact path="/SignIn" element={<SignIn></SignIn>}>
            </Route>
            <Route exact path="/SignUp" element={<SignUp></SignUp>}>
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
