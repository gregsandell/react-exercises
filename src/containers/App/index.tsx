import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import styles from './App.module.css'

import AsyncHookDemo from '../../components/asyncHookDemo'
import Autocomplete from '../../components/autocomplete'
import AutocompleteOnline from '../../components/autocompleteOnline'
import BankTransactions from '../../components/bankTransactions'
// import Calc from '../../components/calc' // TODO restore this when TypeScript problems are fixed
import ColorSwitch from '../../components/colorSwitch'
import Counter from '../../components/counter'
import FormValidation from '../../components/formValidation'
import FormValidationHtml5 from '../../components/formValidation-html5'
import FormValidationHooks from '../../components/formValidation-hooks'
import FormValidationFormik from '../../components/formValidationFormik'
import Home from '../../components/home'
import InfiniteScroll from '../../components/infiniteScroll'
import MUITable from '../../components/mui-table'
import OrganizeTeams from '../../components/organizeTeams'
import Pagination from '../../components/pagination'
import Quiz from '../../components/quiz'
import StarRating from '../../components/starRating'
import StarRatingPublished from '../../components/starRatingPublished'
import ToDoBroken from '../../components/fixThisToDo/unfixed'
import ToDoFixed from '../../components/fixThisToDo/fixed'
import ToDoList from '../../components/toDoList'
import WordByWord from '../../components/wordByWord'
import WordByWordPublished from '../../components/wordByWordPublished'

import suggestions from '../../components/autocomplete/autocompleteData'
import teamData from './organizeTeamsData'
import quizData from './quizData'
import bankData from '../../components/bankTransactions/fixtures'

/* TODO:  change to an original list of suggestions */
function App () {
  const navlinks = [
    { to: '/asyncHookDemo', text: 'asyncHookDemo', element: <AsyncHookDemo /> },
    { to: '/autocomplete', text: 'AutoComplete', element: <Autocomplete suggestions={suggestions} /> },
    { to: '/autocompleteonline', text: 'Autocomplete (published version)', element: <AutocompleteOnline suggestions={suggestions} /> },
    // { to: '/calc', text: 'Calculator', element: <Calc initial={0} /> }, // TODO fix the typ0escript problems in <Calc>
    { to: '/bankTransactions', text: 'Bank Transactions', element: <BankTransactions txns={bankData} /> },
    { to: '/counter', text: 'Counter', element: <Counter /> },
    { to: '/colorSwitch', text: 'Color Switch', element: <ColorSwitch /> },
    { to: '/formValidation', text: 'Form Validation', element: <FormValidation /> },
    { to: '/formValidation-hooks', text: 'Form Validation with react-form-hooks', element: <FormValidationHooks /> },
    { to: '/formValidation-html5', text: 'Form Validation with HTML5', element: <FormValidationHtml5 /> },
    { to: '/formValidationFormik', text: 'Form Validation with Formik', element: <FormValidationFormik /> },
    { to: '/infiniteScroll', text: 'Infinite Scroll', element: <InfiniteScroll /> },
    { to: '/organizeteams', text: 'Organize Teams', element: <OrganizeTeams players={teamData.players} /> },
    { to: '/pagination', text: 'Pagination (from scratch)', element: <Pagination /> },
    { to: '/mui-table', text: 'Pagination (with a UI library)', element: <MUITable /> },
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
              <li key={`navlink_${i}`}><NavLink to={record.to}>{record.text}</NavLink></li>
            )
          }
        </ul>
        {/* TO DO Make the apps centered in screen */}
        <Routes>
          <Route path={'/'} element={<Home />} />
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
