import { useState } from 'react'

const StatisticLine = ({ text, value }) => (
    <tr>
      <td>{text}</td><td>{value}</td>
    </tr>
)

const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad
  const positive = [props.good / total * 100, ' %']
  const average = props.avg1 / total

  if (total === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticLine text='good' value={props.good} />
        <StatisticLine text='neutral' value={props.neutral} />
        <StatisticLine text='bad' value={props.bad} />
        <StatisticLine text='all' value={total} />
        <StatisticLine text='average' value={average} />
        <StatisticLine text='positive' value={positive} />
      </tbody>      
    </table>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [avg1, setAvg] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
    setAvg(avg1 + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

const handleBad = () => {
  setBad(bad + 1)
  setAvg(avg1 - 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button handleClick={handleGood} text = 'good' />
        <Button handleClick={handleNeutral} text = 'neutral' />
        <Button handleClick={handleBad} text = 'bad' />
      </div>      
      <h1>statistics</h1>
      <div>
        <Statistics good = {good} neutral = {neutral} bad = {bad} avg1 = {avg1}/>
      </div>
    </div>
  )
}

export default App