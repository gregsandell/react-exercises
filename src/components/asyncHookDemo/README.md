# useAsync Hook

TODO: rewrite in TypeScript

A hook to wrap any asynchronous action, that manages state variables
and methods one usually needs...instead of creating state variables and functions yourself. 

Sample call:
> let { data, error, loading, run, clear } = useAsync(() => myAsyncFunc())

* **myAsyncFunc** is what you provide.  Typically this would consist of a `fetch()` call that takes time to run.
* **run**:  calling `run()` triggers your function
* **loading**: will be `true` during your async function's execution, and back to `false` when done
* **data** is what your function returns, but is empty prior to calling `run()`
* **clear**: calling `clear()` sets `data` to empty
* **error**: the message when your async function fails

