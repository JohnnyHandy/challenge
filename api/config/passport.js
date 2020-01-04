import jwtSecret from '../config/jwtConfig';
import bcrypt from 'bcryptjs';
const localStrategy = require('passport-local').Strategy
const User = require('../sequelize').User
const passportJWT = require('passport-jwt')
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt
import Sequelize from 'sequelize'
const Op = Sequelize.Op


module.exports = function(passport){
    passport.use(
        'register',
        new localStrategy(
            {
                usernameField:'email',
                passwordField:'password',
                passReqToCallback:true,
                session:false
            },
            (req,email,password,done)=>{
                console.log(req.body)
                try{
                    User.findOne({
                        where:{
                            [Op.or]:[{email:email},{cnpj:req.body.cnpj}]
                        },
                    }).then(
                        user=>{
                            if(user!==null){
                                console.log('User already exists')
                                return done(null,false,{message:'User already exists'})
                            }else{
                                bcrypt.hash(password,8).then(hashedPassword=>{
                                    User.create({
                                        name:req.body.name,
                                        cnpj:req.body.cnpj,
                                        email:email,
                                        password:hashedPassword
                                    }).then(user=>{
                                        console.log('User Created');
                                        return done(null,user);
                                    })
                                    .catch(err=>{
                                        done(err)
                                    });
                                })
                                .catch(err=>{
                                    done(err)
                                })
                            }
                        }).catch(err=>{
                            done(err)
                        })
                } catch(err){
                    done(err)
                }
            }
        )
    );
    
    passport.use(
        'login',
        new localStrategy(
            {
                usernameField:'email',
                passwordField:'password',
                session:false
            },
            (username,password,done)=>{
                try{
                    User.findOne({
                        where:{
                            [Op.or]:[{email:username},{cnpj:username}]
                        }
                    }).then(user=>{
                        if(user === null){
                            return done(null,false,{message:'Enter a correct Email or CNPJ'})
                        } else{
                            bcrypt.compare(password,user.password).then(response=>{
                                if(response !== true){
                                    console.log('Incorrect Password')
                                    return done(null,false,{message:'Incorrect Password'})
                                }
                                console.log('User'+ user + 'authenticated');
                                return done(null,user);
                            }).catch(err=>{
                               return done(err)
                            });
                        }
                    }).catch(err=>{
                       return done(err)
                    })
                } catch(err){
                    return done(err)
                }
            }
        )
    );

    const options = {
        jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey:jwtSecret.secret
    };
    passport.use(
        'jwt',
        new JWTStrategy(options,(jwt_payload,done)=>{   
            try{
                User.findOne({
                    where:{
                        id:jwt_payload.id
                    },
                }).then(user=>{
                    if(user){
                        console.log('User found in DB in passport')
                        done(null,user)
                    }else{
                        console.log('User not found in db');
                        done(null,false)
                    }
                });
            } catch(err){
                done(err)
            }
        })
    )
    
    
}

