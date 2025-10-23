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
import FormValidation from '../../components/formValidation'
import FormValidationHtml5 from '../../components/formValidation-html5'
import FormValidationHooks from '../../components/formValidation-hooks'
import FormValidationFormik from '../../components/formValidationFormik'
import ColorSwitch from '../../components/colorSwitch'
import InfiniteScroll from '../../components/infiniteScroll'
// import Calc from '../../components/calc' // TODO restore this when TypeScript problems are fixed
import MUITable from '../../components/mui-table'
import UseAsyncHook from '../../components/useAsyncHook'
import ToDoBroken from '../../components/fixThisToDo/unfixed'
import ToDoFixed from '../../components/fixThisToDo/fixed'

import suggestions from '../../components/autocomplete/autocompleteData'
import teamPlayers from './organizeTeamsData'
import quizData from './quizData'

/* TODO:  change to an original list of suggestions */
function App () {
  const navlinks = [
    { to: '/useAsyncHook', text: 'Async Fetch hook (Work in Progress)', element: <UseAsyncHook /> },
    { to: '/autocomplete', text: 'AutoComplete', element: <Autocomplete suggestions={suggestions} /> },
    { to: '/autocompleteonline', text: 'Autocomplete (published version)', element: <AutocompleteOnline suggestions={suggestions} /> },
    // { to: '/calc', text: 'Calculator', element: <Calc initial={0} /> }, // TODO fix the typ0escript problems in <Calc>
    { to: '/counter', text: 'Counter', element: <Counter /> },
    { to: '/colorSwitch', text: 'Color Switch', element: <ColorSwitch /> },
    { to: '/formValidation', text: 'Form Validation', element: <FormValidation /> },
    { to: '/formValidation-html5', text: 'Form Validation with HTML5', element: <FormValidationHtml5 /> },
    { to: '/formValidation-hooks', text: 'Form Validation with react-form-hooks', element: <FormValidationHooks /> },
    { to: '/formValidationFormik', text: 'Form Validation with Formik', element: <FormValidationFormik /> },
    { to: '/infiniteScroll', text: 'Infinite Scroll', element: <InfiniteScroll /> },
    { to: '/mui-table', text: 'Pagination (with a UI library)', element: <MUITable /> },
    { to: '/organizeteams', text: 'Organize Teams', element: <OrganizeTeams players={teamPlayers} /> },
    { to: '/pagination', text: 'Pagination (from scratch)', element: <Pagination /> },
    { to: '/quiz', text: 'Quiz', element: <Quiz questions={quizData} /> },
    { to: '/starrating', text: 'Star Rating', element: <StarRating /> },
    { to: '/starratingpublished', text: 'Star Rating (published version)', element: <StarRatingPublished /> },
    { to: '/todobroken', text: 'To Do (Broken)', element: <ToDoBroken /> },
    { to: '/todofixed', text: 'To Do (Fixed)', element: <ToDoFixed /> },
    { to: '/todolist', text: 'To Do List', element: <ToDoList /> },
    { to: '/wordbyword', text: 'Word by Word', element: <WordByWord /> },
    { to: '/wordbywordpublished', text: 'Word by Word (published version)', element: <WordByWordPublished /> },
  ]
  return (
    <Router>
      <div className={styles.App}>
        <ul>
          {
            //   TODO active styling not working because (I think) entire page (with navigation)
            // is rendering on each click.
            navlinks.map((record, i) =>
              <li key={`navlink_${i}`}><NavLink to={record.to} activeClassName={styles.active}>{record.text}</NavLink></li>
            )
          }
        </ul>
        {/* TO DO Make the apps centered in screen */}
        <Routes>
          {
            navlinks.map((record, i) => (
              <Route key={`route_${i}`} path={record.to} element={record.element} />
            ))
          }
        </Routes>
      </div>
    </Router>
  )
}

export default App
