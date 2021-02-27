
const INITIAL_STATE = {
    userLogged: false,
    userEmail: "",
    username: "",
    uid: null,
    image: null
}

export default function UserReducer(state = INITIAL_STATE, action){
    switch (action.type){
        case 'LOGIN':
            return {
                ...state,
                userLogged: true,
                userEmail: action.payload.userEmail,
                uid:action.payload.uid,
                username: action.payload.username,
                image: action.payload.image
            };
        case 'LOGOUT':
            return {
                ...state,
                userLogged: false,
                userEmail: "",
                username: "",
                image: "",
                uid: null,
            };
        case 'IMAGE':
            return {
                ...state,
                image :action.payload.image,
            };
        default:{
                return state 
            }
    }
}