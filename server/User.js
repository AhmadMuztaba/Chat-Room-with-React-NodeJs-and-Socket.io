const users=[];
const addUser=({id,name,room})=>{
   name=name.trim().toLowerCase();
   room=room.trim().toLowerCase();
   const error=users.find((user)=>user.name===name&&user.room===room);
   if(error){
       return{error:'Username taken'}
   }
   const user={id,name,room};
   users.push(user);
   return {user};
}

const removeUser=(id)=>{
    const indexNum=users.findIndex((user)=>user.id===id);
    if(indexNum!=-1){
        return users.splice(indexNum,1)[0]
    }
}

const getUser=(id)=>{
    const user=users.find((user)=>user.id===id);
    return user;
}

const getUserInRoom=(room)=>{
    const user=users.filter((user)=>user.room===room);
    return user;
}

module.exports={
    addUser,removeUser,getUser,getUserInRoom
}