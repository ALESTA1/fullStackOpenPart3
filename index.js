const express = require('express')
const app = express()

var persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons',(request,response)=>{
    response.json(persons)
})
app.get('/info',(request,response)=>{

    const len = persons.length
    const time = new Date()
    response.send(
        `<p>
        <p>The phoneBook has info for ${len} people</p>
        <p>${time}</p>
        </p>         `
    )
})
app.get('/api/persons/:id',(request,response)=>{

    const id = request.params.id
    persons.forEach(e=>{
        if(e.id==id){

            response.json(e);
        }    
    })
    response.status(400).json({error:'content missing'})
})
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(note => note.id !== id)  
    response.status(204).end()
})
app.post('/api/persons', (request, response) => {
    const person = request.body
    //persons.concat(person)
    console.log(person)
    response.json(person)
})
const PORT = 3001
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})