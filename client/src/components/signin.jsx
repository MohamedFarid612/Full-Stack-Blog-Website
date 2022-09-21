import React from "react";
import axios from "axios";
import setHeader from "../utils/setHeader";
function Signin() {

    var [info,setInfo] =React.useState({
          email:"",
          password:""
    });
    function changed(event)
    {
        var {name,value}=event.target;

           setInfo(prev=>
            {
             return({
                ...prev,
                [name]:value
             })
            });
    }
     
    function toSignup(event){
        event.preventDefault();
        // console.log("hamada");
        window.location = "/signup";

    }
    function log(event)
    {

        event.preventDefault();
        axios.post('http://localhost:5000/login', info)
            .then(function (response) {
                if(response.data.token){
                    console.log(response.data);
                    const {data}=response;
                    console.log(data.token);
                    localStorage.setItem("token",data.token);
                    window.location="/global";
                }
                else 
                {
                    console.log("el user msh tamam ya by ssign inn");
                    window.location="/";
                }
            })
            .catch(function (error) {
                window.location="/";
                console.log("fi moshkel fel sign in");
            });

    }
    return (
        <div  className="center">
            <form>
                <div class="row mb-3 ">
                    <label for="inputEmail3" class="col-sm-2 col-form-label labelu"> </label>
                    <div class="col-sm-10 ">
                        <input type="email" class="form-control myinput" id="inputEmail3" placeholder="E-Mail" name="email" value={info.email} onChange={changed}></input>
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="inputPassword3" class="col-sm-2 col-form-label labelu"> </label>
                    <div class="col-sm-10">
                        <input type="password" class="form-control myinput" id="inputPassword3" placeholder="Password" name="password" value={info.password} onChange={changed}></input>
                    </div>
                </div>
                <button type="submit" class="btn btn-light mybtn" onClick={log}>Sign in</button>
                <button type="submit" class="btn btn-light mybtn" onClick={toSignup}>Sign up</button>

            </form>
        </div>);
}
export default Signin;