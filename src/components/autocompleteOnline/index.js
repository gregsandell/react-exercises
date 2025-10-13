import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styles from './autocompleteOnline.module.css'

class AutocompleteOnline extends Component {
  constructor (props) {
    super(props)

    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: ''
    }
  }

  onChange (e) {
    const { suggestions } = this.props
    const userInput = e.currentTarget.value

    // Filter out suggestions that don't contain the user's input
    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    )

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    })
  };

  onClick (e) {
    // When clicking on a choice in the dropdown, put its value in the text field and close the dropdown.
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    })
  };

  onKeyDown (e) {
    const { activeSuggestion, filteredSuggestions } = this.state

    // User pressed the enter key
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      })
    } else if (e.keyCode === 38) { // User pressed the up arrow
      if (activeSuggestion === 0) {
        return
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 })
    } else if (e.keyCode === 40) { // User pressed the down arrow
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 })
    }
  };

  render () {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this

    let suggestionsListComponent

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul className={styles.suggestions}>
            {filteredSuggestions.map((suggestion, index) => {
              let className

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = 'suggestion-active'
              }

              // Render the dropdown
              return (
                <li className={styles[className]} key={suggestion} onClick={onClick.bind(this)}>
                  {suggestion}
                </li>
              )
            })}
          </ul>
        )
      } else {
        suggestionsListComponent = (
          <div className={styles['no-suggestions']}>
            <em>No suggestions, you're on your own!</em>
          </div>
        )
      }
    }

    return (
      <div>
        <h1>autocomplete (published version)</h1>
        <p>Start typing and see what happens...</p>
        <p>Words that I know are in components/autocomplete/autocompleteData.js</p>
        <Fragment>
          {/* The text box (input field) */}
          <input
            type='text'
            onChange={onChange.bind(this)}
            onKeyDown={onKeyDown.bind(this)}
            value={userInput}
          />
          {/* The dropdown */}
          {suggestionsListComponent}
        </Fragment>
      </div>
    )
  }
}
AutocompleteOnline.propTypes = {
  suggestions: PropTypes.instanceOf(Array)
}

AutocompleteOnline.defaultProps = {
  suggestions: []
}

export default AutocompleteOnline
