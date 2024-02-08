import React, { useEffect, useState } from "react";
import queryString from 'query-string';
import io from 'socket.io-client';
import './Chat.css';
import { useLocation } from "react-router-dom";
import InfoBar from '../Inforbar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import TextContainer from "../TextContainer/TextContainer";

let socket;


const Chat = () => {

    const [name , setName] = useState('');
    const [room , setRoom] = useState('');
    const [message , setMessage] = useState('');
    const [messages , setMessages] = useState([]); 
    const [users , setUsers] = useState('');

    const location = useLocation();     // gets the location(i.e path) of current page

    const ENDPOINT = 'https://react-node-chat-app-1.onrender.com/';

    
    useEffect(()=>{         // by using this Hook, you tell React to perform certain operations(as mention in the call back function) whenever this component is being rendered

        const {name , room} = queryString.parse(location.search);       // location.search --> returns that part of the url which contains the variables
                                                                // queryString.parse() --> then parses that data into an object
        
                                                                
        socket = io(ENDPOINT , {transports: ['websocket', 'polling', 'flashsocket']});      // this function creates a connection between the socket io server i.e present at localhost5000 and the client present in here 
                                                                
        // setting name and room to, what is entered in the url
        setRoom(room);
        setName(name); 
        
        
        socket.emit('join', {name , room} , () => {         // emitting this 'name' & 'room' & a callback by an event called 'join', and we would accept it in the backend
            
        } );        


        return ()=>{
            socket.emit('disconnect');

            socket.off();
        }

    }, [ENDPOINT , location.search]);      // so this useEffect() get called each time you change the value of "ENDPOINT" or "locations.search" while Chat component is rendering
    
    // so each time one enters with some localhost and location.seach value this io() connects it with the server at local host 5000 and we get a message of new connection added.


    useEffect(()=>{
        socket.on('message', (message) => {
            setMessages([...messages , message]);
        } )

        socket.on("roomData", ({ users }) => {      // getting the list of users in a room
            setUsers(users);
        });

    },[messages]);      // running this hook only when messages array changes


    const sendMessage = (event) => {

        event.preventDefault();     // preventing refreshing of page

        if( message ){
            socket.emit('sendMessage' , message , () => setMessage(''));
        }
    }


    return (
        <>
            <div className="outerContainer">
                <div className="container">
                    <InfoBar room={room} />
                    <Messages messages={messages} name={name} />
                    <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
                </div>
                <TextContainer users={users}/>
            </div>
        </>
    );
}

export default Chat;
