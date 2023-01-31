import { useState, useEffect } from 'react'
import personService from './services/personservice'
import Form from './components/form'
import Notification from './components/notification'
import Persons from './components/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getData()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const names = persons.map(person => person.name)
    const numbers = persons.map(person => person.number)
    if (names.includes(newName)) {
      if (numbers.includes(newNumber)) {
        setNewName('')
        setNewNumber('')
        setMessage(`${newName} is already in phonebook!`)
        setTimeout(() => {setMessage(null)}, 3000)
      }
      else {
        const confirm = window.confirm(`${newName} is already in phonebook, update number?`)
        if (confirm) {
          updateNumber(newName, newNumber)
        }
      }
    }
    else {
      const person = {
        name: newName,
        number: newNumber,
      }
      personService
        .postData(person)
        .then(response => {
          console.log(response)
          setPersons(persons.concat(response))
          setNewName('')
          setNewNumber('')
          setMessage(`${person.name} added to phonebook`)
          setTimeout(() => {setMessage(null)}, 3000)
        })
    }
  }

  const deletePerson = (person) => {
      const confirm = window.confirm(`Delete ${person.name}?`)
      if (confirm) {
        personService
          .deleteData(person.id)
          .then(response => {            
            console.log(response)
            personService
              .getData()
              .then(response => {
                setPersons(response)
              })
            setMessage(`${person.name} deleted from phonebook`)
            setTimeout(() => {setMessage(null)}, 3000)
          })
      }
  }

  const updateNumber = (name, newNumber) => {
    const personToUpdate = persons.find(person => person.name === name)
    const updatedPerson = { ...personToUpdate, number: newNumber }
    personService
      .updateNumber(personToUpdate.id, updatedPerson)
      .then(response => {
        setPersons(persons.map(person => person.id !== personToUpdate.id ? person : response))
        setNewName('')
        setNewNumber('')
        setMessage(`Number updated for ${name}`)
        setTimeout(() => {setMessage(null)}, 3000)
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} />
      <h3>add a new</h3>
      <Form 
        handleSubmit={addPerson}
        input1_value={newName}
        input1_change={handleNameChange}
        input2_value={newNumber}
        input2_change={handleNumberChange}
      />      
      <h3>Numbers</h3>
      <Persons 
        persons={persons} 
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App