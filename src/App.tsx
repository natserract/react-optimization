import FetchData from './pages/fetch-data'
import PreventingReCreateFunc from './pages/preventing-recreate-func'
import PreventingReCreateComp from './pages/preventing-rerender-component'
import './App.css';

function App() {
  return (
    <div className="App">
      {/* <FetchData /> */}
      {/* <PreventingReCreateFunc /> */}
      <PreventingReCreateComp />
    </div>
  );
}

export default App;
