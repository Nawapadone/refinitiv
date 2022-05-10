import React, {
  useState, useEffect
} from "react";

import './App.css';

function App() {

  let [number, setNumber] = useState('')
  let [select, setSelect] = useState('isPrime')
  let [result, setResult] = useState(false)

  useEffect(() => {
    switch (select) {
      case 'isPrime':
        setResult(checkPrime(number))
        break;
      case 'IsFibanacci':
        setResult(checkFibonacci(number))
        break;
      default:
        break;
    }
    return () => {
      // before unmount, clean up
      // ...
    }

  }, [number, select])

  const handleChange = (event, name) => {
    switch (name) {
      case 'number':
        if (parseInt(event) < 0) {
          setNumber(1)
        } else {
          const conditionNumber = Math.ceil(event)
          if (event === '') {
            setNumber('')
            setResult(false)
          } else {
            setNumber(conditionNumber)
          }
        }
        break;
      case 'select':
        setSelect(event)
        break;
      default:
        break;
    }
  }

  const checkPrime = (n) => {
    let isPrime = true;
    if (n === 0 || n === 1) {
      return false
    }
    else if (n > 1) {
      for (let i = 2; i < n; i++) {
        if (n % i == 0) {
          isPrime = false;
          break;
        }
      }

      if (isPrime) {
        return true
      } else {
        return false
      }
    }
  }

  const checkFibonacci = (n) => {
    let a = 0;
    let b = 1;
    if (n == a || n == b) return true;
    let c = a + b;
    while (c <= n) {
      if (c == n) return true;
      a = b;
      b = c;
      c = a + b;
    }
    return false;
  }

  return (
    <div className="App">
      <div className="test">
        <div className='box1'>
          <div className='text-box'>
            <input type="number" value={number} onChange={(event) => { handleChange(event.target.value.toString(), 'number') }} />
          </div>
        </div>
        <div className='box-middle'>
          <div className='text-box2'>
            <select value={select} onChange={(event) => { handleChange(event.target.value.toString(), 'select') }}>
              <option value="isPrime">isPrime</option>
              <option value="IsFibanacci">IsFibanacci</option>
            </select>
          </div>
        </div>
        <div className='box3'>
          {result != undefined ? `${result}` : ''}
        </div>
      </div>
    </div>
  );
}

export default App;
