
const INITIAL_STATE = {
    userLogged: false,
    userEmail: "",
    username: "",
    userHash:null,
    uid:null,
    token: null,
    image:null
}

export default function UserReducer(state = INITIAL_STATE, action){
    switch (action.type){
        case 'LOGIN':
            return {
                ...state,
                userLogged: true,
                userEmail: action.payload.userEmail,
                userHash: action.payload.userHash,
                uid:action.payload.uid,
                username: action.payload.username,
                token: action.payload.token
            };
        case 'LOGOUT':
            return {
                ...state,
                userLogged: false,
                userEmail: "",
                username: "",
                token: "",
                uid:null,
                userHash:null
            };
        case 'IMAGE':
            return {
                ...state,
                image:action.payload.image,
            };
        default:{
                return state 
            }
    }
}