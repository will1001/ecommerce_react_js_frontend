import{
    USER_LOADING,
    USER_LOADED,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCES,
    REGISTER_FAIL
} from '../types/authTypes'

const InitialState ={
    token: localStorage.getItem('token'),
    isAuthenticated : null,
    isLoading: false,
    user: null,
    msg: ""
}


export const authReducer = (state = InitialState,action)=>{
    const { type, payload } = action

    switch (type) {
        case USER_LOADING:
            return{
                ...state,
                isLoading: true
            }
        case USER_LOADED:
            return{
                ...state,
                isLoading: false,
                isAuthenticated: true,
                user: payload
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('token',JSON.stringify(payload))
            return{
                ...state,
                isLoading: false,
                isAuthenticated:true,
                msg: "Login Success"
            }
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token')
            return{
                ...state,
                token: null,
                isAuthenticated: false,
                isLoading: false
            }
        case REGISTER_SUCCES:
            localStorage.setItem('token',JSON.stringify(payload))
            return{
                ...state,
                isLoading: false,
                isAuthenticated:true,
                msg: "Register Success"
            }
        case REGISTER_FAIL:
            localStorage.removeItem('token')
            return{
                ...state,
                token: null,
                isAuthenticated: false,
                isLoading: false
            }
    
        default:
            return state;
    }
}