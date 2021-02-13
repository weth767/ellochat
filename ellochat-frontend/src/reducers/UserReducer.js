
const INITIAL_STATE = {
    userLogged: false,
    userUuid:null,
    userEmail: "",
    username: "",
    token: null
}

export default function UserReducer(state = INITIAL_STATE, action){
    switch (action.type){
        case 'LOGIN':
            return {
                ...state,
                userLogged: true,
                userUuid: action.payload.userUuid,
                userEmail: action.payload.userEmail,
                username: action.payload.username,
                token: action.payload.token
            };
        case 'LOGOUT':
            return {
                ...state,
                userUuid:null,
                userLogged: false,
                userEmail: "",
                username: "",
                token: ""
            };
        default:{
                return state 
            }
    }
}