import React from "react";
import Redirectbutton from "./redirectbutton";
function Firstcolumn() {

    return (
        <div class="col-2 global-first-col main-cols">
            {/* <Redirectbutton content="Your BlogZ" />   */}
            <ul class="list-group redirect-list">
                <Redirectbutton content="Global BlogZ"  redirect="/global"/>
                <Redirectbutton content="Your BlogZ" redirect="/profile" />
                <Redirectbutton content="Saved BlogZ" redirect="/saved"/>
                <Redirectbutton content="Write a new Blog 🧾" redirect="/write" />
            </ul>
        </div>
    )

}

export default Firstcolumn;