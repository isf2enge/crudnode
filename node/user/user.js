const express = require('express')
const app = express()
const model = require('../model/model')
const bcrypt = require('bcryptjs')
const passport = require('passport')



app.get('/',(req,res)=>{

    res.render('formulario')
})
app.post('/criado',(req,res)=>{

   model.findOne({Nome: req.body.Nome}).then((modelo)=>{
    if(modelo){

        req.flash('error_msg','Nome já existe')
        res.redirect('/user')
    }

    else{

        const modelos = model({Nome:req.body.Nome,Senha:req.body.Senha})

        bcrypt.hash(req.body.Senha,8,(Err,hash)=>{

            if(Err){

                req.flash('error_msg','Erro no cadastro')
                res.redirect('/user')
            }

            else{

                modelos.Senha = hash

                modelos.save().then(()=>{

                    req.flash('success_msg','Conta criada com sucesso')
                    res.redirect('/admin/contas')
                })
            }
        })
    }
    
   })
    
})



app.get('/usuario',(req,res)=>{

    res.render('login')
})


module.exports = app