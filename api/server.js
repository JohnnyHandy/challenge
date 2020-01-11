import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import flash from 'connect-flash';
import jwt from 'jsonwebtoken';
import jwtSecret from './config/jwtConfig';
import methodOverride from 'method-override';
import middleware from "./middleware";
import passport from 'passport';
import path from 'path';
import session from 'express-session';





var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');
const app = express();
const port = 3000;

app.use(methodOverride('_method'));
app.use(cookieParser('mySecret'));
app.use(session({secret: 'mySecret', resave: false, saveUninitialized: false,cookie:{maxAge:60000}}));
app.use(flash());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(passport.initialize());
app.use(
  cors({
    origin: 'http://localhost:3001',
    credentials: true,
  })
);
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  res.locals.info = req.flash('info');
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.append('Access-Control-Allow-Headers', 'Content-Type, Authorization, authorization, JWT');
  res.append('Access-Control-Expose-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});
require('./config/passport')(passport);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


var index = require('./routes/index');
var login = require('./routes/login.js');
var register = require('./routes/register');
var user= require('./routes/user')

app.use('/api/v1',index);
app.use('/api/v1/auth/sign_in',login);
app.use('/api/v1/user',register);
app.use('/api/v1/user/',user);


app.get('/',(req,res)=>{
  res.redirect('/api/v1')
})

app.get('/test',middleware.authorize,(req,res)=>{
  console.log('test route')
})

app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

app.get('/authorize',middleware.authorize,(req,res)=>{
  console.log('/authorize')
    
})


app.get('/logout',(req,res)=>{
  req.session.user = undefined;
  localStorage.removeItem('token');
  req.flash('success','Logout concluído!');
  res.redirect('/api/v1');
})



app.listen(port,()=>{
  if(localStorage.getItem('token')){
    const token = localStorage.getItem('token')
    const modifiedToken = token.replace('Bearer ','')
      jwt.verify(modifiedToken,jwtSecret.secret,(err,decoded)=>{
        if(err && err.name === 'TokenExpiredError'){
          localStorage.removeItem('token')
        }
      })
  }
})

