import React from "react";
function Form(props) {
    
    return (
        <div className="note">
            <h2>{props.title}</h2>
            <h1>By : <span className="author">{props.author}</span></h1>
            <p>{props.content}</p>
        </div>);

}
export default Form;