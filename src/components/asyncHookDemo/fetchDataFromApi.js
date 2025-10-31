function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export default function fetchDataFromApi (url) {
  return fetch(url)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`Network response to fetch of endpoint "${url} was not ok. Code = ${response.status} - ${response.statusText}`)
      }
      await sleep(Math.floor(Math.random() * 2000)) // random pause to simulate network latency
      return response.json()
    })
    .catch(error => {
      throw error
    })
}
