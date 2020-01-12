import * as actions from './actionTypes'
import axios from 'axios'

export const checkAuth = ()=>{
    return async (dispatch,getState)=>{
        axios.get('http://localhost:3000/authorize', { headers : { 'Authorization':'Bearer '+getState().token } } )
    .then((response) => {
      console.log(response);
      if(response.data.user){
          dispatch(setUser(response.data.user))
      }else if(response.data.error){
          dispatch(setError(response.data.error))
      }
    })
    .catch(err => {
      console.error(err);
    });
    }
}

export const handleLogin = (data)=>{
    return async dispatch=>{
        axios
        .post('http://localhost:3000/api/v1/auth/sign_in', data)
        .then((response) => {
          console.log(response.data);
          dispatch(setAuth(response.data))
        })
        .catch(err => {
          console.log('error here')
          dispatch(setError(err))
        });
    }
}

export const handleRegister = (data)=>{
    return async dispatch=>{
        axios.post('http://localhost:3000/api/v1/user',data)
        .then(response=>console.log(response))
        .catch(error=>console.log(error))
    }
}

export const setAuth =(payload)=>{
    return{
        type:actions.SET_AUTH,
        payload:payload
    }
}

export const setUser = (user)=>{
    return{
        type:actions.SET_USER,
        user:user
    }
}


export const setError = (error)=>{
    return{
        type:actions.SET_ERROR,
        error:error
    }
}

