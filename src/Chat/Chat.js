// import React, {useState, useEffect} from 'react'
// import {Avatar, IconButton} from "@material-ui/core"
// import {SearchOutlined, AttachFile,MoreVert, InsertEmoticon} from '@material-ui/icons';
// import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon"
// import MicIcon from '@material-ui/icons/Mic';
// import { useParams } from "react-router-dom"
// import db from '../firebase';
// import "./Chat.css"
// import {useStateValue} from "../StateProvider"
// import firebase from 'firebase';

// function Chat() {

//     const [seed, setSeed] = useState("");
//     const [input, setInput] = useState("")
//     const {roomId} = useParams();
//     const [roomName, setRoomName] = useState("")
//     const [messages, setMessages] = useState([]);
//     const [{ user } , dispatch] = useStateValue();



//     useEffect(() => {
//         if(roomId){
//             db.collection('rooms').doc(roomId)
//             .onSnapshot(snapshot => 
//                 setRoomName(snapshot.data().name))
//                 db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc')
//                 .onSnapshot(snapshot => (
//                     setMessages(snapshot.docs.map((doc) => doc.data()))
//                 ))
//         }
//     }, [roomId])

//     useEffect(() => {
//         setSeed(Math.floor(Math.random() * 5000)
//         )
//             }, [roomId])

//             const sendMessage = (e) => {
//                 e.preventDefault();
//                 db.collection('rooms').doc('roomId').collection('messages')
//                 .add({
//                     message: input,
//                     name: user.displayName,
//                     timestamp: firebase.firestore.FieldValue.serverTimestamp()
//                 })
//                 setInput('');
//             }

//     return (
//         <div className="chat">
//             <div className="chat_header">
// <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}></Avatar>
//                 <div className="chat_headerInfo">
//                     <h3>{roomName}</h3>
//                     <p>Last seen at...</p>
//                     </div>

//                     <div className="chat_headerRight">
//                         <IconButton>
//                             <SearchOutlined></SearchOutlined>
//                         </IconButton>
//                         <IconButton>
//                             <AttachFile></AttachFile>
//                         </IconButton>
//                         <IconButton>
//                             <MoreVert></MoreVert>
//                         </IconButton>
//                     </div>

//             </div>
//             <div className='chat_body'>
//                 {messages.map((message) => (
//                     <p className={`chat_message ${message.name === user.displayName && "chat_reciever"}`}>
//                     <span className="chat_name">{message.name}</span>{message.message}
//                     <span className="chat_timestamp">
//                         {new Date(message.timestamp?.toDate()).toUTCString()}
//                     </span>
//                     </p>
//                 ))}
                
//             </div>
//             <div className="chat_footer">
//                 <InsertEmoticonIcon />
//                 <form>
//                     <input value={input} onChange={e => setInput(e.target.value)} type="text" placeholder="Type a message"/>
//                     <button onClick={sendMessage} type="submit">Send a message</button>
//                 </form>
//                 <MicIcon />
//             </div>
//         </div>
//     )
// }

// export default Chat

import React, {useState,useEffect} from 'react';
import {Avatar, IconButton} from '@material-ui/core';
import {AttachFile, MoreVert, SearchOutlined} from '@material-ui/icons';
import MicIcon from '@material-ui/icons/Mic';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import './Chat.css';
import { useParams } from 'react-router-dom';
import db from '../firebase';
import firebase from 'firebase';
import {useStateValue} from "../StateProvider";

function Chat({darkMode}) {
    const [input, setInput] = useState("");
    const [seed, setSeed] = useState("");
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{user}, dispatch] = useStateValue();

    useEffect(()=>{
        if(roomId){
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => {
                setRoomName(snapshot.data().name);
            });

            db.collection('rooms').doc(roomId).collection("messages").orderBy("timestamp","asc").onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => doc.data()))
            });

        }
    },[roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));        
    }, [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })

        setInput("");
    }

    return (
        <div className='chat'>
            <div className='chat_header' data-theme={darkMode ? "dark" : "light"}>
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className='chat_headerInfo' data-theme={darkMode ? "dark" : "light"}>
                    <h3 className='chat_room_name' data-theme={darkMode ? "dark" : "light"}>{roomName}</h3>
                    <p className='chat_room_last_seen' data-theme={darkMode ? "dark" : "light"}>
                        Last seen {" "}
                        {new Date(
                            messages[messages.length - 1]?.
                            timestamp?.toDate()
                        ).toLocaleDateString()}{" "}
                        {new Date(
                            messages[messages.length - 1]?.
                            timestamp?.toDate()
                        ).toLocaleTimeString()}
                    </p>
                </div>
                <div className="chat_headerRight" data-theme={darkMode ? "dark" : "light"}>
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                    
                </div>
            </div>
            <div className='chat_body' data-theme={darkMode ? "dark" : "light"}>
                 {messages.map((message) => (
                     <p className={`chat_message ${message.name === user.displayName && "chat_reciever"}`} data-theme={darkMode ? "dark" : "light"}>
                    <span className="chat_name" data-theme={darkMode ? "dark" : "light"}>{message.name}</span>{message.message}
                     <span className="chat_timestamp" data-theme={darkMode ? "dark" : "light"}>
                         {new Date(message.timestamp?.toDate()).toLocaleTimeString()}
                     </span>
                    </p>
                ))}
                            </div>
            {/* <div className='chat_body'>
                {messages.map(message => (
                    <p className={`chat_message ${ message.name === user.displayName && 'chat_receiver'}`}>
                        <span className="chat_name">{message.name}</span>
                        {message.message}
                        <span className="chat_timestemp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                    </p>
                ))}
            </div> */}
            <div className='chat_footer' data-theme={darkMode ? "dark" : "light"}>
                <InsertEmoticonIcon />
                <form>
                    <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Type a message"/>
                    <button type="submit" onClick={sendMessage}> Send a Message</button>
                </form>
                <MicIcon/>
            </div>
            
        </div>
    )
}

export default Chat