import React,{useState, useEffect} from "react";
import Create from "./createBlog";
const Menu=()=>{
    const [createMode, setCreateMode] = useState(false);
    const[loggedIn, setLoggedIn]= useState(false);
    async function auth(){
        if(localStorage.getItem('token') === null){
            setLoggedIn(false)
            localStorage.removeItem('userId')
            return;
        }
        const response = await fetch('http://localhost:1111/user/auth',{
            method: 'GET',
            headers: {
                'authorization': localStorage.getItem('token'),
            },
        })
        if(await response.status ===200){
            setLoggedIn(true)
            localStorage.setItem('userId', await response.json().userId)
        }
        else{
            setLoggedIn(false)
            localStorage.removeItem('userId')
        }
    }

    useEffect(()=>{
        auth();
    },[])

    function logOut(){
        localStorage.removeItem('userId')
        localStorage.removeItem('token')
        setLoggedIn(false)
        window.location.href='/login'
    }
    function createDone(){
        setCreateMode(false)
    }

    const gotoProfile= ()=>{
        if(loggedIn){
            const userID = localStorage.getItem('userID')
            window.location.href='/profile/'+userID
        }else {
            alert('You must be logged in to view your profile')
            window.location.href='/login'
        }
    }

    return(
        <div className="menuHolder">
        <div className="menu">
            <button onClick={() => window.location.href='/home'}>Home</button>
            <button onClick={gotoProfile}>Profile</button>
            <button onClick={() => setCreateMode(true)}>Create</button>
            <Create trigger={createMode} done={createDone}>
                <button onClick={() => setCreateMode(false)}>Cancel</button>
            </Create>
            {loggedIn ? 
                <button onClick={logOut}>Logout</button> : 
                <button onClick={() => window.location.href='/login'}>Login</button>}
        </div>
      </div>
    );
}

export default Menu;