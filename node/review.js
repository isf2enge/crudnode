const express = require('express')
const app = express()
const admin = require('./admin/admin')
const user = require('./user/user')
const handlebars = require('express-handlebars')
const bodyparser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
require('./config/auth')(passport)


app.engine('handlebars',handlebars.engine({defaultLayout: 'main'}))
app.set('view engine','handlebars')

app.use(session({
    secret: 'isaias',
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.use((req,res,next)=>{

    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    next()
})

app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())



app.use('/admin',admin)
app.use('/user',user)
app.listen(8081,()=>{

    console.log('Servidor rodando!')
})