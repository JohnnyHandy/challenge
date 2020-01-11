import jwtSecret from '../config/jwtConfig';
import jwt from 'jsonwebtoken';
import middleware from '../middleware/index'
import passport from 'passport';
var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');
const express = require('express');
const router  = express.Router();

router.get('/',middleware.authenticate,async (req,res)=>{
    if(req.session.user){
        req.flash('info','Já há um usuário logado. Faça o logout caso queira acessar outra conta!')
        res.redirect('/api/v1')
      }else if(req.session.error){
        res.send(status)
      }
})

router.post('/',async (req,res,next)=>{
        passport.authenticate('login',(err,user,info)=>{
            if(err){
                res.send({error:err})
            }
            if(info !== undefined){
                res.send({info:info})
            }else{
                req.logIn(user,err=>{
                    if(err){
                       res.send({error:err})
                    }
                    const token = jwt.sign({id:user.id},jwtSecret.secret,{expiresIn:'1m'});
                    localStorage.setItem('token','Bearer '+token);
                    req.flash('success','Login realizado com sucesso!')
                    req.session.user = user;
                    res.status(200).send({
                        auth:true,
                        token:token,
                        message:'User logged in'
                    })
                })
            }
        })(req,res,next)
});
module.exports= router;


