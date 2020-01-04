import passport from 'passport'
import axios from 'axios'
var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');



var middlewareObj ={}

middlewareObj.authorize = function(request, response, next) {
    passport.authenticate('jwt', { session: false, }, async (err,user,info) => {
        if (err || !user) {
            response.status(401)
            next()
        } 
        if(user){
          request.session.user = user
        }else{
          request.session.user = undefined
        }
        next()
    })(request, response, next);   
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