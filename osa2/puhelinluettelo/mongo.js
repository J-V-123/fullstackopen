const mongoose = require('mongoose')

const password = process.argv[2]

const url = `mongodb+srv://johannesv:${password}@cluster0.cvs4hki.mongodb.net/persons
    ?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

if (process.argv.length === 5) {
    const personSchema = new mongoose.Schema({
        name: String,
        number: String,
    })

    const Person = mongoose.model('Person', personSchema)

    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })
}