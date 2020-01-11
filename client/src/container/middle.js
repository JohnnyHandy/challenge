import React from 'react'
import {Route,Switch} from 'react-router-dom'
import Home from '../pages/home'
import Login from '../pages/login'
import User from '../pages/user'


const Middle = (props)=>{
    return(
        <div className='middle-container'>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/login' component ={Login}/> 
                <Route path='/user' component ={User} />
            </Switch>
        </div>
)
}

export default Middle