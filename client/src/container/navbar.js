import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const Navbar = (props)=>{
    return(
        <div className='navbar-container'>
           <div className='navbar-left'>
               <Link to='/'>Home</Link>
            </div>
                { props.user ?
                <div className='navbar-right'>
                <i className="fas fa-user-alt"></i>
                <p>{props.user.name}</p>
                </div>
                :
                <div className='navbar-right'>
                <Link to='/login'>Login</Link>
                <Link to='/register'>Register</Link>
                </div>
                }   
        </div>
    )
}

const mapStateToProps=state=>{
    return{
        auth:state.auth,
        user:state.user
    }
}

export default connect(mapStateToProps)(Navbar)