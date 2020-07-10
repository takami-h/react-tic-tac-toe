import React, { useState, useEffect, useReducer } from 'react';

function FormattedDate(props) {
  return (<span>{props.date.toLocaleTimeString()}</span>);
}

function reducer(state, action) {
  switch (action.type) {
    case 'tick':
      return new Date();
    default:
      throw new Error();
  }
}

/*
 * custom hook.
 */
function usePeriodicDate(interval) {
  // useReducer
  // Actionをディスパッチするだけ、ロジックがコンポーネントの外に出る。
  const [date, dispatch] = useReducer(reducer, new Date());
  const tick = () => dispatch({type: 'tick'});

  // useState
  // 関数コンポーネントでstateを使う方法。
  // const [date, setDate] = useState(new Date());
  // const tick = () => setDate(new Date());

  // event listener for function component.
  useEffect(() => {
    const intervalMillis = interval || 1000;
    const timerID = setInterval(tick, intervalMillis);
    console.debug(`set timer of id ${timerID} with interval ${intervalMillis} ms.`);

    return () => {
      clearInterval(timerID);
      console.debug(`clear timer of id ${timerID}`);
    };
  }, [interval]); // setInterval only once.
  return date;
}

export function Clock(props) {
  const date = usePeriodicDate(props.interval);

  return (
  <div>
  It is <time dateTime={date.toISOString()}><FormattedDate date={date}/></time>.
  {date.getSeconds() % 2 === 0 && '*'}
  </div>
  );
}
