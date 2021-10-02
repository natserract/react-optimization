import React, { memo, useState } from "react"
import { useQueryCached } from "./useQueryCached"
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import { AllContextProvider } from "./Store"

function ExpensiveComponent() {
  let now = performance.now();
  while (performance.now() - now < 200) {
    // Artificial delay -- do nothing for 200ms
  }

  return <p>I am a very slow component</p>
}

const ChildWithoutMemo = () => {
  console.log("child of ChildWithoutMemo");

  return (
    <React.Fragment>
      ChildWithoutMemo
    </React.Fragment>
  )
}

const ChildWithMemo = memo(() => {
  console.log("child of ChildWithMemo");

  return (
    <React.Fragment>
      ChildWithMemo
      <ExpensiveComponent />
    </React.Fragment>
  )
})

const Parent = () => {
  const [, forceRender] = useState<any>();

  return (
    <AllContextProvider>
      <ChildWithoutMemo />
      <ChildWithMemo />
      <button onClick={() => forceRender({})}>Rerender Parent</button>
    </AllContextProvider>
  )
}

export default Parent