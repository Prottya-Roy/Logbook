import React,{useState, useEffect} from "react";
import Menu from "./menu";
import BlogCard from "./blogCard";

const Home = () =>{
    const [blogs, setBlogs] = useState([]);

    async function getBlogs(){
        const response = await fetch('http://localhost:1111/blog/',{
            method:'GET',
        })
        const data = await response.json();
        setBlogs(data);
    }

    useEffect(()=>{
        getBlogs()
    },[])

    return(
        <>
        <div>
            <Menu/>
        </div>
        <div className="App center">
            {blogs.map((val)=>{
                return <BlogCard blogId={val.id} showFull={false}/>
            })}
        </div>
        </>
    );
}

export default Home;