import React,{useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import Menu from "./menu";
import BlogCard from "./blogCard";

function Blog(){
    const {id} = useParams();
    return(
        <>
        <div>
            <Menu/>
        </div>
        <div className="App center">
            <BlogCard blogId = {id} showfull={true}/>
        </div>
        </>
    )
}
export default Blog;