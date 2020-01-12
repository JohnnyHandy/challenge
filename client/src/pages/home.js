import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Home extends React.Component{

    render(){
        return(
            <div>
                <h1>Home Page</h1>
                <Link to='/login'>Ir para o Login</Link>
                <p> Message:</p>
            </div>
        )
    }
}

const mapStateToProps = state=>{
    return{
        auth:state.auth,
        token:state.token
    }
}

export default connect(mapStateToProps)(Home)