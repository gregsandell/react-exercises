import React, { useEffect, useState } from 'react'
import type { apidata, Weights } from './types'
import './globals.module.css'
import styles from './styles.module.css'
import _ from 'lodash'

const apiURL = 'https://frontend-interview-api.rollcredits.io/api/fruits'
const apiKey = 'sk-fruit-api-1234567890abcdef'

export default function Fruit() {
  const [data, setData] = useState<apidata[]>([])

  const [matchColors, setMatchColors] = useState<boolean>(false)
  const [matchNames, setMatchNames] = useState<boolean>(false)
  const [matchWeights, setMatchWeights] = useState<boolean>(false)
  const [searchText, setSearchText] = useState<string>('')

  //-data.json()

  const getFruits = async () => {
    return await fetch(apiURL, { headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    }})
      .then (async (data:any) => {
        setData(await data.json())
      })
      .catch((e: any) => console. log(e))
  }
  useEffect(() => {
    const fetchData = async () => {
      await getFruits()
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (data.length > 0) {
      console.log(`fetch data = ${JSON.stringify(data)}`)
    }
  }, [data])

  return (
    <div className={styles.app}>
      <div>
        <fieldset className={styles.fieldset}>
          <legend>Filters</legend>

          <div className={styles.filters}>
            <label>
                Match names?
              <input type="checkbox" onChange={() => setMatchNames(prev => !prev)} checked={matchNames}/>
            </label>

            <label>
                Match colors?
              <input type="checkbox" onChange={() => setMatchColors(prev => !prev)} checked={matchColors}/>
            </label>

            <label>
                Match weight in grams?
              <input type="checkbox" onChange={() => setMatchWeights(prev => !prev)} checked={matchWeights}/>
            </label>

            <label>
                Search
              <input type="text" onChange={e => setSearchText(e.currentTarget.value)} value={searchText}/>
            </label>
            <button type="reset" onClick={() => {
              setMatchNames(false)
              setMatchColors(false)
              setSearchText('')
            }}>Clear</button>
          </div>
        </fieldset>
      </div>
      <div className={styles.tabularData}>
        <table className={styles.fruitTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Primary Color</th>
              <th>Average Weight in Grams</th>
            </tr>
          </thead>
          <tbody>
            {data.filter((iitem) => {
              const searchTokens = searchText.trim().split(/\s+/)
              return ((!matchNames && !matchColors && !matchWeights) || searchText.length === 0
                || (matchNames && searchTokens.some(tok => iitem.name.includes(tok)))
                || (matchColors && searchTokens.some(tok => iitem.primaryColor.includes(tok)))
                || (matchWeights && searchTokens.some(tok => {
                  const maybeNum = Number(tok)
                  return Number.isInteger(maybeNum) && maybeNum === iitem.averageWeightInGrams
                }))
              )
            })
              .map( (item: apidata, i) => {
                return (
                  <tr key={`data${i}`}>
                    <td>{item.name}</td>
                    <td>{item.primaryColor}</td>
                    <td>{item.averageWeightInGrams}</td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
