import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from './pages/register';

function App() {
  return (
    
    <Router>
      <Routes>
        <Route exact path="/" element={<Register></Register>}></Route>
      </Routes>
      </Router>
  );
}

export default App;
