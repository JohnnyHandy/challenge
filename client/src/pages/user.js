import React,{useState} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'

import * as actions from '../store/index'

const User = (props)=>{
    const [user,setUser]=useState(undefined)
    console.log(props.token)
    const handleSubmit = () => {
        console.log('handle submit')
        axios.get('http://localhost:3000/authorize', { headers : { 'Authorization':'Bearer '+props.token } } )
          .then((response) => {
            console.log(response);
            if(response.data.user){
                setUser(response.data.user)
            }else if(response.data.error){
                props.setError(response.data.error)
            }
          })
          .catch(err => {
            console.error(err);
          });
      };

    return(
        <div>
            <h2>Load User</h2>
            <p>{JSON.stringify(user)}</p>
            <button onClick={handleSubmit}>Load</button>
        </div>
    )

}

const mapStateToProps = (state)=>{
    return{
        token:state.token
    }
}

const mapDispatchToProps = dispatch=>{
    return{
        setError:(error)=>dispatch(actions.setError(error))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(User)