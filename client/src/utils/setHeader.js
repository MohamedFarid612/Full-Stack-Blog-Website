import React from "react";
import axios from "axios";

const setHeader=(token)=>{

if(token)
{
    axios.defaults.headers.authorization="Bearer "+token;
}
else
{
    delete  axios.defaults.headers.authorization;
}

// axios.interceptors.request.use(config=>{
//     config.headers.authorization='Bearer '+token;
//     return config;
// },
// err=>
// {console.log(err);}
// )


}

export default setHeader;