import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import './App.css'
import ToDoList from '../../components/toDoList'
import Counter from '../../components/counter'
import OrganizeTeams from '../../components/organizeTeams'
import Autocomplete from '../../components/autocomplete'
import AutocompleteOnline from '../../components/autocompleteOnline'
import suggestions from './autocompleteData'
import teamPlayers from './organizeTeamsData'

/* TO DO:  change to an original list of suggestions */
function App () {
  return (
    <Router>
      <div className='App'>
        <ul>
          <li>
            <NavLink to='/todolist' exact='true' activestyle={{ color: 'green' }}>To Do List</NavLink>
          </li>
          <li>
            <NavLink to='/autocomplete' exact='true' activestyle={{ color: 'green' }}>Autocomplete</NavLink>
          </li>
          <li>
            <NavLink to='/autocompleteonline' exact='true' activestyle={{ color: 'green' }}>Autocomplete (Online version)</NavLink>
          </li>
          <li>
            <NavLink to='/organizeteams' exact='true' activestyle={{ color: 'green' }}>Organize Teams</NavLink>
          </li>
          <li>
            <NavLink to='/counter' exact='true' activestyle={{ color: 'green' }}>Counter</NavLink>
          </li>
        </ul>
        <Routes>
          <Route exact='true' path='/' element={<ToDoList />} />
          <Route exact='true' path='/todolist' element={<ToDoList />} />
          <Route
            exact='true' path='/autocomplete' element={<Autocomplete suggestions={suggestions} />} />
          <Route
            exact='true' path='/autocompleteonline' element={<AutocompleteOnline suggestions={suggestions} />} />
          <Route exact='true' path='/counter' element={<Counter />} />
          <Route
            exact='true' path='/organizeteams' element={<OrganizeTeams players={teamPlayers} />} />
          <Route exact='true' path='/counter' element={<Counter />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
