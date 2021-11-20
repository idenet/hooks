# react hooks


useEffect 可以看做是 componentDidMount componentDidUpdate componentWillUnmount

useEffect(() => {}) componentDidMount componentDidUpdate
useEffect(() => {}, []) componentDidMount
useEffect(() => () => {}) componentWillUnMount



useCallback  性能优化