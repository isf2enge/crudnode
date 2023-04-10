const express = require('express')
const app = express()
const model = require('../model/model')





app.get('/contas',(req,res)=>{
    model.find().lean().then((modelo)=>{
        res.render('contas',{modelo:modelo})

    })
    
})

app.get('/edit/:_id',(req,res)=>{
    model.findOne({'_id': req.params._id}).lean().then((modelo)=>{

        res.render('editor',{modelo:modelo})
    })

})

app.post('/alterado',(req,res)=>{

    model.updateOne({Nome: req.body.Nome, Senha: req.body.Senha}).then(()=>{

        req.flash('success_msg','Alteração feita com sucesso')
        res.redirect('/admin/contas')
    })
})


module.exports = app