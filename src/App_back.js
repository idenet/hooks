// import { useReducer } from 'react'

// function App() {
//   function reducer(state, action) {
//     switch (action.type) {
//       case 'increment':
//         return state + 1
//       case 'decrement':
//         return state - 1
//       default:
//         return state
//     }
//   }

//   const [count, dispatch] = useReducer(reducer, 0)
//   return (
//     <div className="App">
//       <button onClick={() => dispatch({ type: 'decrement' })}>-1</button>
//       <span>{count}</span>
//       <button onClick={() => dispatch({ type: 'increment' })}>+1</button>
//     </div>
//   )
// }

// export default App

// import { createContext, useContext } from 'react'

// const countContext = createContext()

// function App() {
//   return (
//     <countContext.Provider value={100}>
//       <Foo></Foo>
//     </countContext.Provider>
//   )
// }

// function Foo() {
//   const value = useContext(countContext)
//   return <div>{value}</div>
// }

// export default App

import { useState, memo } from 'react'
import { useCallback } from 'react'

function App() {
  const [count, setCount] = useState(0)
  // 组件挂载完成之后执行，组件数据更新完成之后执行
  // useEffect(() => {
  //   console.log('123')
  // })

  // 组件挂载完成之后执行
  // useEffect(() => {
  //   console.log('123')
  // }, [])

  // 组件卸载
  // useEffect(() => {
  //   return () => {
  //     console.log('组件被卸载了')
  //     document.title = count
  //   }
  // }, [count])
  const resetCount = useCallback(() => {
    setCount(0)
  }, [setCount])

  return (
    <div>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <Foo resetCount={resetCount}></Foo>
    </div>
  )
}

const Foo = memo(function Foo(props) {
  console.log('foo组件重新渲染')
  return (
    <div>
      <button onClick={props.resetCount}>resetCount</button>
      我是Foo组件
    </div>
  )
})

export default App
