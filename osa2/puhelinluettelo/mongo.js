const mongoose = require('mongoose')

const password = process.argv[2]

const url = `mongodb+srv://johannesv:${password}@cluster0.cvs4hki.mongodb.net/persons
    ?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

