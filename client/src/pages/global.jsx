import React from "react";
import Navbar from "../components/navbar";
import Blog from "../components/blog";
import Firstcolumn from "../components/firstcolumn";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import setHeader from "../utils/setHeader";
import Lastcolumn from "../components/lastcolumn";

let myUser;
if (localStorage.token) {
  const jwt = localStorage.getItem("token");
  myUser = jwtDecode(jwt);
  setHeader(localStorage.token); 
}

function Global() {
  const [user, setUser] = React.useState(myUser);
  const [blogs,setBlogs]=React.useState([]);
  let nav = useNavigate();
  React.useEffect(async () => {
    if (user) {
     // setHeader(localStorage.token);
     await axios.get('http://localhost:5000/all-blogs')
      .then(function (response) {
      
        setBlogs(response.data.reverse());
        console.log(response.data);
      
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
    }
    else {
      // window.location = "/";
      nav("/");
    }
  }, []);



  return (
    <div>
      <Navbar />
      <div className="page-title"><h3 className="page-title">{"Your Home Page"}</h3></div>
      <div class="   global-div ">
        <div class="row ">
          <Firstcolumn />
          <div class="col-8 global-main-col">
          {blogs.map((blog)=>
          {
           return <Blog author={blog.author} content={blog.body} upVotes={blog.upvotes} downVotes={blog.downvotes} saves={blog.saves} title={blog.title} _id={blog._id} tags={blog.tags}></Blog>
          })}
          </div>
        <Lastcolumn/>
        </div>
      </div>
    </div>
  );
}
export default Global;