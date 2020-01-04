var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')
const config = require('../config/jwtConfig')
const User = require('../models').User
module.exports={
    create(req,res){
        return User
        .create({
            name:req.body.name,
            cnpj:req.body.cnpj,
            email:req.body.email,
            password:bcrypt.hashSync(req.body.password,8)
        })
        .then(user=>{res.status(201).send(user)
        })
        .catch(error=>res.status(400).send(error))
    },
    showAllUsers(req,res){
        return User
        .findAll()
        .then(users =>res.status(201).send(users))
        .catch(error=>res.status(400).send(error))
    },
    checkDuplicateUserInfo(req,res){
        return User
        .findOne({
            where:{
                name:req.body.name
            }
        }).then(user=>{
            if(user){
                res.status(400).send("Fail-> UserName is already taken!")
                return;
            }

            User.findOne({
                where:{
                    email:req.body.email
                }
            }).then(user=>{
                if(user){
                    res.status(400).send('Fail->Email is already in use')
                    return
                }
                next()
            })
        })
    },
    signIn(req,res,next){
        console.log('Sign-In')
        User.findOne({
            where:{
                email:req.body.email
            }
        }).then(user=>{
            if(!user){
                return res.status(404).send('User not found')
            }
            var passwordIsValid = bcrypt.compareSync(req.body.password,user.password);
            if(!passwordIsValid){
                return res.status(401).send({auth:false, accessToken:null,reason:'Invalid Password'})
            }
            const expirationTime = 300
            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: expirationTime// expires in 24 hours
              });
            localStorage.setItem('token',token)
            localStorage.setItem('expirationTime',expirationTime)
            res.status(200).send({ auth: true, accessToken: token })
            next()
        })
        .catch(err=>{
            res.status(500).send('Error =>' + err);
        })
    },
    verifyToken(req,res,next){
        console.log(req.headers)
        let token = localStorage.getItem('token')
        if(!token){
            return res.status(403).send({
                auth:false, message:'No token provided'
            })
        }
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err){
              return res.status(500).send({ 
                  auth: false, 
                  message: 'Fail to Authentication. Error -> ' + err 
                });
            }
            req.userId = decoded.id;
            next();
        });

    }
}