import React from "react";
import Navbar from "../components/navbar";
import Blog from "../components/blog";
import Firstcolumn from "../components/firstcolumn";
import jwtDecode from "jwt-decode";
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios";
import setHeader from "../utils/setHeader";

let myUser;
if (localStorage.token) {
    const jwt = localStorage.getItem("token");
    myUser = jwtDecode(jwt);
    setHeader(localStorage.token);
}

function Filtered() {
    const [tags, setTags] = React.useState(useParams().string);
    const [user, setUser] = React.useState(myUser);
    const [blogs, setBlogs] = React.useState([]);
    let nav = useNavigate();
    React.useEffect(async () => {
        // console.log(tags.split("+"));

        if (user) {
            axios.post("http://localhost:5000/filtered-blogs", { tags: tags.split("+") }).then(res => {
                setBlogs(res.data.reverse());

            }).catch(err => {
                console.log(err);
            });
        }
        else {
            nav("/");
        }
    }, []);


    return (
        <div>
            <Navbar />
            <div className="page-title"><h3 className="page-title">{"Filtered BlogZ"}</h3></div>
            <div class="   global-div ">
                <div class="row ">
                    <Firstcolumn />
                    <div class="col-8 global-main-col">
                        {blogs.map((blog) => {
                            return <Blog author={blog.author} content={blog.body} upVotes={blog.upvotes} downVotes={blog.downvotes} saves={blog.saves} title={blog.title} _id={blog._id} tags={blog.tags}></Blog>
                        })}
                    </div>
                    <div class="col-2 global-third-col">
                        <h6>Tags</h6>
                        {
                            tags.split("+") ? tags.split("+").map((tag) => {
                               return <button className="filter">{tag}</button>
                            }):null
                        }
                    </div>
                </div>
            </div>
        </div>
    );

}
export default Filtered;