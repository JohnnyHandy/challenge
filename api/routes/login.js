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
        req.session.user = null
        res.render('login');
      }
})

router.post('/',middleware.authenticate,async (req,res,next)=>{
    if(req.session.user){
        req.flash('info','Já há um usuário logado!')
        res.redirect('/api/v1')
    }else if(req.session.error){
        passport.authenticate('login',(err,user,info)=>{
            if(err){
                req.flash('error',err)
                res.redirect('back')
            }
            if(info !== undefined){
                req.flash('error',info.message)
                res.redirect('back')
            }else{
                req.logIn(user,err=>{
                    if(err){
                        req.flash('error',err)
                         res.redirect('back')
                    }
                    const token = jwt.sign({id:user.id},jwtSecret.secret,{expiresIn:'1m'});
                    localStorage.setItem('token','Bearer '+token);
                    req.flash('success','Login realizado com sucesso!')
                    req.session.user = user;
                    res.redirect('/api/v1')
                })
            }
        })(req,res,next)
    }
});
module.exports= router;


