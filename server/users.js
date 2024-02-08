// managing the users
const users= [];

const addUser = ({id ,name ,room}) => {
    
    if( name )
        name = name.trim().toLowerCase();       // removes all spaces from 'name' & converts 'name' to lowercase
    if( room )
        room = room.trim().toLowerCase();       

    // finding if any user exists with this name and room
    const existingUser = users.find( (user) => user.name ===  name && user.room === room );

    if( existingUser ){ // if any users exists then prevent sign up and return error
        return {error: "Username already taken"};   
    }

    // if user does not exist then create new user.
    const user = {id, name , room};
    users.push(user);    // entering new user into the array

    return {user};
}

const removeUser = (id) => {

    // finding user with given id
    const index = users.findIndex((user) => user.id === id);

    if( index !== -1 ){     // if user found
        return users.splice(index , 1)[0];      // splice removes 1 element from 'index' in the array
    }
    
}


const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);


module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom,
}