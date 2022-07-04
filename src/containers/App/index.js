import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import './App.css'
import ToDoList from '../../components/toDoList'
import Counter from '../../components/counter'
import OrganizeTeams from '../../components/organizeTeams'
import Autocomplete from '../../components/autocomplete'
import AutocompleteOnline from '../../components/autocompleteOnline'
import WordByWord from '../../components/wordByWord'
import WordByWordPublished from '../../components/wordByWordPublished'
import Pagination from '../../components/pagination'
import StarRating from '../../components/starRating'
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
            <NavLink to='/autocompleteonline' exact='true' activestyle={{ color: 'green' }}>Autocomplete (published version)</NavLink>
          </li>
          <li>
            <NavLink to='/organizeteams' exact='true' activestyle={{ color: 'green' }}>Organize Teams</NavLink>
          </li>
          <li>
            <NavLink to='/wordbyword' exact='true' activestyle={{ color: 'green' }}>Word by Word</NavLink>
          </li>
          <li>
            <NavLink to='/wordbywordpublished' exact='true' activestyle={{ color: 'green' }}>Word by Word (published version)</NavLink>
          </li>
          <li>
            <NavLink to='/pagination' exact='true' activestyle={{ color: 'green' }}>Pagination</NavLink>
          </li>
          <li>
            <NavLink to='/counter' exact='true' activestyle={{ color: 'green' }}>Counter</NavLink>
          </li>
          <li>
            <NavLink to='/starrating' exact='true' activestyle={{ color: 'green' }}>Star Rating</NavLink>
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
          <Route
            exact='true' path='/wordbyword' element={<WordByWord />} />
          <Route
            exact='true' path='/wordbywordpublished' element={<WordByWordPublished />} />
          <Route
            exact='true' path='/pagination' element={<Pagination />} />
          <Route
            exact='true' path='/starrating' element={<StarRating />} />
          <Route exact='true' path='/counter' element={<Counter />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
