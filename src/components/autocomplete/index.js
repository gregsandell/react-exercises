import React from 'react'
// import classnames from 'classnames'

// the exported component can be either a function or a class

export default function Autocomplete () {
  return (
    <div className='wrapper'>
      <h1>Autocomplete</h1>
      <div className='control'>
        <input type='text' className='input' />
      </div>
      <div className='list is-hoverable' />
    </div>
  )
}
