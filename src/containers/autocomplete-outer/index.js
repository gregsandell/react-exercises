/* eslint-disable react/prop-types */
import React from 'react'
import suggestions from '../App/autocompleteData'
import Autocomplete from '../../components/autocomplete'

const AutocompleteOuter = () => {
  return (
    <div>
      <Autocomplete suggestions={suggestions} />
    </div>
  )
}

export default AutocompleteOuter
