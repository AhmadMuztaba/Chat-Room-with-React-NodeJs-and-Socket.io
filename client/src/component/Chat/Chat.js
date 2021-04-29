import React, { useEffect, useState } from 'react';
import './chat.css';
import io from 'socket.io-client';
import ReactScroll from 'react-scroll-to-bottom'
import querystring from 'query-string';
let socket;
const ENDPOINT="localhost:5000";
const Chat = ({location}) => {
    const[message,setMessage]=useState('');
    const [username,setusername]=useState('');
    const [userroom,setuseroom]=useState('');
    const [users,setUsers]=useState('');
    const [messages,setMessages]=useState('')

    useEffect(()=>{
     const {name,room}=querystring.parse(location.search);
     var connectionOptions ={
        "force new connection" : true,
        "reconnectionAttempts": "Infinity", 
        "timeout" : 10000,                  
        "transports" : ["websocket"]
    };
    
     socket=io(ENDPOINT,connectionOptions);
     setusername(name);
     setuseroom(room);
     socket.emit('join',{name,room:room},(error)=>{
       if(error){
           alert(error);
       }
       console.log('new User joined');
   })
    },[ENDPOINT,location.search]);
   
   
    useEffect(()=>{
       socket.on('Message',(message)=>{
           setMessages((premessage)=>[...premessage,message])
       })
       socket.on('roomData',({users})=>{
           setUsers(users);
       })
    },[])

    const sendMessage=(e)=>{
        e.preventDefault();
        socket.emit('sendMessage',message,()=>{
            setMessage('');
        })
    }

 
        return (
            <div className="chat">
                <div className="people">
                    <div className="room">
                    Room name:
                    {
                        userroom?userroom:null
                    }
                    </div>
                    <div className="join-people">
                    People in the Chat-Room are:
                    {
                        users.length>0?<ul>
                        {
                            users.map((people)=>{
                                return <li>{people.name}</li>
                            })
                        }
                        </ul>:null
                    }
                    </div> 
                </div>
                <div>
                   
                
                <ReactScroll>
                <div className="chat-show">
                {messages.length>0?messages.map((ms)=>{
    
                     return (<div className="Each-Message">
                         <div>
                         <ion-icon name="person-circle-outline"></ion-icon>{ms.user}
                         </div>
                             <div>{ms.text}</div>
                     </div>)
                }):null}
                </div>
                </ReactScroll>
                
                
                <div className="message-box">
                    <input type="text" autoComplete="off" className="message" value={message} name="message" onChange={(e)=>setMessage(e.target.value)} onKeyPress={(e)=>e.key==='Enter'?sendMessage(e):null}/>
                </div>
                </div>
            </div>
        );
};

export default Chat;