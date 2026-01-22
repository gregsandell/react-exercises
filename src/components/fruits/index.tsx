import React, { useEffect, useState } from 'react'
import type { apidata } from './types'

const apiURL = 'https://frontend-interview-api.rollcredits.io/api/fruits'

const apiKey = 'sk-fruit-api-1234567890abcdef'

export default function Fruit() {
  const [data, setData] = useState<apidata[]>([])
  //-data.json()
  const getFruits = async () => {
    return await fetch(apiURL, { headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    }})
      .then (async (data:any) => {
        console. log(data)
        setData (await data.json())
      })
      .catch((e: any) => console. log(e))
  }
  useEffect((): void => {
    const fetchData = async () => {
      await getFruits()
      console.log(`fetch data = ${JSON.stringify(data)}`)
    }
    fetchData()
  }, [])

  return (
    <div className="app">
      <form
        style={{
          display: 'flex',
          flexDirection: 'column'
        }}
        onSubmit={(e) => {
          e.preventDefault()
          getFruits()
        }}
      >
        <label>Filter Title
          <input
            onChange={(e) => {
              const value = e.target.value
              console. log ('New value', value)
            }}
          />
        </label>
        <button type="submit" style={{ marginTop: 10 }}>Submit</button>
      </form>
      <table style={{marginTop: 10, border: '1px solid black'}}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Primary Color</th>
            <th>Average Weight in Grams</th>
          </tr>
        </thead>
        <tbody>
          {data.map( (data: apidata, i) => {
            return (
              <tr key={`data${i}`}>
                <td>{data.name}</td>
                <td>{data.primaryColor}</td>
                <td>{data.averageWeightInGrams}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
