import React, { useState } from "react";
import {Link} from 'react-router-dom';
import './Join.css';

const Join = () => {

    const [name , setName] = useState();
    const [room , setRoom] = useState();

    const updateName = (event) => {
        setName(event.target.value);
    }
    const updateRoom = (event) => {
        setRoom(event.target.value);
    }

    const isvalidinput = (event) => {
        
        if( !name || !room ){       // if no valid input if given
            return event.preventDefault();  // prevent clicking of the button
        }
        
        return null;
          
    }
    return (
        <>
            <div className="joinOuterContainer">
                <div className="joinInnerContainer">
                    <h1 className="heading">Join</h1>
                    <div><input type="text" placeholder="Name" className="joinInput" onChange={updateName} /></div>
                    <div><input type="text" placeholder="Room" className="joinInput mt-20" onChange={updateRoom} /></div>

                    <Link onClick={isvalidinput}   to={`/chat?name=${name}&room=${room}`}>      {/* this <Link> makes browser to redirect to a path as mentioned within the "to" attribute , in this case here even variables are being passed named "name" and "room" separated by '&   */}
                        <button type="submit" className="button mt-20">Sign In</button>
                    </Link>

                </div>
            </div>
        </>
    );
}

export default Join;