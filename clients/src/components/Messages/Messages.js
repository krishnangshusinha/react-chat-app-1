import React from "react";
import './Messages.css';
import ScrollToBottom from "react-scroll-to-bottom";
import Message from './Message/Message';

const Messages = ( {messages, name} ) => {

    return (
        <>
            <ScrollToBottom className="messages">        {/* This component imported from react-scroll-to-bottom brings that scrolling down effect when messaged dont fit in the screen */}
                {messages.map( (message , i) => <div key={i}> <Message message={message} name={name}/> </div>)}
            </ScrollToBottom>
        </>
    );
}

export default Messages;