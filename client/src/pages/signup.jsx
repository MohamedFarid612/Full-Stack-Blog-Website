import React from "react";
import axios from "axios"
import Navbar from "../components/navbar";
import setHeader from "../utils/setHeader";

function Signup() {

    var [userInfo, setUserInfo] = React.useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    function handleChange(event) {
        var { name, value } = event.target;
        setUserInfo((prev) => {

            console.log(prev);
            return ({
                ...prev,
                [name]: value
            });
        });
    }
    function register(event) {
        event.preventDefault();
        axios.post('http://localhost:5000/register', userInfo)
            .then(function (response) {
                const {data}=response;
                console.log(data.token);
                localStorage.setItem("token",data.token); 
                setHeader(data.token); 
                window.location="/global";
            })
            .catch(function (error) {
               console.log("moshkela sign up ");
            })
 
    }
    return (
        <div >
            <Navbar />
            <div className="container-signup ">
                <form>
                    <div class="row mb-3 ">
                        <label for="inputEmail4" class="col-sm-2 col-form-label labelu">Username</label>
                        <div class="col-sm-10 ">
                            <input type="" class="form-control myinput" id="inputEmail4" value={userInfo.username} name="username" onChange={handleChange}></input>
                        </div>
                    </div>
                    <div class="row mb-3 ">
                        <label for="inputEmail3" class="col-sm-2 col-form-label labelu">Email</label>
                        <div class="col-sm-10 ">
                            <input type="" class="form-control myinput" id="inputEmail3" value={userInfo.email} name="email" onChange={handleChange}></input>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="inputPassword3" class="col-sm-2 col-form-label labelu">Password</label>
                        <div class="col-sm-10">
                            <input type="password" class="form-control myinput" id="inputPassword3" value={userInfo.password} name="password" onChange={handleChange}></input>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="inputPassword4" class="col-sm-2 col-form-label labelu" >confirm password</label>
                        <div class="col-sm-10">
                            <input type="password" class="form-control myinput" id="inputPassword4" value={userInfo.confirmPassword} name="confirmPassword" onChange={handleChange}></input>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-light mybtn" onClick={register}>Submit</button>

                </form>
            </div>
        </div>
    );
}
export default Signup;