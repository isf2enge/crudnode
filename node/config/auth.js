const localStrategy = require('passport-local').Strategy
const model = require('../model/model')
const bcrypt = require('bcryptjs')



module.exports = (passport)=>{


    passport.use(new localStrategy({usernameField: 'Nome', userpasswordField: 'Senha'},(Nome,Senha,done)=>{

        model.findOne({Nome:Nome}).then((models)=>{
            if(!models){

                return done(null,false,{message: 'Essa conta não existe'})
            }

            bcrypt.compare(Senha,models.Senha,(Err,batem)=>{
                if(batem){
                    return done(null, models)
                }
                else{

                    return done(null,false,{message: 'senha incorreta'})
                }
            })


            
        })
    
    passport.serializeUser((model,done)=>{

        done(null,model.id)
    })

    passport.deserializeUser((id,done)=>{

        model.findById(id,(Err, models)=>{

            done(Err,models)
        })
    })
    
    
    
    
    }))
}