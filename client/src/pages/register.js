import React,{useState} from 'react'
import {connect} from 'react-redux'

import * as actions from '../store/index'

const Register = (props)=>{

    const [name,setName]= useState('')
    const [cnpj,setCnpj]= useState('')
    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')

    const handleNameChange = e => {
        setName(e.target.value)
    };
    const handleEmailChange = e => {
        setEmail(e.target.value)
    };
    const handleCnpjChange = e => {
        setCnpj(e.target.value)
    };
      const handlePasswordChange = e => {
        setPassword(e.target.value)
    };

    const handleSubmit = e => {
        e.preventDefault();  
        const data = {
            name,
            cnpj,
            email,
            password
        };
        props.handleRegister(data)
    };
    

    return(
        <div className='form-container'>
        <form className='form-style' onSubmit={handleSubmit}>
                <i class="fas fa-user-plus"></i>
                <input onChange={handleNameChange} className='form-item' id='name' type='text' name='name' placeholder='Nome' />
                <input onChange={handleEmailChange} className='form-item' id='email' type='text' name='email' placeholder='E-mail' />        
                <input onChange={handleCnpjChange} className='form-item' id='cnpj' type='text' name='cnpj' placeholder='CNPJ' />        
                <input onChange={handlePasswordChange} className='form-item' id='password' type='password' name='password' placeholder='Senha' />
            <button className='form-button' type='submit'>Pronto!</button>
        </form>
        </div>
    )
}

const mapDispatchToProps = dispatch=>{
    return{
        handleRegister:(data)=>dispatch(actions.handleRegister(data))
    }
}

export default connect(null,mapDispatchToProps)(Register)