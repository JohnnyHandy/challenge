import React from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'
import Background from '../components/background'
import Home from '../pages/home'
import Login from '../pages/login'
import Register from '../pages/register'
import User from '../pages/user'
import Item from '../pages/item'


const Middle = (props)=>{
    return(
        <div className='middle-container'>
            <Background/>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/login' component ={Login}/> 
                <Route path='/register' component ={Register}/>
                <Route path='/user' component ={User} />
                <Route path='/newItem' component = {Item} />
                <Route path='/logout'>
                    <Redirect to='/'/>
                </Route>
            </Switch>
        </div>
)
}

export default Middle