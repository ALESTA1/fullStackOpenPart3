const express = require('express')
require('dotenv').config()
var app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :response-time :body'))

const errorHandler = (error,req,res,next) =>{

    console.log(error)

    if(error.name==='CastError'){
        return response.status(400).send({error: 'malformatted id'});
    }
    else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)

}

app.use(errorHandler)
const Person = require('./models/person')

app.get('/api/persons',(request,response,next)=>{

    Person.find({}).then(result=>{

        response.json(result)        
    })
    
})
app.get('/info',(request,response,next)=>{

   
    Person.find({}).then(result=>{

        const len = result.length
        const time = new Date()
        const res = `The DB has info for ${len} people , ${time}`
        response.json(res);
        
    })
    
   
})

app.get('/api/persons/:id',(request,response,next)=>{

    Person.findById(request.params.id).then(person => {
        if(person)
        response.json(person)
        else
            response.status(404).end()
    })
    .catch(error=>next(error))
})

app.delete('/api/persons/:id', (request, response) => {
    
    Person.findByIdAndDelete(request.params.id).then(
        response.status(204).end()
    )    
})

app.post('/api/persons', (request, response) => {
    
    const body = request.body
   
  if (body.name === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  Person.findOneAndUpdate({name:body.name},{$set:{number:body.number}},{upsert :true})
  .then(

    response.status(200).send('updated records')
  )
  .catch( err=>{

    console.log(err)
  }
  )
  
})
const PORT = process.env.PORT || 3001
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})