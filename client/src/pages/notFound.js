import React from "react";
function NotFound(prop){
    return(
        <div className="App center">
            <h1>T_T</h1>
            <h1>{prop.code}</h1>
            <h1>{prop.msg}</h1>
        </div>
    );
}

export default NotFound;