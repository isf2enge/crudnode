const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1/servidor').then(()=>{

    console.log('Banco conectado')
})

const Schema = new mongoose.Schema({Nome: {type: String,require: true}, Senha:{type: String,require: true}})


module.exports = mongoose.model('Schemas',Schema)
