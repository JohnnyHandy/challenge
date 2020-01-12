import bodyParser from 'body-parser';
import passport from 'passport';
import middleware from '../middleware/index'
const User = require('../sequelize').User;
const express = require('express');
const router  = express.Router();
const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.get('/',middleware.authenticate,async(req,res)=>{
if(req.session.user){
    req.flash('info','É necessário fazer o logout registrar uma nova conta!')
    res.redirect('/api/v1')
    }else if(req.session.error){
    res.render('register')
    };  
})
router.post('/',async (req,res,next)=>{
    passport.authenticate('register',(err,user,info)=>{
        if(err){
            res.send({error:err});
        }
        if(info!==undefined){
            res.send({info:info})
        }
        res.send(user)
        // else{
        //     req.logIn(user,err=>{
        //         const data ={
        //             name:req.body.name,
        //             cnpj:req.body.cnpj,
        //             email:req.body.email
        //         }
        //     User.findOne({
        //         where:{
        //             email:data.email
        //         }
        //     }).then(user=>{
        //         user.update({
        //             name:data.name,
        //             cnpj:data.cnpj,
        //             email:data.email
        //         })
        //         .then(()=>{ 
        //             req.flash('success','Usuário criado com sucesso!');
        //             res.redirect('/api/v1')
        //         })
        //         .catch(error=>{
        //             req.flash('error',error.message)
        //             res.redirect('back')
        //         })
        //     })
        //     .catch(error=>{
        //         req.flash('error',error.message)
        //         res.redirect('back')
        //     })
        // });
        // }
    })(req,res,next);
})


module.exports = router