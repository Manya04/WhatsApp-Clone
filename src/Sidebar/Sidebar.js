import React, {useState, useEffect} from 'react'
import { Avatar , IconButton } from "@material-ui/core"
import ToggleOffTwoToneIcon from '@material-ui/icons/ToggleOffTwoTone';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import './Sidebar.css'
import SidebarChat from './SidebarChat';
import db from "../firebase"
import {useStateValue} from "../StateProvider"


function Sidebar() {

    const [rooms, setRooms] = useState([]);
    const [{ user } , dispatch] = useStateValue();
    const[darkMode, setDarkMode] = useState(false);

    const changeTheme = () => {
        darkMode ? (setDarkMode(false)) : (setDarkMode(true))
    }
  
    useEffect(() => {
        db.collection('rooms').onSnapshot(snapshot =>{
            setRooms(snapshot.docs.map(doc => (
                {
                    id:doc.id,
                    data: doc.data()
                }
            )))
        })
    })
    return (
        <div className="sidebar" data-theme={darkMode ? "dark" : "light"}>
            <div className="sidebar_header">
<Avatar src={user?.photoURL} />
<div className="sidebar_headerRight" data-theme={darkMode ? "dark" : "light"}>
    <IconButton>
    <ToggleOffTwoToneIcon onClick = {changeTheme} />
    </IconButton>
    <IconButton><ChatIcon />
    </IconButton>
    <IconButton>
    <MoreVertIcon />
    </IconButton>
</div>
            </div>
            <div className="sidebar_search">
                <div className="sidebar_searchContainer">
                <SearchOutlinedIcon></SearchOutlinedIcon>
            <input placeholder="Search or start new chat" type="text"></input>
                </div>
            
            </div>
            <div className="sidebar_chats" data-theme={darkMode ? "dark" : "light"}>
                <SidebarChat addNewChat darkMode/>
                {rooms.map(room => (
                    <SidebarChat key={room.id} id={room.id}
                    name = {room.data.name} />
                ))}
            </div>
        </div>
    )
}

export default Sidebar
