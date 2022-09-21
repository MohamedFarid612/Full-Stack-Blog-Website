import React from "react";
function Redirectbutton(props) {
    var [isover,setIsover]=React.useState(false);

     function handle()
     {
        setIsover(!isover);
     }
     function go()
     {
        window.location=props.redirect;
     }
    return <li class="list-group-item redirect-list" style={{backgroundColor:isover? "white" :"" , color:isover? "black" :""}} onMouseOut={handle} onMouseOver={handle} onClick={go}>{props.content} </li>
}
export default Redirectbutton;