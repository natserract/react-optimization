import React from "react"
import { useQueryCached } from "./useQueryCached"
import { AllContextProvider } from "./Store"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

const Child = () => {
  const { data } = useQueryCached('https://jsonplaceholder.typicode.com/users/')

  return (
    <React.Fragment>
      {JSON.stringify(data)}
      <Link to="/page2">Go To Another Page</Link>
    </React.Fragment>
  )
}

const AnotherPage = () => (
  <React.Fragment>
    <h2>Another Page</h2>
    <Link to="/">Back To Root Page</Link>
  </React.Fragment>
)

const Parent = () => (
  <AllContextProvider>
    <Router>
      <Switch>
        <Route exact path="/" component={Child} />
        <Route path="/page2" component={AnotherPage} />
      </Switch>
    </Router>
  </AllContextProvider>
)

export default Parent