import React, {useState,useEffect} from "react";
import EditBlog from "./EditBlog";
import NotFound from "./notFound";

function BlogCard(prop){
    const id = parseInt(prop.blogId);
    const [deleted, setDeleted] = useState(false);
    const [blogTitle, setBlogTitle] = useState('Loading...');
    const [blogBody, setBlogBody] = useState('Lodaing...');
    const [blog, setBlog] = useState({});
    const [editBlogMode, setEditBlogMode] = useState(-1);
	const [error, setError] = useState(false);
	const [errorCode, setErrorCode] = useState(false);
	const [errorMsg, setErrorMsg] = useState(false);

    async function deleteBlog(blogID){
        const response = await fetch('http://localhost:1111/blog/'+id,{
            method: 'DELETE',
            headers: {
				'authorization': localStorage.getItem('token')
			}
        })
        const status = await response.status;
        switch(status){
            case 204:
                alert('Blog Deleted');
                setDeleted(true)
                break;

            case 401:
                alert('You are not logged in')
                window.location.href = '/login'
                break;

            case 403:
                alert('You are not the uploader of this story')
                break;
            case 404:
                alert('Story not found')
                break;
            case 500:
                alert('Something went wrong')
                break;
        }
    }

    async function getBlog(){
        const response = await fetch('http://localhost:1111/blog/'+id,{
            method:'GET',
        })
        const status = await response.status;
        switch(status){
            case 200:
                const data = await response.json();
                setBlog(data)
                setBlogTitle(data.title)
                setBlogBody(data.body)
                break;

            case 404:
                setError(true)
                setErrorCode(404)
                setErrorMsg("Blog not found")
                break;

            default:
                alert('Something went Wrong')
        }
    }

    useEffect(()=>{
        getBlog()
    },[])

    const trim = (str, maxLength)=>{
        return str.length > maxLength ? str.slice(0, maxLength - 3) + '...' : str;
    }

    function editDone(title,body){
        setEditBlogMode(-1)
        setBlogTitle(title)
        setBlogBody(body)
    }
    async function giveMessage(){
        alert('Comment will be added later');
    }

    return(
        error? <NotFound code={errorCode} msg={errorMsg} /> :
        deleted? <pre className="strikethrough">[Deleted]</pre> :
        <div className="card">
            <div className="card-header">
                <h1>{blogTitle}</h1>
                Posted by <a href={`/profile/${blog.uploader}`}>{blog.uploader_Name}</a> on {new Date(blog.uploaded_On).toLocaleDateString()}
            </div>
            {prop.showFull ? 
                <div className="card-body">
                    <p>{blogBody}</p>
                </div>
            :
                <div className="card-body">
                    <p>{trim(blogBody, 300)}</p>
                    <div className='readMore'>
                        <pre className='linear '>
                            <a href={`/blog/${id}`}>Read more...</a>
                        </pre>
                    </div>
                </div>}
            <div className="card-footer">
                {
                blog.uploader === parseInt(localStorage.getItem('userID')) ?
                    <div className="modify">
                        <button onClick={() => setEditBlogMode(blog.id)}>Edit Blog</button>
                        <button onClick={() => deleteBlog(blog.id)}>Delete</button>
                        <EditBlog 
                            trigger={editBlogMode}
                            title={blog.title}
                            body={blog.body}
                            id={blog.id} 
                            done={editDone}
                        >
                            <button onClick={() => setEditBlogMode(-1)}>Cancel</button>
                        </EditBlog>
                    </div>
                :
                    null
                }
                <div className="comment">
                    <button className="btn" onClick={()=>giveMessage()}>Comment</button>
                </div>
            </div>
        </div>
    )
}
export default BlogCard;