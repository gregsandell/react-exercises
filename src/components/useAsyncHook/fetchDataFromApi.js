// Work in progress!
export default function fetchDataFromApi (url) {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response to fetch of endpoint "${url} was not ok. Code = ${response.status} - ${response.statusText}`)
      }
      return response.json()
    })
    .catch(error => {
      console.error(`fetch operation for endpoint "${url} received error: "${error}"`)
      throw error
    })
}
