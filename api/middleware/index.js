import passport from 'passport';
import axios from 'axios';
import jwt from 'jsonwebtoken'
import jwtSecret from '../config/jwtConfig'
var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');



var middlewareObj ={}

middlewareObj.authorize = function(request, response, next) {
  const token = request.headers.authorization
  const modifiedToken = token.replace('Bearer ','')
  try {
    var decoded = jwt.verify(modifiedToken,jwtSecret.secret)
    console.log(decoded)
    passport.authenticate('jwt', { session: false, }, async (err,user,info) => {
      if (err || !user) {
          console.log(err)
      } 
      if(user){
        console.log('Authorized')
        request.session.user = user
        response.send({
          user:user,
          message:'User Authorized'
        })
      }else{
        console.log('Undefined')
        request.session.user = undefined
      }
      next()
    })(request, response, next);   

  } catch(err){
      response.send({error:err})
    }
  }

middlewareObj.authenticate = async function(request,response,next){
  let token = undefined;
  if(localStorage.getItem('token')){
    token=localStorage.getItem('token')
    await axios.get('http://localhost:3000/authorize', 
    { headers : { 'Authorization':token } } )
    .then(res=>{
      request.session.error = undefined
      request.session.user = res.data
      return next()
      })
    .catch(error=>{
      request.session.user = undefined
      request.session.error = error
      return next()
    }); 
  } else {
    request.session.user = undefined
    request.session.error = 'Not logged in'
    next()
  }  
}
export default middlewareObj