import React,{useState} from 'react'
import {connect} from 'react-redux'

import * as actions from '../store/index'

const Login =(props)=>{
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')

  const handleEmailChange = e => {
    setEmail(e.target.value)
  };
  const handlePasswordChange = e => {
    setPassword(e.target.value)
  };

  const handleSubmit = e => {
    e.preventDefault();  
    const data = {
      email,
      password,
    };
    props.handleLogin(data)
  };

  return(
    <div className='form-container'>
    <i className="fas fa-sign-in-alt"></i>
    <span>Página de Login</span>
    <form className='form-style' onSubmit={handleSubmit}>
        <input className='form-item' id='email' type='text' name='email' onChange={handleEmailChange} placeholder='E-mail / CNPJ' />
        <input className='form-item' id='password' type='password' name='password'  onChange={handlePasswordChange} placeholder='Senha' />
        <button className='form-button' type='submit'>Entrar</button>
    </form>
  </div>
  )
}

const mapDispatchToProps = (dispatch)=>{
  return{
    setAuth:(payload)=>dispatch(actions.setAuth(payload)),
    handleLogin:(data)=>dispatch(actions.handleLogin(data))
  }
}

export default connect(null,mapDispatchToProps)(Login)