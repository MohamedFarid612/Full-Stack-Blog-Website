import React from "react";
import Navbar from "../components/navbar";
import Blog from "../components/blog";
import Firstcolumn from "../components/firstcolumn";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import setHeader from "../utils/setHeader";
import Savedblog from "../components/savedblog";

let myUser;
if (localStorage.token) {
    const jwt = localStorage.getItem("token");
    myUser = jwtDecode(jwt);
    setHeader(localStorage.token);
}

function Saved() {
    const [user, setUser] = React.useState(myUser);
    const [blogs, setBlogs] = React.useState([]);
    let nav = useNavigate();
    React.useEffect(async () => {
        if (user) {
            await axios.get('http://localhost:5000/saved-blogs')
                .then(function (response) {

                    console.log(response.data);
                    setBlogs(response.data.reverse());
                })
                .catch(function (error) {
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
            <div className="page-title"><h3 className="page-title">{"Your Saved BlogZ 🧾" }</h3></div>
            <div class="   global-div ">
                <div class="row ">
                    <Firstcolumn />
                    <div class="col-8 global-main-col">
                        {blogs.map((blog) => {
                            console.log(1);
                            return <Savedblog author={blog.author} content={blog.body} upVotes={blog.upvotes} downVotes={blog.downvotes} saves={blog.saves} title={blog.title} tags={blog.tags}/>
                        })}
                    </div>
                    <div class="col-2 global-third-col">
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Saved;