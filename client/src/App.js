import { React,useState, createContext } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router,Routes, Route, Link,useLocation,useNavigate } from 'react-router-dom';
import UserProvider from "./components/context/Provider";
import Home from "./components/Home";
import Login from "./components/login";
import Setting from "./components/settings"
import Print from "./components/print";
import { Settings } from "@mui/icons-material";
function App() {
  const [status, setStatus] = useState();
  const [name, setName] = useState();

  const setStatusCallback = (id) => {
    setStatus(id);
  }

  const setNameCallback = (name) => {
    setName(name);
  }

  return ( 
  <>
    <UserProvider  children statusP={status} nameP={name}>
      <Routes>
        <Route path='/' element={<Login  setStatus={setStatusCallback} setName={setNameCallback}/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/settings' element={<Setting/>}></Route>      
        <Route path='/print' element={<Print/>}></Route>    
      </Routes>
    </UserProvider>
  </>
 );
}

export default App;
