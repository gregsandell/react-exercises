import './App.css'
import ToDoList from '../../components/toDoList'
import Counter from '../../components/counter'
import Autocomplete from '../../components/autocomplete'
import suggestions from './autocompleteData'

function App () {
  return (
    <div className='App'>
      <ToDoList />
      <Counter />
      <Autocomplete suggestions={suggestions} />
    </div>
  )
}

export default App
