// Work in progress!
import useAsync from './useAsync'
import fetchDataFromApi from './fetchDataFromApi'
import { useEffect } from 'react'
const testUrl = 'https://jsonplaceholder.typicode.com/posts'

// TODO Make the input submit by pressing RETURN

export default function useAsyncHook () {
  const { data, error, loading, run } = useAsync()

  useEffect(() => {
    run(() => fetchDataFromApi(testUrl))
  }, [])
  const handleDataRetrieval = (e) => {
    e.preventDefault()
    run(() => fetchDataFromApi(testUrl))
  }
  useEffect(() => {
    if (data) {
      console.log('Data retrieved:', data)
    }
  })

  return (
    <>
      <div>
        <h1>useAsyncHook</h1>
        <button onClick={handleDataRetrieval.bind(this)}>Reload JsonPlaceholder TODO data</button>
        <div>loading = ${loading}</div>
        <div>
          Nothing!
        </div>
        <div>Error = ${error}</div>
      </div>
    </>
  )
}
