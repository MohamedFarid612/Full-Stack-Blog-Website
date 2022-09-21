import React from "react";
import Navbar from "../components/navbar";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import setHeader from "../utils/setHeader";
import Blog from "../components/blog";

let myUser;
if (localStorage.token) {
  const jwt = localStorage.getItem("token");
  myUser = jwtDecode(jwt);
  setHeader(localStorage.token);
}
function Write() {
  const [username, setUser] = React.useState("");
  const [blog, setBlog] = React.useState(

    {

      body: "",
      title: "",
      author: "",
      email: "",
      tags: []
    }
  );
  // eb2a zawed el authorization
  React.useEffect(() => {
    axios.get("http://localhost:5000/find-user").then((res) => {
      console.log(res);
      setUser(res.data.username);
      //console.log(username);
    }).catch((err) => {
      console.log("err fel write");
    });


  }, []);

  React.useEffect(() => {
    console.log(username);
  }, [username]);


  function handleChange(event) {
    const { name, value } = event.target;
    setBlog((prev) => {

      console.log(prev);
      return {

        ...prev,
        [name]: value,
        author: username,
        email: myUser.email
      }
    })
  }


  function handleSubmit() {

    axios.post("http://localhost:5000/add-blog", blog).then((res) => {
      console.log(res);
      window.location = "/profile";
    }).catch((err) => {
      console.log("error f handle submit");
    });
  }



  function handleCheck(event) {

   const name=event.target.name;
    if (event.target.checked) {
      setBlog((prev) => {

        return {
          ...prev,
          ["tags"]:  [...prev.tags,name]
      }
      })
    }
    else {
      setBlog((prev) => {

        const mytags=prev.tags;
        return {
          ...prev,
          ["tags"]: [...prev.tags.filter((tag)=>{return tag!=name})]
      }
      })
    }

    console.log(blog);


  }
  return <div className="container-write"><Navbar></Navbar>

    <h1></h1>
    {/* {blogs.map((blog)=>{ return <Blog author="hesham"></Blog>;})} */}

    <div className="write container-write">

      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Author</label>
        <input class="form-control" type="text" placeholder={username} aria-label="Disabled input example" disabled></input>
      </div>

      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Title</label>
        <input type="" class="form-control" id="exampleFormControlInput1" placeholder="write a catchy title!" name="title" onChange={handleChange}></input>
      </div>
      <div class="mb-3">
        <label for="exampleFormControlTextarea1" class="form-label">Blog</label>
        <textarea class="form-control textarea-write" id="exampleFormControlTextarea1" placeholder="try to catch the reader's attention in the first sentence!" rows="8" name="body" onChange={handleChange}></textarea>


        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" onChange={handleCheck} name="Entertainment"></input>
          <label class="form-check-label" for="inlineCheckbox1">Entertainment</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" onChange={handleCheck} name="Technology"></input>
          <label class="form-check-label" for="inlineCheckbox2">Technology</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3" onChange={handleCheck} name="Politics" ></input>
          <label class="form-check-label" for="inlineCheckbox3">Politics</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" id="inlineCheckbox4" value="option4" onChange={handleCheck} name="Sports" ></input>
          <label class="form-check-label" for="inlineCheckbox4">Sports</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" id="inlineCheckbox5" value="option5" onChange={handleCheck} name="Health" ></input>
          <label class="form-check-label" for="inlineCheckbox">Health</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" id="inlineCheckbox6" value="option6" onChange={handleCheck} name="Food" ></input>
          <label class="form-check-label" for="inlineCheckbox6">Food</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" id="inlineCheckbox7" value="option7" onChange={handleCheck} name="Sarcasm" ></input>
          <label class="form-check-label" for="inlineCheckbox4">Sarcasm</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" id="inlineCheckbox8" value="option8" onChange={handleCheck} name="Religion"></input>
          <label class="form-check-label" for="inlineCheckbox4">Religion</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" id="inlineCheckbox8" value="option8" onChange={handleCheck} name="Nature"></input>
          <label class="form-check-label" for="inlineCheckbox4">Nature</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" id="inlineCheckbox8" value="option8" onChange={handleCheck} name="Science"></input>
          <label class="form-check-label" for="inlineCheckbox4">Science</label>
        </div>

        <button type="submit" class="btn btn-light mybtn submit-write" onClick={handleSubmit} >Submit</button>



      </div>

    </div>

  </div>

}
export default Write;