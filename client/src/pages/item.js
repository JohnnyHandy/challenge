import React,{useState} from 'react'
import {connect} from 'react-redux'
import { AiOutlineFileAdd } from 'react-icons/ai'

import * as actions from '../store/index'

const Item = (props)=>{

    const [name,setName]= useState('')
    const [description,setDescription]= useState('')
    const [price,setPrice]= useState('')

    const handleNameChange = e => {
        setName(e.target.value)
    };
    const handleDescriptionChange = e => {
        setDescription(e.target.value)
    };
    const handlePriceChange = e => {
        setPrice(e.target.value)
    };

    const handleSubmit = e => {
        e.preventDefault();  
        const data = {
            name,
            description,
            price,
        };
        props.registerNewItem(data)
    };
    

    return(
        <div className='form-container'>
        <form className='form-style' onSubmit={handleSubmit}>
                <AiOutlineFileAdd/>
                <input onChange={handleNameChange} className='form-item' id='name' type='text' name='name' placeholder='Nome' />
                <input onChange={handleDescriptionChange} className='form-item' id='description' type='text' name='description' placeholder='Description' />        
                <input onChange={handlePriceChange} className='form-item' id='price' type='text' name='price' placeholder='Preço' />        
            <button className='form-button' type='submit'>Registrar Item</button>
        </form>
        </div>
    )
}

const mapDispatchToProps = dispatch=>{
    return{
        registerNewItem:(data)=>dispatch(actions.registerNewItem(data))
    }
}

const mapStateToProps = state => {
    return{
        auth:state.auth
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Item)