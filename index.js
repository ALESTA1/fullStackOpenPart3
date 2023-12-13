const express = require('express')
var app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :response-time :body'))


import mongoose from 'mongoose'

const password = process.argv[2];

const url = `mongodb+srv://alesta:${password}@phonebookdb.j8jkarc.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)


const phoneBookSchema = new mongoose.Schema({

    name : String,
    number: String
})

const Person = mongoose.model('Person',phoneBookSchema)

if(process.argv.length==3){

    Person.find({}).then(result=>{

        result.forEach(e=>{
            console.log(e)
        })
        mongoose.connection.close()
        process.exit(1)
    })
}

const person = new Person({
    name : process.argv[3],
    number : process.argv[4]
})

person.save().then(result=>{
    console.log("person saved")
    mongoose.connection.close()
})
app.get('/api/persons',(request,response)=>{

    Person.find({}).then(result=>{

        response.json(result)
        
    })
    .catch(
        response.status(404).json({error:'coudnt retrieve from DB'})
    )
    
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
    console.log(request.body)
    const person = request.body
    persons.forEach(e=>{

        if(e.name===person.name){
            response.status(400).json({error:"entry already exists with given name"})
        }
    })
    person.id = Math.floor(Math.random()*(10000));
    persons = persons.concat(person)
    response.json(person)
})
const PORT = process.env.PORT || 3001
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})