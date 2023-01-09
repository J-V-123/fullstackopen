const Part = (props) => {
  return (
    <div>
      <p>Name: {props.part.name}</p>
    </div>
  )
  }

  const Header = (props) => {
    return <h1>Course: {props.course.name}</h1>
  }

const Content = (props) => {
  return (
    <div>
      <p>Content:</p>
      <Part part = {props.parts[0]}/>
      <Part part = {props.parts[1]}/>
      <Part part = {props.parts[2]}/>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Total exercises: {props.parts[0].exercises + props.parts[1].exercises
       + props.parts[2].exercises}</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <>
      <Header course = {course}/>
      <Content parts = {course.parts}/>
      <Total parts = {course.parts}/> 
    </>
  )
}


export default App