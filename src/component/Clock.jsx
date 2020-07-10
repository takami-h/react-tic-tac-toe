import React, { useState, useEffect } from 'react';

function FormattedDate(props) {
  return (<span>{props.date.toLocaleTimeString()}</span>);
}

/*
 * custom hook.
 */
function usePeriodicDate(interval) {
  // state for function component.
  const [date, setDate] = useState(new Date());

  // event listener for function component.
  useEffect(() => {
    const intervalMillis = interval || 1000;
    const timerID = setInterval(() => setDate(new Date()), intervalMillis);

    return () => {
      clearInterval(timerID);
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
