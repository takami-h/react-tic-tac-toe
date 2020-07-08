import React from 'react';

function FormattedDate(props) {
  return (<span>{props.date.toLocaleTimeString()}</span>);
}

/*
 * TODO: React Hooksを使い、クラス → 関数コンポーネント化する。
 *   state -> useState
 *   イベントフック -> useEvent
 */
export class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }
  componentDidMount() {
    const intervalMillis = this.props.interval || 1000;
    this.timerID = setInterval(() => this.tick(), intervalMillis);
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  tick() {
    this.setState({ date: new Date() });
  }
  render() {
    return (
      <div>
        It is <time dateTime={this.state.date.toISOString()}><FormattedDate date={this.state.date}/></time>.
        {this.state.date.getSeconds() % 2 === 0 && '*'}
      </div>
    );
  }
}
