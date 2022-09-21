import React from "react";

function Navbar() {
    return (
        <nav class="navbar navbar-expand-lg navbars">
            <div class="container-fluid ">
                <a class="navbar-brand white brand" href="#">MyBlogZ</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav  mb-2 mb-lg-0 ms-auto">
                        <li class="nav-item">
                            <a class="nav-link  white" aria-current="page" href="#">GitHub</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link white" href="#">Developers</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
export default Navbar;