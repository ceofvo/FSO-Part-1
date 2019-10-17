import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = (props) => {
    return (
        <button onClick={props.handleClick}>
            {props.text}
        </button>
    );
};

const Statistic = (props) => {
  if(props.text === 'Positive') {
    return(<tr><td>{props.text}</td><td>{props.value} %</td></tr>);
  }
    return (<tr><td>{props.text}</td><td>{props.value}</td></tr>);
};

const Statistics = (props) => {
  if (props.total === 0) {
      return (
        <div>
          <p>No feedback given</p>
        </div>
      );
  };
      return(
        <div>
          <table>
            <tbody>
              <Statistic text="Good" value ={props.good} />
              <Statistic text="Neutral" value ={props.neutral} />
              <Statistic text="Bad" value ={props.bad} />
              <Statistic text="Total" value ={props.total} />
              <Statistic text="Average" value ={props.average} />
              <Statistic text="Positive" value ={props.positive} />
            </tbody>
          </table>
        </div>
      );
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0) ;
  const [neutral, setNeutral] = useState(0) ;
  const [bad, setBad] = useState(0) ;

  const total = good + neutral + bad ; 
  const average = total/3; 
  const positive = (good/total) * 100; 

  return (
    <div>
        <h2>Give Feedback</h2>
        <Button handleClick={() => setGood(good + 1)} text="Good" />
        <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
        <Button handleClick={() => setBad(bad + 1)} text="Bad" />
        <h2>Statistics</h2>
        <Statistics 
            good={good} 
            neutral={neutral} 
            bad={bad}
            total={total}
            average={average}
            positive={positive} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));