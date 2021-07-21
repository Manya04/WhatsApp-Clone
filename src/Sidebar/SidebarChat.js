import React, {useEffect, useState} from 'react'
import './SidebarChat.css'
import { Avatar } from "@material-ui/core"
import db from '../firebase';
import {Link} from "react-router-dom"

function SidebarChat({id, name, addNewChat, darkMode}) {
const [seed, setSeed] = useState('');
const [messages, setMessages] = useState('')
// const[darkMode, setDarkMode] = useState(true);

useEffect(() => {
    if(id){
        db.collection('rooms').doc(id).collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot =>
            (
                setMessages(snapshot.docs.map((doc) => doc.data()))
            ))
    }
},[id])
    useEffect(() => {
setSeed(Math.floor(Math.random() * 5000)
)
    }, [])

    const createChat = () => {
         const roomName = prompt("Please enter name for chat");
         if(roomName){
             //some database stuff
             db.collection('rooms').add({
                 name: roomName
             })
         }
    }


    return  !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat" data-theme={darkMode ? "dark" : "light"}>
            <Avatar src={   `https://avatars.dicebear.com/api/human/${seed}.svg`}></Avatar>
            <div className="sidebarChat_info">
                <h2>{name}</h2>
                <pr>{messages[0]?.message}</pr>
            </div>
        </div>
        </Link>
        
    ) : (
        <div onClick={createChat} className="sidebarChat">
            <h2>Add new Chat</h2>
        </div>
    )
}

export default SidebarChat
