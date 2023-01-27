import { useState, useEffect } from 'react'
import axios from 'axios'

const Person = ({ person }) => (
  <div>{person.name} {person.number}</div>
)

const Persons = ({ persons }) => (
  <div>
    {persons.map(person =>
      <Person key={person.name} person={person} />  
    )}
  </div>
)

const Form = (props) => (
    <form onSubmit={props.handleSubmit}>
        <div>
          name: <input 
                  value={props.input1_value}
                  onChange={props.input1_change}
                />
        </div>
        <div>
          number: <input
                    value={props.input2_value}
                    onChange={props.input2_change}
                  />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form >
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const names = persons.map(person => person.name)
    console.log(names)
    const url = 'http://localhost:3001/persons'

    if (names.includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    
    else {
      const person = {
        name: newName,
        number: newNumber,
      }
  
      axios
        .post(url, person)
        .then(response => {
          console.log(response)
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <h3>add a new</h3>
      <Form 
        handleSubmit={addPerson}
        input1_value={newName}
        input1_change={handleNameChange}
        input2_value={newNumber}
        input2_change={handleNumberChange}
      />      
      <h3>Numbers</h3>
      <Persons persons={persons} />
    </div>
  )
}

export default App