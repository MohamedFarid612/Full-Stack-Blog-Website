import axios from "axios";
import React, { useEffect } from "react";
function Blog(props) {
    const [blog, setBlog] = React.useState(
        {
            id: props._id,
            saves: props.saves,
            upvotes: props.upVotes,
            downvotes: props.downVotes,
            tags:props.tags
        }
    )
  
    function handleSave() {

        axios.post("http://localhost:5000/save", { _id: blog.id }).then(res => {

            //console.log(res);
            setBlog((prev) => {
                return ({
                    ...prev,
                    ["saves"]: res.data.saves
                })
            });

        }).catch(err => {

            console.log(err);
        });

    }
    function handleUp() {
        axios.post("http://localhost:5000/upvote", { _id: blog.id }).then(res => {

            //console.log(res);
            setBlog((prev) => {
                return ({
                    ...prev,
                    ["upvotes"]: res.data.upvotes
                })
            });

        }).catch(err => {

            console.log(err);
        });


    }

    function handleDown() {
        axios.post("http://localhost:5000/downvote", { _id: blog.id }).then(res => {

            //console.log(res);
            setBlog((prev) => {
                return ({
                    ...prev,
                    ["downvotes"]: res.data.downvotes
                })
            });
        }).catch(err => {
            console.log(err);
        });


    }

    useEffect(()=>{},[blog]);

     function redirectAuthor()
     {
        window.location="/friend/"+props.author;
     }

    function redirect()
    {
     
     window.location="/blog/"+blog.id;

    }
    return (
        <div className="note">
            {
             blog.tags ? blog.tags.map((ex)=>{return <button className="tags">{ex}</button>}) :null
            }
            {/* <button className="tags">politics</button>
            <button className="tags">sports</button>
            <button className="tags">cp</button> */}
            <h2>{props.title}</h2>
            <h1>By : <span className="author" onClick={redirectAuthor}>{props.author}</span></h1>
            <p>{ props.content.length>100 ? props.content.substring(0,100)+" ... " : props.content}</p>
            <button onClick={redirect}>Read Full Blog</button>
            <button onClick={handleDown}>{blog.downvotes}<img src="../images/down.png" ></img></button>
            <button onClick={handleUp}>{blog.upvotes}<img src="../images/up.png"></img></button>
            <button onClick={handleSave}>{blog.saves}<img src="../images/save.png"></img></button>
        </div>);

}
export default Blog;