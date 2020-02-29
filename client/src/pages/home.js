import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Home extends React.Component{

    render(){
        const {auth} = this.props
        return(
            <div style={{display:'flex', flexDirection:"column"}}>
                <h1>Home Page</h1>
                {!auth ? <Link to='/login'>Ir para o Login</Link> : null}
                {auth ?<Link to='/newitem'>Cadastrar novo item</Link>:null}
                {auth ? <Link to='/items'>Ver lista de itens</Link>: null}
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