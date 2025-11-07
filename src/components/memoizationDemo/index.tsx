import React, { useState, useMemo, useCallback } from 'react'

interface CounterDisplayProps {
    count: number;
    onIncrement: () => void;
}
// --- Memoized Child Component ---
// Wrapped with React.memo to prevent re-renders if its props haven't changed.
const MemoizedCounterDisplay = React.memo(function countButton({ count, onIncrement }: CounterDisplayProps) {
  console.log('CounterDisplay is rendering...') // This should only log when `count` or `onIncrement` actually changes

  return (
    <div>
      <p>Current Count: {count}</p>
      {/* The onIncrement function is memoized with useCallback in the parent */}
      <button onClick={onIncrement}>Increment Count</button>
    </div>
  )
})

// --- Main Parent Component ---
const MemoizationDemo = () => {
  const [count, setCount] = useState(0)
  const [otherState, setOtherState] = useState(0) // State to trigger parent re-renders

  // 1. useCallback(): Memoizes the `handleIncrement` function
  //    This ensures the function reference remains the same across re-renders
  //    unless 'count' changes.
  const handleIncrement = useCallback(() => {
    setCount(c => c + 1)
  }, []) // Empty dependency array means the function reference is stable

  // 2. useMemo(): Memoizes an expensive calculation or complex data structure
  //    The `memoizedExpensiveValue` will only be recalculated if 'count' changes.
  const memoizedExpensiveValue = useMemo(() => {
    console.log('Running expensive calculation...')
    // Imagine a long-running, resource-intensive calculation here
    let value = 0
    for (let i = 0; i < count * 10000; i++) {
      value += i
    }
    return value
  }, [count]) // Only recalculate when 'count' changes

  return (
    <div>
      <h1>Optimization Example</h1>
      <p>Expensive calculation result (depends on count): {memoizedExpensiveValue}</p>

      {/* 3. React.memo: Used with the MemoizedCounterDisplay component */}
      {/*    Because handleIncrement and count are stable, the child won't re-render
            when otherState changes. */}
      <MemoizedCounterDisplay count={count} onIncrement={handleIncrement} />

      <hr />

      <p>Other State Value: {otherState}</p>
      {/* This button changes the parent state, causing the parent to re-render.
          Note how the child component (MemoizedCounterDisplay) does NOT re-render. */}
      <button onClick={() => setOtherState(s => s + 1)}>
                Change Other State (Triggers App re-render)
      </button>
      <div style={{ marginTop: '20px' }}>
        <h3>Suggested observations</h3>
        <ul>
          <li>Open the browser console</li>
          <li>Click "Increment Count" and observe that both the parent and child components re-render, triggering the "expensive calculation" log statement.</li>
          <li>Click "Change Other State" and observe that only the parent component re-renders; the child does not, so the expensive calculation is not performed.</li>
          <li>This demonstrates how useCallback, useMemo, and React.memo work together to optimize rendering performance in React components</li>
        </ul>
      </div>
    </div>
  )
}

export default MemoizationDemo
