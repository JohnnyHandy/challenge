import React from 'react'
import {Route,Switch} from 'react-router-dom'
import Background from '../components/background'
import Home from '../pages/home'
import Login from '../pages/login'
import Register from '../pages/register'
import User from '../pages/user'


const Middle = (props)=>{
    return(
        <div className='middle-container'>
            <Background/>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/login' component ={Login}/> 
                <Route path='/register' component ={Register}/>
                <Route path='/user' component ={User} />
            </Switch>
        </div>
)
}

export default Middle