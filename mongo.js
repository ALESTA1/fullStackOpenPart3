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