import React,{useState, useEffect} from "react";
function EditBlog(prop){
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [id, setId] = useState(0);

    async function editBlog(event){
        event.preventDefault();
        const response = await fetch('http://localhost:1111/blog/'+id,{
            method: 'PATCH',
            headers:{
                'authorization': localStorage.getItem('token'),
				'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title, body, id
            }),
        })
        const status = await response.status;
        switch(status){
            case 204:
				alert('Blog updated')
				prop.done(title, body)
				break;
			case 401:
				alert('You are not logged in')
				window.location.href = '/login'
				break;
			case 403:
				alert('You are not the uploader of this blog')
				break;
			case 404:
				alert('Blog not found')
				break;
			case 500:
				alert('Something went wrong')
				break;
        }
    }

    useEffect(()=>{
        setTitle(prop.title)
        setBody(prop.body)
        setId(prop.id)
    },[prop])

    return(prop.trigger === prop.id ?(
        <div className='popup'>
        <div className='popup_card center'>
            <div className="popup_header">
              <h1>Edit Blog</h1>
            </div>
            <div className="popup_body">
              <div className="left">
                Title:
              </div>
              <textarea
                  value={title} 
                  onChange={e => setTitle(e.target.value)}
                  type="text" 
              />
              <div className="left">
                Blog:  
              </div>
              <textarea
                className="input_Blog"
                  value={body} 
                  onChange={e => setBody(e.target.value)}
                  type="text" 
              />
            </div>
            <div className="popup_footer">
              <button onClick={editBlog}>Update</button>
              {prop.children}
            </div>
        </div>
    </div>
    ):"");
}
export default EditBlog;