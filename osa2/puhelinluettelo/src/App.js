import { useState, useEffect } from 'react'
import personService from './services/persons'

const Person = ({ person, deletePerson }) => (
  <div>
    {person.name} {person.number}
    <button onClick={deletePerson}>delete</button>
  </div>
)

const Persons = ({ persons, deletePerson }) => (
  <div>
    {persons.map(person =>
      <Person 
        key={person.id} 
        person={person} 
        deletePerson={() => deletePerson(person)}
      />  
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

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="message">
      {message}
    </div>
  )
}

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
    if (names.includes(newName)) {
      setNewName('')
      setNewNumber('')
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
          .then(reponse => {            
            setMessage(`${person.name} deleted`)
            setTimeout(() => {setMessage(null)}, 3000)
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