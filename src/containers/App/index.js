import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import styles from './App.module.css'
import ToDoList from '../../components/toDoList'
import Counter from '../../components/counter'
import OrganizeTeams from '../../components/organizeTeams'
import Autocomplete from '../../components/autocomplete'
import AutocompleteOnline from '../../components/autocompleteOnline'
import WordByWord from '../../components/wordByWord'
import WordByWordPublished from '../../components/wordByWordPublished'
import Pagination from '../../components/pagination'
import StarRating from '../../components/starRating'
import StarRatingPublished from '../../components/starRatingPublished'
import Quiz from '../../components/quiz'
import suggestions from './autocompleteData'
import teamPlayers from './organizeTeamsData'

/* TODO:  change to an original list of suggestions */
function App () {
  const navlinks = [
    { to: '/counter', text: 'Counter', element: <Counter /> },
    { to: '/todolist', text: 'To Do List', element: <ToDoList /> },
    { to: '/autocomplete', text: 'AutoComplete', element: <Autocomplete suggestions={suggestions} /> },
    { to: '/autocompleteonline', text: 'Autocomplete (published version)', element: <AutocompleteOnline suggestions={suggestions} /> },
    { to: '/organizeteams', text: 'Organize Teams', element: <OrganizeTeams players={teamPlayers} /> },
    { to: '/wordbyword', text: 'Word by Word', element: <WordByWord /> },
    { to: '/wordbywordpublished', text: 'Word by Word (published version)', element: <WordByWordPublished /> },
    { to: '/pagination', text: 'Pagination', element: <Pagination /> },
    { to: '/starrating', text: 'Star Rating', element: <StarRating /> },
    { to: '/starratingpublished', text: 'Star Rating (published version)', element: <StarRatingPublished /> },
    { to: '/quiz', text: 'Quiz', element: <Quiz /> }
  ]
  return (
    <Router>
      <div className={styles.App}>
        <ul>
          {
            navlinks.map((record, i) => (
              <li key={`navlink_${i}`}><NavLink to={record.to} activestyle={{ color: 'green' }}>{record.text}</NavLink></li>
            ))
          }
        </ul>
        <Routes>
          {
            navlinks.map((record, i) => (
              <Route key={`route_${i}`} exact='true' path={record.to} element={record.element} />
            ))
          }
        </Routes>
      </div>
    </Router>
  )
}

export default App
