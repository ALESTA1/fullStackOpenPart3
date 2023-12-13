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


const Person = require('./models/person')

app.get('/api/persons',(request,response)=>{

    Person.find({}).then(result=>{

        response.json(result)        
    })
    
})
app.get('/info',(request,response)=>{

   
    Person.find({}).then(result=>{

        const len = result.length
        const time = new Date()
        const res = `The DB has info for ${len} people , ${time}`
        response.json(res);
        
    })
   
})

app.get('/api/persons/:id',(request,response)=>{

    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
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

  const person = new Person({
    name : body.name,
    number : body.name
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})
const PORT = process.env.PORT || 3001
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})