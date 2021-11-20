import reactDom from 'react-dom'

let state = []
let setters = []
let stateIndex = 0

function createSetter(index) {
  return function (newState) {
    state[index] = newState
    render()
  }
}

function useState(initialState) {
  state[stateIndex] = state[stateIndex] ? state[stateIndex] : initialState
  setters.push(createSetter(stateIndex))
  let value = state[stateIndex]
  let setter = setters[stateIndex]
  stateIndex++
  return [value, setter]
}

function render() {
  stateIndex = 0
  reactDom.render(<App></App>, document.getElementById('root'))
}

function App() {
  const [count, setCount] = useState(0)
  return (
    <div className="App">
      <button onClick={() => setCount(count + 1)}>+1</button>
      <span>{count}</span>
    </div>
  )
}

export default App
