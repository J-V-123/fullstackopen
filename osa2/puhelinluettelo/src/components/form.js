
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

export default Form