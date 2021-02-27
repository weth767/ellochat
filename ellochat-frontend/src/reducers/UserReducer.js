
const INITIAL_STATE = {
    userLogged: false,
    userEmail: "",
    username: "",
    status: "",
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
                status: action.payload.status,
                image: action.payload.image
            };
        case 'LOGOUT':
            return {
                ...state,
                userLogged: false,
                userEmail: "",
                username: "",
                image: "",
                status: "",
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