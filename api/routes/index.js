
const express = require('express');
const router  = express.Router();
import middleware from '../middleware/index'


router.get('/',middleware.authenticate,(req,res)=>{
  if(req.session.user){
    res.render('home',{user:req.session.user});
  }else if(req.session.error){
    req.session.user = null
    res.render('home',{user:req.session.user})
  }
})

router.get('/test',middleware.authenticate,(req,res)=>{
  if(req.session.user){
    res.send(req.session.user)
  }else if(req.session.error){
    res.send(req.session.error)
  }
})
module.exports = router;