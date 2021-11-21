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
  effectIndex = 0
  reactDom.render(<App></App>, document.getElementById('root'))
}

let prevDepsAry = []
let effectIndex = 0

function useEffect(callback, depsAry) {
  console.log(Object.prototype.toString.call(callback))
  if (Object.prototype.toString.call(callback) !== '[object Function]')
    throw new Error('useEfecct函数的第一个参数必须是函数')
  // 判断depsAry有没有被传递
  if (typeof depsAry === 'undefined') {
    // 没有传递
    callback()
  } else {
    // 判断depsary 是不是数组
    if (Object.prototype.toString.call(depsAry) !== '[object Array]')
      throw new Error('depsAry 必须组一个数组')
    // 获取上一次状态值
    let prevDeps = prevDepsAry[effectIndex]
    // 将当前的依赖值和上一次的依赖值做对比，如果有变化 调用callback
    let hashChanged = prevDeps
      ? depsAry.every((dep, index) => dep === prevDeps[index]) === false
      : true
    if (hashChanged) {
      callback()
    }
  }
  // 同步依赖值
  prevDepsAry[effectIndex] = depsAry
  effectIndex++
}

function useReducer(reducer, initialState) {
  const [state, setState] = useState(initialState)
  function dispatch(action) {
    const newState = reducer(state, action)
    setState(newState)
  }

  return [state, dispatch]
}

function App() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log('调用了')
  }, [count])

  function reducer(state, action) {
    switch (action.type) {
      case 'increment':
        return state + 1
      default:
        return state
    }
  }

  const [num, dispatch] = useReducer(reducer, 0)

  return (
    <div className="App">
      <button onClick={() => dispatch({ type: 'increment' })}>+11</button>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <span>{count}</span>
      <span>{num}</span>
    </div>
  )
}

export default App
