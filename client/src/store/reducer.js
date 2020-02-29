import * as actions from './actionTypes'
import {updateObject} from './utility'

const initialState={
    auth:false,
    error:{
        status:undefined,
        message:null
    },
    user:undefined,
    token:null
}

const setAuth=(state,action)=>{
    const auth = action.payload.auth;
    const token = action.payload.token;
    const updatedError = updateObject(state.error,{status:undefined,message:null})
    return updateObject(state,{auth:auth,token:token,error:updatedError})
}

const setUser = (state,action)=>{
    return updateObject(state,{user:action.user})
}

const setError = (state,action)=>{
    if(action.error.name==="TokenExpiredError"){
        const updatedError = updateObject(state.error,{status:action.error.name,message:action.error.message})
        return updateObject(state,{error:updatedError,user:undefined,auth:false,token:null})
    }
    const updatedError = updateObject(state.error,{status:action.error.name,message:action.error.message})
    return updateObject(state,{error:updatedError})
}

const setLogout = (state,actions)=>{
    return updateObject(state,{auth:false,user:undefined,token:null})
}

const reducer = (state = initialState,action)=>{
    switch(action.type){
        case actions.SET_AUTH:return setAuth(state,action);
        case actions.SET_USER:return setUser(state,action);
        case actions.SET_ERROR:return setError(state,action);
        case actions.LOGOUT:return setLogout(state,action);
        default: return state;
    }
}

export default reducer