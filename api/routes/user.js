import axios from 'axios'
import express from 'express'
import Sequelize from 'sequelize'
import middleware from '../middleware/index'

const Op = Sequelize.Op
var User = require('../sequelize').User
var Item = require('../sequelize').Item
var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');
const router = express.Router();


router.get('/:id',async (req,res)=>{
    User.findOne({
        where:{id:req.params.id}
      }).then(async response=>{
        var user = response
      await Item.findAll({
        where:{userId:req.params.id}
        }).then(items=>{
          var item =(items)
          res.render('user',{user:user,item:item})
        })
        .catch(err=>{
        return Promise.reject(err)
      })
        
      }
      ).catch(err=>res.render('error',{error:err}))
})

router.get('/:id/item',middleware.authenticate,(req,res)=>{
  if(req.session.user){
    if(req.session.user.id == req.params.id){
      res.render('newItem',{user:req.session.user})
    }else{
      req.session.error = 'Unauthorized'
      res.redirect('/api/v1')
    }
  }else if(req.session.error){
    req.session.user = null
    req.flash('info','Você não está autorizado à realizar esta ação!')
    res.redirect('/api/v1');
  }
});

router.get('/:id/item/list',middleware.authenticate,async(req,res)=>{
  if(req.session.user){
    if(req.session.user.id == req.params.id){
      var user = req.session.user
      await Item.findAll({
        where:{userId:req.params.id}
        }).then(items=>{
          var item =(items)
          res.render('itemslist',{item:item,user:user,list:true})
        })
        .catch(err=>{
        return Promise.reject(err)
      })
    }else{
      req.session.error = 'Unauthorized'
      res.redirect('/api/v1')
    }
  }else if(req.session.error){
    req.session.user = null
    req.flash('info','Você não está autorizado à realizar esta ação!')
    res.redirect('/api/v1');
  }
});

router.post('/:id/item',middleware.authenticate,async (req,res)=>{
  if(req.session.user){
    if(req.session.user.id == req.params.id){
      await Item.create({
        name:req.body.name,
        price:req.body.price,
        description:req.body.description,
        userId:req.params.id,
        }).then(()=>{
          req.flash('success','Item criado com sucesso!')
          res.redirect('/api/v1/user/'+req.params.id+'/item/list')
          return Promise.resolve('Item created')
        }).catch(error=>{
          return Promise.reject(error)
        })
    }else{
      req.session.error = 'Unauthorized'
      res.redirect('/api/v1')
    }
  }else if(req.session.error){
    req.session.user = null
    req.flash('info','Você não está autorizado à realizar esta ação!')
    res.redirect('/api/v1');
  }
});


router.get('/:id/item/:itemId',middleware.authenticate,(req,res)=>{
  if(req.session.user){
    if(req.session.user.id == req.params.id){
        var user = req.session.user
        Item.findOne({
          where:{[Op.and]:[{id:req.params.itemId},{userId:req.params.id}]}
        }).then(item=>{
          if(item !== null){
            res.render('itemslist',{item:item,user:user,list:false})
          }else{
            req.flash('info','Item não disponível!')
            res.redirect('/api/v1')
          }
        }
        ).catch(err=>{
        if(err){
          res.redirect('/api/v1')
        }
    })
    }else{
        req.session.error = 'Unauthorized'
        res.redirect('/api/v1')
    }
  }else if(req.session.error){
    req.session.user = null
    req.flash('info','Você não está autorizado à realizar esta ação!')
    res.redirect('/api/v1');
  }
})

router.get('/:id/item/:itemId/edit',middleware.authenticate,(req,res)=>{
  if(req.session.user){
    if(req.session.user.id == req.params.id){
      var user = req.session.user
      Item.findOne({
        where:{[Op.and]:[{id:req.params.itemId},{userId:req.params.id}]}
      }).then(item=>{
        res.render('editItem',{item:item,user:user}) 
      }).catch(err=>{
        console.log(err)
        res.redirect('/api/v1')
    })

    }else{
      req.session.error = 'Unauthorized'
      res.redirect('/api/v1')
    }
  }else if(req.session.error){
    req.session.user = null
    req.flash('info','Você não está autorizado à realizar esta ação!')
    res.redirect('/api/v1');
  }
});

router.put('/:id/item/:itemId',middleware.authenticate,async (req,res)=>{
  if(req.session.user){
    if(req.session.user.id == req.params.id){
      await Item.findOne({
        where:{[Op.and]:[{id:req.params.itemId},{userId:req.params.id}]}
      }).then(async (item)=>{
        await item.update({
          name:req.body.name,
          description:req.body.description,
          price:req.body.price
           }).then(()=>{
             req.flash('success','Item editado com sucesso!')
            res.redirect('/api/v1/user/'+req.params.id+'/item/list')
            return Promise.resolve('Item edited')
      }).catch((err)=>{
        console.log(err)
        res.redirect('/api/v1')
      })
    }).catch(err=>{
      console.log(err)
      res.redirect('/api/v1')
    })
    }else{
      req.session.error = 'Unauthorized'
      res.redirect('/api/v1')
    }
  }else if(req.session.error){
    req.session.user = null
    req.flash('info','Você não está autorizado à realizar esta ação!')
    res.redirect('/api/v1');
  }
});

router.delete('/:id/item/:itemId',middleware.authenticate,async (req,res)=>{
  if(req.session.user){
    if(req.session.user.id == req.params.id){
      await Item.findOne({
        where:{[Op.and]:[{id:req.params.itemId},{userId:req.params.id}]}
        }).then(async (item)=>{
          await item.destroy()
          req.flash('success','Item deletado com sucesso!')
          res.redirect('/api/v1/user/'+req.params.id+'/item/list')
        }    
    ).catch(err=>{
      console.log(err)
      res.redirect('/api/v1')
    })
    }else{
      req.session.error = 'Unauthorized'
      res.redirect('/api/v1')
    }
  }else if(req.session.error){
    req.session.user = null
    req.flash('info','Você não está autorizado à realizar esta ação!')
    res.redirect('/api/v1');
  }
})


router.get('/:id/test',(req,res)=>{
  let token = undefined;
  if(localStorage.getItem('token')){
    token=localStorage.getItem('token')
  } else {
    token = null
  }  
  axios.get('http://localhost:3000/authorize', 
{ headers : { 'Authorization':token } } )
.then(response=>{
  if(response.data.id == req.params.id)
  Item.findAndCountAll({
    where:{
      userId:req.params.id
    }
  }).then(result=>{
    console.log(result)
  }).catch(error=>{
    console.log(error)
  })
})
.catch(error=>{
    console.log(error);
    res.render('error',{error:error})
}); 
})

module.exports = router