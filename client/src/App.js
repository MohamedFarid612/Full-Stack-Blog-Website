import React from "react";
import Home from "./pages/home"
import Signup from "./pages/signup";
import Global from "./pages/global";
import Profile from "./pages/profile";
import Write from "./pages/write";
import {
  BrowserRouter,
  Routes,
  Route,
  Router
} from "react-router-dom";
import Saved from "./pages/saved";
import Friend from "./pages/friend";
import Fullblog from "./pages/fullblog";
import Filtered from "./pages/filtered";
 function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home></Home>} ></Route>
        <Route path="/signup" element={<Signup/>} ></Route>
        <Route path="/global" element={<Global/>} ></Route>
        <Route path="/profile" element={<Profile/>} ></Route>
        <Route path="/write" element={<Write/>} ></Route>
        <Route path="/saved" element={<Saved/>} ></Route>
        <Route path="/friend/*"  >
        <Route path=":username" element={<Friend/>} ></Route>
        </Route>
        <Route path="/blog/*"  >
        <Route path=":id" element={ <Fullblog/> } ></Route>
        </Route>
        <Route path="/filtered/*"  >
                   <Route path=":string" element={ <Filtered/>} ></Route>
        </Route>


      </Routes>
    </BrowserRouter>
  );
}

export default App;
