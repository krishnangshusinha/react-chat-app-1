import React from "react";
import './Message.css';

const Message = ({message:{user , text} , name}) => {

    let isSentByCurrentUser = false;

    let trimmedName = name;
    if( name )
        trimmedName = name.trim().toLowerCase();

    if( user === trimmedName ){
        isSentByCurrentUser = true;
    }

    return(
        <>
            {
                isSentByCurrentUser 
                ? ( // if current user has sent message
                    <div className="messageContainer justifyEnd">
                        <p className="sentText pr-10"> {trimmedName} </p>
                        <div className="messageBox backgroundBlue">
                            <p className="messageText colorWhite">{text}</p>
                        </div>
                    </div>
                )
                :(  // if other user has sent message
                    <div className="messageContainer justifyStart">
                        <div className="messageBox backgroundLight">
                            <p className="messageText colorDark">{text}</p>
                        </div>
                        <p className="sentText pr-10"> {user} </p>
                    </div>
                )

            }
        </>
    );
}

export default Message;