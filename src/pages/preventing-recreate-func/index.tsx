import React, { useCallback, useState } from "react";

const functionLogs = new Set();
const functionLogsWCallback = new Set();

function ExpensiveFunc() {
  let now = performance.now();
  while (performance.now() - now < 200) {
    // Artificial delay -- do nothing for 200ms
  }

  return now
}

const PreventingReCreateFunc = () => {
  const [state, setState] = useState(NaN)

  const handleClick = () => {
    setState(ExpensiveFunc())
  }

  const handleClickWCallback = useCallback(() => {
    setState(ExpensiveFunc())
  }, [])

  functionLogs.add(handleClick);
  functionLogsWCallback.add(handleClickWCallback);

  console.log(`handleClick created: `, functionLogs.size, ' times');
  console.log(`handleClickWCallback created: `, functionLogsWCallback.size, ' times');
  console.log('Re-render!')

  return (
    <React.Fragment>
      <button onClick={handleClick}>Click Me</button>
      <button onClick={handleClickWCallback}>Click Me With Callback</button>
      <p>{state}</p>
    </React.Fragment>
  )
}

export default PreventingReCreateFunc