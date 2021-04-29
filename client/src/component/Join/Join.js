import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import './join.css';
const Join = () => {
    const [name,setName]=useState('');
    const [room,setRoom]=useState('');
    return (
        <div className="background">
            <div>
                <input type="text" className="info" placeholder="name" autoComplete="off" value={name} name="name" onChange={(e)=>{
                       setName(e.target.value)
                }}/>
                <input type="text" className="info" placeholder="room" autoComplete="off" value={room} name="room" onChange={(e)=>{
                       setRoom(e.target.value)
                }}/>
            </div>
            <Link className="btn" onClick={(event)=>(!name||!room)?event.preventDefault():null} to={`/chat?name=${name}&room=${room}`}><button className=" ui red basic button">join</button></Link>
        </div>
    );
};

export default Join;