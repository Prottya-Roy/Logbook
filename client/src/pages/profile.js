import React,{useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import Menu from "./menu";
import BlogCard from "./blogCard";
import NotFound from "./notFound";
import EditProfile from "./EditProfile";

const Profile=()=>{
    const {id} = useParams();
    let owner = id!== undefined ? id : localStorage.getItem("userId");

    const [profile, setProfile] = useState({});
    const [editProfileMode, setEditProfileMode] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
	const [error, setError] = useState(false);
	const [errorCode, setErrorCode] = useState(false);
	const [errorMsg, setErrorMsg] = useState(false);

    const [blogs, setBlogs]= useState([]);
    async function getBlogs(){
        const response = await fetch('http://localhost:1111/blog/from/'+owner,{
            method:'GET',
        })
        const data = await response.json();
        console.log(data);
        setBlogs(data);
    }

    async function getProfile(){
        const response = await fetch('http://localhost:1111/user/byId/'+owner,{
            method:'GET',
        })
        const status = await response.status;
        switch(status){
            case 200:
				const data = await response.json();
				setProfile(data)
				break;
			case 404:
				setError(true)
				setErrorCode(404)
				setErrorMsg("User Not Found")
				break;
			default:
				setError(true)
				setErrorCode(status)
				setErrorMsg("Unknown error")
        }
    }
    async function authUser(){
        const user= localStorage.getItem('userID');
        if(user=== owner){
            setIsOwner(true);
        }
    }
    useEffect(()=>{
        authUser()
        getProfile()
        getBlogs()
    },[])

    const editProfileDone = () =>{
		setEditProfileMode(false)
		getProfile()
	}

    return(
        error? <NotFound code={errorCode} msg={errorMsg} /> :
        <>
        <Menu/>
        <div className="App center">
            <div className="profile">
                <pre>Name : {profile.name}</pre>
                <pre>Username : {profile.username}</pre>
                <pre>Email : {profile.email}</pre>
                <pre>Blogs : {profile.blogs}</pre>
                <div className="linear">
            		{isOwner ? <button className="btn" onClick={() => setEditProfileMode(true) }>Edit Profile</button>:<button>Poke</button>}
					<EditProfile trigger={editProfileMode} profile={profile} done={editProfileDone}>
						<button className="btn" onClick={() => setEditProfileMode(false)}>Cancel</button>
					</EditProfile>
            	</div> 
            </div>
            {blogs.map((val)=> {return <BlogCard blogId={val.id} showFull={false}/>})}

        </div>
        </>
    );
}

export default Profile;