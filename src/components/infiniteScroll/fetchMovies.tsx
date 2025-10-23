import axios, {AxiosResponse} from 'axios'

const API_KEY = 'f9b71d9a'
const ROOT_URI = `https://www.omdbapi.com/?apikey=${API_KEY}`

export const fetchMovies = async (title = 'john', page = 1): Promise<AxiosResponse<any, any>> => {
  const url = `${ROOT_URI}&s=${title}&page=${page}`

  return axios.get(url)
}
