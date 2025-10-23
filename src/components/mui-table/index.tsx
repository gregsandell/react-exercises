import React, { useMemo, useState, useEffect } from 'react'
import MaterialReactTable, {MRT_ColumnDef} from 'material-react-table'
import { RandomUserApiResponse, RandomUser, FourColumnUser } from './types'
import style from './mui-table.module.css'
const NUM_ITEMS = 25

export default function MUITable () {
  const [JSONdata, setJSONdata] = useState<FourColumnUser[]>([])
  const url = `https://randomuser.me/api?results=${NUM_ITEMS}`
  const fetchData = async (url: string): Promise<any> => {
    await fetch(url)
      .then(response => response.json())
      .then((data: RandomUserApiResponse) => {
        console.log(data)
        setJSONdata(adaptToFourColumns(data.results))
      })
      .catch((e) => console.log(`fetch error.  No network connection?  randomuser.me is down? error = ${e}`))
  }

  useEffect(() => {
    fetchData(url)
  }, []) // Empty array for 2nd arg means this will be called once in component lifecycle

  const columns = useMemo<MRT_ColumnDef<FourColumnUser>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name'
      },
      {
        accessorKey: 'email',
        header: 'Email'
      },
      {
        accessorKey: 'address',
        header: 'Address'
      },
      {
        accessorKey: 'phone',
        // id: 'phone',
        header: 'Phone'
      }
    ],
    []
  )
  const adaptToFourColumns = (data: RandomUser[]): FourColumnUser[] => {
    return data.map((user) => {
      const name = `${user.name.title} ${user.name.first} ${user.name.last}`
      const address = `${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.postcode}`
      return ({
        name: name.trim(),
        email: user.email.trim(),
        address: address.trim(),
        phone: user.phone.trim()
      })
    })
  }

  return (
    <div id={style.container}>
      <MaterialReactTable
        columns={columns}
        data={JSONdata}
        enableColumnOrdering // enable some features
        enableStickyHeader
        initialState={{ pagination: { pageSize: 5, pageIndex: 0 } }}
      />
    </div>
  )
}
