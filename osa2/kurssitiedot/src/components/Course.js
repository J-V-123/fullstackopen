const Part = ({ part }) => {
    return (
      <div>
        <p>{part.name}, exercises: {part.exercises}</p>
      </div>
    )
    }
  
const Header = ({ course }) => {
return <h2>Course: {course.name}</h2>
}

const Content = ({ parts }) => {
return (
    <div>
    {parts.map(part =>
        <Part key={part.id} part={part} />
    )}
    </div>
)
}

const Total = ({ parts }) => {
const exercises = parts.map(part => part.exercises)
const total = exercises.reduce( (s, p) => s + p )
return (
    <div>
    <p>Total: {total}</p>
    </div>
)
}

const Course = ({ course }) => {
return (
    <>
    <Header course = {course} />
    <Content parts = {course.parts} />
    <Total parts = {course.parts} />
    </>
)
}

export default Course