import axios from "axios";
import React, { useEffect } from "react";
function Savedblog(props) {
    const [blog, setBlog] = React.useState(
        {
            id: props._id,
            saves: props.saves,
            upvotes: props.upVotes,
            downvotes: props.downVotes,
            tags: props.tags
        }
    )

    useEffect(() => { }, [blog]);





    function redirect() {

        window.location = "/blog/" + blog.id;

    }
    return (
        <div className="note">
            {
                blog.tags ? blog.tags.map((ex) => { return <button className="tags">{ex}</button> }) : null
            }
            <h2>{props.title}</h2>
            <h1>By : <span className="author">{props.author}</span></h1>
            <p>{props.content}</p>
            <button oncClick={redirect} >Read Full Blog</button>
        </div>);

}
export default Savedblog;