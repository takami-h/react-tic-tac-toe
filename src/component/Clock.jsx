import React, { useState, useEffect } from 'react';

function FormattedDate(props) {
  return (<span>{props.date.toLocaleTimeString()}</span>);
}

export function Clock(props) {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const intervalMillis = props.interval || 1000;
    const timerID = setInterval(() => setDate(new Date()), intervalMillis);

    return () => {
      clearInterval(timerID);
    };
  });

  return (
  <div>
  It is <time dateTime={date.toISOString()}><FormattedDate date={date}/></time>.
  {date.getSeconds() % 2 === 0 && '*'}
  </div>
  );
}
