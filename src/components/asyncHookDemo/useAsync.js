import { useState, useCallback } from 'react'
export default function useAsync (fn, deps = []) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const clear = () => setData([])

  const run = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await fn()
      setData(result)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, deps)

  // Use below only if you want to force an auto-retrieval (which the calling code cannot stop)
  // useEffect(() => {
  //   if (fn) run()
  // }, [run])

  return { data, error, loading, run, clear }
}
