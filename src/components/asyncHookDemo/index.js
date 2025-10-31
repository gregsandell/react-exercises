// Work in progress!
import { useEffect } from 'react'
import useAsync from './useAsync'
import fetchDataFromApi from './fetchDataFromApi'
const testUrl = 'https://jsonplaceholder.typicode.com/posts'
import loadingGif from '../../containers/App/loading-200x192.gif'
import style from './useAsync.module.css'

export default function asyncHookDemo () {
  let { data, error, loading, run, clear } = useAsync(() => fetchDataFromApi(testUrl))

  // If you want the data auto retrieved and loaded, you would uncomment this useEffect.
  // useEffect(() => {
  //   run(() => fetchDataFromApi(testUrl))
  // }, [])

  const handleDataClear = (e) => {
    e.preventDefault()
    clear()
  }
  const handleDataRetrieval = (e) => {
    e.preventDefault()
    clear()
    run()
  }
  useEffect(() => {
    if (data) {
      console.log('Data retrieved')
    }
    console.log(error ? `there is an error: ${error}` : 'there is no error')
  })

  return (
    <>
      <div>
        <h1>useAsyncHook</h1>
        <button onClick={handleDataRetrieval.bind(this)}>Retrieve data</button>
        &nbsp;&nbsp;
        <button onClick={handleDataClear.bind(this)}>Clear output</button>
        {/*{ isEmpty(error) && (*/}
        <div>
          { loading &&
              <div className={style.loading}>
                <img src={loadingGif} alt={'Animated loading spinner'}/>
                <p style={{ fontSize: '10px'}}>...Simulated network latency...</p>
              </div>
          }
          { data  && (
            <div> {
              data.map((row, i) => {
                return (
                  <dl key={`row${i}`}>
                    <dt style={{fontWeight: 'bold'}}>{row.title}</dt>
                    <dd>{row.body}</dd>
                  </dl>
                )
              })
            }
            </div>
          )}
        </div>
        {/*)}*/}
      </div>
      { error instanceof Error && (<div>ERROR: {error.message}</div>)}
    </>
  )
}
