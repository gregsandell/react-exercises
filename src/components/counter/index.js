import cx from 'classnames'
import { Component } from 'react'

export default class Index extends Component {
  constructor () {
    super()
    this.state = { counter: 42 }
  }

  handleIncrement (e) {
    console.log('handler')
    e.preventDefault()
    this.setState((prevState) => ({
      counter: prevState.counter + 1
    }))
  }

  render () {
    return (
      <>
        <div>
          <h2 className={cx('counter')}>{this.state.counter}</h2>
          <button className={cx('counter-button')} onClick={this.handleIncrement.bind(this)}>Click</button>
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
