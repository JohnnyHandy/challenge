import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import * as actions from '../store/index'

const Navbar = (props)=>{
    const { handleLogout, checkAuth } = props
    return(
        <div className='navbar-container'>
           <div className='navbar-left'>
               <Link 
               to='/'
               onClick={() => checkAuth()}
               >
                   Home
               </Link>
            </div>
                { props.user ?
                <div className='navbar-right'>
                <i className="fas fa-user-alt"></i>
                <p>{props.user.name}</p>
                <Link 
                onClick={() => handleLogout()} 
                to='/logout'
                >
                    Logout
                </Link>
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

const mapDispatchToProps = dispatch =>{
    return{
        handleLogout:()=>dispatch(actions.handleLogout()),
        checkAuth: ()=>dispatch(actions.checkAuth())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Navbar)