import React, { memo, useState } from "react"
import { useCachedFetch } from "./useCachedFetch"
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import { AllContextProvider, useCachedDataCtx } from "./Store"

type Data = {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

const ChildWithoutMemo = () => {
  const [, setCachedData] = useCachedDataCtx()
  const { data } = useCachedFetch('https://jsonplaceholder.typicode.com/users/')

  console.log("child of ChildWithoutMemo");

  return (
    <React.Fragment>
      {JSON.stringify(data)}
      {/* <button onClick={() => setCachedData('https://jsonplaceholder.typicode.com/posts/')}>Refetch</button> */}
    </React.Fragment>
  )
}

const ChildWithMemo = memo(() => {
  const [data] = useCachedDataCtx()

  console.log("child of ChildWithMemo");

  return (
    <React.Fragment>
      {JSON.stringify(data)}
      {/* <button onClick={() => setCachedData('https://jsonplaceholder.typicode.com/posts')}>Refetch 2</button> */}
    </React.Fragment>
  )
})

const Root = () => {
  const [, forceRender] = useState<any>();

  return (
    <AllContextProvider>
      <ChildWithoutMemo />
      <ChildWithMemo />
      <button onClick={() => forceRender({})}>Rerender Parent</button>
    </AllContextProvider>
  )
}

export default Root