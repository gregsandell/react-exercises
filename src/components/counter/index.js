import { Component } from 'react'

export default class Index extends Component {
  constructor () {
    super()
    this.state = { counter: 42 }
  }

  handleIncrement (e) {
    e.preventDefault()
    this.setState((prevState) => ({
      counter: prevState.counter + 1
    }))
  }

  render () {
    return (
      <>
        <div>
          <h1>Counter</h1>
          <div>
            <span>Counter Value: </span><span>{this.state.counter}</span>
          </div>
          <button onClick={this.handleIncrement.bind(this)}>Increment</button>
        </div>
        <style>{`
                    .counter-button {
                        font-size: 1rem;
                        padding: 5px 10px;
                        color:  #585858;
                    }
                `}</style>

      </>
    )
  }
}
