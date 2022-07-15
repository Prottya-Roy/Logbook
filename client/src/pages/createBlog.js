import React, {useState,useEffect} from "react";
const Create = (prop)=>{
    const[title, setTitle] = useState('');
    const[body, setBody] = useState('');
    const[done, setDone] =useState(false);

    async function createBlog(event){
        event.preventDefault();
        const response = await fetch('http://localhost:1111/blog/',{
            method:'POST',
            headers: {
                'authorization': localStorage.getItem('token'),
				'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,body
            }),
        })

        const status = await response.status;
        switch(status){
            case 201:
                alert('Blog created')
				window.location.reload(true);
				setDone(true)
				setTitle('')
				setBody('')
				break;
			default:
				alert('Something went wrong')
        }
    }

    useEffect(()=>{
        setDone(false)
    },[prop])

    return(prop.trigger && !done?(
        <div className='popup'>
            <div className='popup_card center'>
                <div className="popup_header">
                	<h1>Create Blog</h1>
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
					<button onClick={createBlog}>Post</button>
					{prop.children}
                </div>
            </div>
        </div>
      ) :"")
}
export default Create;