import React,{useEffect} from 'react';
import {connect} from 'react-redux'

import NavBar from './container/navbar'
import Middle from './container/middle'
import * as actions from './store/index'
import './App.css';

const App =(props)=> {
 useEffect(()=>{
    props.checkAuth()
 })


    return (
      <div className="App">
        <NavBar/>
        {/* <p>Auth: {props.auth ? 'True':'False'}</p>
        <p>Error Message: {props.error ? props.error:null}</p>
        <p>User: {props.user ? JSON.stringify(props.user):null}</p> */}
        <Middle/>
      </div>
    );
  }

const mapStateToProps=(state)=>{
  return{
    auth:state.auth,
    error:state.error.message,
    user:state.user,
    token:state.token
  }
}
const mapDispatchToProps = dispatch=>{
  return{
    setUser:(user)=>dispatch(actions.setUser(user)),
    setError:(error)=>dispatch(actions.setError(error)),
    setAuth:(payload)=>dispatch(actions.setAuth(payload)),
    checkAuth:()=>dispatch(actions.checkAuth())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
